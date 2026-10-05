import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';
import type { Request, Response, NextFunction } from 'express';
import { db } from './db.js';

export const AUTH_SECRET = process.env.AUTH_SECRET || process.env.JWT_SECRET || 'workvortex-secure-jwt-secret-key-2026';
export const SESSION_COOKIE_NAME = 'vortex_session';

export interface TokenPayload {
  userId: string;
  email: string;
  name: string;
  roleId: string;
  emailVerified?: boolean;
  status?: string;
}

export interface AuthenticatedRequest extends Request {
  user?: TokenPayload;
}

/**
 * Generate cryptographically secure random token (e.g. for email verification & password reset)
 */
export function createCryptoToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Generate JWT session token (7-day validity)
 */
export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, AUTH_SECRET, { expiresIn: '7d' });
}

/**
 * Verify JWT token
 */
export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, AUTH_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

/**
 * Extract token from Authorization header or HTTP-only cookie
 */
export function extractToken(req: Request): string | null {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.split(' ')[1];
  }

  // Parse Cookie header
  const cookieHeader = req.headers.cookie;
  if (cookieHeader) {
    const cookies = cookieHeader.split(';').map((c) => c.trim());
    for (const cookie of cookies) {
      if (cookie.startsWith(`${SESSION_COOKIE_NAME}=`)) {
        return decodeURIComponent(cookie.substring(SESSION_COOKIE_NAME.length + 1));
      }
    }
  }

  return null;
}

/**
 * Set HTTP-only session cookie on response
 */
export function setSessionCookie(res: Response, token: string) {
  const isProd = process.env.NODE_ENV === 'production';
  res.cookie(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'strict' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/',
  });
}

/**
 * Clear HTTP-only session cookie
 */
export function clearSessionCookie(res: Response) {
  const isProd = process.env.NODE_ENV === 'production';
  res.clearCookie(SESSION_COOKIE_NAME, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'strict' : 'lax',
    path: '/',
  });
}

/**
 * In-memory sliding window rate limiter
 */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(key: string, limit = 10, windowMs = 15 * 60 * 1000): { allowed: boolean; remaining: number; resetInSeconds: number } {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, resetInSeconds: Math.ceil(windowMs / 1000) };
  }

  if (record.count >= limit) {
    const resetInSeconds = Math.max(1, Math.ceil((record.resetAt - now) / 1000));
    return { allowed: false, remaining: 0, resetInSeconds };
  }

  record.count += 1;
  return {
    allowed: true,
    remaining: limit - record.count,
    resetInSeconds: Math.ceil((record.resetAt - now) / 1000),
  };
}

/**
 * Express Middleware: Require Authentication
 */
export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const token = extractToken(req);
  if (!token) {
    res.status(401).json({ error: 'Unauthorized. Please sign in to continue.' });
    return;
  }

  const payload = verifyToken(token);
  if (!payload) {
    res.status(401).json({ error: 'Session expired or invalid token. Please log in again.' });
    return;
  }

  // Check if user still active in DB and not disabled
  const user = db.prepare('SELECT id, is_active, status, role_id FROM users WHERE id = ?').get(payload.userId) as {
    id: string;
    is_active: number;
    status: string;
    role_id: string;
  } | undefined;

  if (!user || !user.is_active || user.status === 'DISABLED') {
    res.status(403).json({ error: 'User account is deactivated or suspended. Please contact support.' });
    return;
  }

  // Update role in payload if it was updated in DB
  req.user = {
    ...payload,
    roleId: user.role_id,
    status: user.status,
  };

  next();
}

/**
 * Express Middleware: Require Specific Role(s)
 */
export function requireRoles(allowedRoles: string[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required.' });
      return;
    }

    if (req.user.roleId === 'SUPER_ADMIN') {
      next();
      return;
    }

    if (!allowedRoles.includes(req.user.roleId)) {
      res.status(403).json({
        error: `Forbidden. This operation requires one of: ${allowedRoles.join(', ')}`
      });
      return;
    }

    next();
  };
}

/**
 * Invalidate/Revoke all active sessions for a user
 */
export function revokeUserSessions(userId: string) {
  try {
    const newSessionToken = createCryptoToken();
    db.prepare('UPDATE users SET session_token = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(newSessionToken, userId);
  } catch (err) {
    console.error('Failed to revoke user session:', err);
  }
}

/**
 * Log Action to Audit Trail
 */
export function logAuditAction(
  userId: string | undefined,
  userName: string | undefined,
  action: string,
  resource: string,
  resourceId?: string,
  details?: string,
  ipAddress?: string
) {
  try {
    const id = `log_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    db.prepare(`
      INSERT INTO audit_logs (id, user_id, user_name, action, resource, resource_id, details, ip_address)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, userId || 'SYSTEM', userName || 'System / Guest', action, resource, resourceId || null, details || null, ipAddress || '127.0.0.1');
  } catch (err) {
    console.error('Failed to write audit log:', err);
  }
}
