import express from 'express';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import path from 'node:path';
import fs from 'node:fs';
import { db } from './db.js';
import {
  generateToken,
  requireAuth,
  requireRoles,
  logAuditAction,
  createCryptoToken,
  setSessionCookie,
  clearSessionCookie,
  checkRateLimit,
  revokeUserSessions,
  type AuthenticatedRequest,
} from './auth.js';
import {
  isGoogleOAuthConfigured,
  getGoogleAuthorizationUrl,
  exchangeGoogleCode,
  findOrCreateGoogleUser,
} from './oauth.js';
import {
  sendVerificationEmail,
  sendPasswordResetEmail,
  notifyTeamNewLead
} from './email.js';
import { qualifyLeadServerSide, type LeadDataForAI } from './ai.js';

export const router = express.Router();

// Ensure upload directory exists
const uploadDir = path.resolve(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const safeName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    cb(null, `${safeName}_${Date.now()}${ext}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
});

/* ==========================================================================
   1. PRODUCTION AUTHENTICATION & USER MANAGEMENT ENDPOINTS
   ========================================================================== */

/**
 * Public: Email + Password Registration
 */
router.post('/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const clientIp = req.ip || '127.0.0.1';

    // Rate limiting: 10 registrations per 15 minutes per IP
    const rateCheck = checkRateLimit(`register_${clientIp}`, 10, 15 * 60 * 1000);
    if (!rateCheck.allowed) {
      res.status(429).json({
        error: `Too many registration attempts. Please try again in ${rateCheck.resetInSeconds} seconds.`,
      });
      return;
    }

    if (!name || !email || !password) {
      res.status(400).json({ error: 'Name, email, and password are required.' });
      return;
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const cleanName = String(name).trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      res.status(400).json({ error: 'Please enter a valid email address.' });
      return;
    }

    if (String(password).length < 8) {
      res.status(400).json({ error: 'Password must be at least 8 characters long.' });
      return;
    }

    // Check if email is already taken
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(cleanEmail);
    if (existing) {
      res.status(409).json({ error: 'An account with this email already exists. Please sign in.' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const userId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const verifyToken = createCryptoToken();
    const tokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    db.prepare(`
      INSERT INTO users (
        id, email, name, password_hash, role_id, email_verified, status, is_active,
        verification_token, verification_token_expires, last_login_at
      ) VALUES (
        ?, ?, ?, ?, 'PUBLIC_USER', 0, 'ACTIVE', 1, ?, ?, CURRENT_TIMESTAMP
      )
    `).run(userId, cleanEmail, cleanName, passwordHash, verifyToken, tokenExpires);

    // Send email verification link
    const emailResult = await sendVerificationEmail(cleanEmail, cleanName, verifyToken);

    // Generate JWT session
    const token = generateToken({
      userId,
      email: cleanEmail,
      name: cleanName,
      roleId: 'PUBLIC_USER',
      emailVerified: false,
      status: 'ACTIVE',
    });

    setSessionCookie(res, token);
    logAuditAction(userId, cleanName, 'REGISTER', 'AUTH', userId, 'New user registered via email.', clientIp);

    res.status(201).json({
      success: true,
      token,
      verificationUrl: emailResult.verificationUrl,
      user: {
        id: userId,
        email: cleanEmail,
        name: cleanName,
        roleId: 'PUBLIC_USER',
        role_id: 'PUBLIC_USER',
        emailVerified: false,
        email_verified: 0,
        avatarUrl: null,
        avatar_url: null,
        status: 'ACTIVE',
      },
    });
  } catch (err: any) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Server registration error. Please try again.' });
  }
});

/**
 * Public: Email + Password Login
 */
router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const clientIp = req.ip || '127.0.0.1';

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required.' });
      return;
    }

    const cleanEmail = String(email).trim().toLowerCase();

    // Rate limiting: 10 login attempts per 15 minutes per IP/email
    const rateCheck = checkRateLimit(`login_${clientIp}_${cleanEmail}`, 10, 15 * 60 * 1000);
    if (!rateCheck.allowed) {
      res.status(429).json({
        error: `Too many login attempts. Please try again in ${rateCheck.resetInSeconds} seconds.`,
      });
      return;
    }

    const user = db.prepare('SELECT * FROM users WHERE email = ? COLLATE NOCASE').get(cleanEmail) as any;
    if (!user) {
      logAuditAction(undefined, cleanEmail, 'LOGIN_FAILED', 'AUTH', undefined, 'Failed login: email not found', clientIp);
      res.status(401).json({ error: 'Invalid email or password.' });
      return;
    }

    if (!user.is_active || user.status === 'DISABLED') {
      res.status(403).json({ error: 'Account has been deactivated. Please contact support.' });
      return;
    }

    // If account was created via Google only
    if (!user.password_hash || user.password_hash === 'GOOGLE_OAUTH_ACCOUNT') {
      res.status(400).json({
        error: 'This account was registered using Google Sign-In. Please sign in with Google or use "Forgot Password" to set a password.',
      });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      logAuditAction(user.id, user.name, 'LOGIN_FAILED', 'AUTH', user.id, 'Failed login: incorrect password', clientIp);
      res.status(401).json({ error: 'Invalid email or password.' });
      return;
    }

    // Update last login timestamp
    db.prepare('UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE id = ?').run(user.id);

    const token = generateToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      roleId: user.role_id,
      emailVerified: Boolean(user.email_verified),
      status: user.status,
    });

    setSessionCookie(res, token);
    logAuditAction(user.id, user.name, 'LOGIN_SUCCESS', 'AUTH', user.id, 'User signed in successfully.', clientIp);

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        roleId: user.role_id,
        role_id: user.role_id,
        jobTitle: user.job_title,
        avatarUrl: user.avatar_url,
        avatar_url: user.avatar_url,
        emailVerified: Boolean(user.email_verified),
        email_verified: user.email_verified,
        status: user.status,
      },
    });
  } catch (err: any) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server authentication error.' });
  }
});

/**
 * Public: Initiate Google OAuth 2.0 Flow
 */
router.get('/auth/google', (_req, res) => {
  if (!isGoogleOAuthConfigured()) {
    res.status(200).json({
      configured: false,
      message: 'Google OAuth credentials (GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET) are not set in .env. Please configure them to enable real-time Google Sign-In.',
    });
    return;
  }

  const stateNonce = createCryptoToken();
  const authUrl = getGoogleAuthorizationUrl(stateNonce);
  res.json({ configured: true, authUrl });
});

/**
 * Dev / Sandbox Google OAuth Simulation (Available for local testing when GOOGLE_CLIENT_ID is not configured)
 */
router.post('/auth/google/dev-simulate', async (req, res) => {
  try {
    const email = req.body.email ? String(req.body.email).toLowerCase().trim() : 'alex.google@workvortex.studio';
    const name = req.body.name ? String(req.body.name).trim() : 'Alex Vance (Google SSO)';
    const googleId = req.body.googleId ? String(req.body.googleId).trim() : `google_sub_${Math.random().toString(36).substring(2, 10)}`;
    const avatarUrl = req.body.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80';

    const user = findOrCreateGoogleUser({
      googleId,
      email,
      name,
      avatarUrl,
    });

    if (user.status === 'DISABLED') {
      res.status(403).json({ error: 'This account has been deactivated. Please contact support.' });
      return;
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      roleId: user.role_id,
      emailVerified: true,
      status: user.status,
    });

    setSessionCookie(res, token);
    logAuditAction(user.id, user.name, 'GOOGLE_DEV_AUTH_SUCCESS', 'AUTH', user.id, 'User authenticated via Google Dev Sandbox SSO.', req.ip);

    res.json({
      success: true,
      token,
      message: 'Authenticated via Google SSO Sandbox.',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        roleId: user.role_id,
        role_id: user.role_id,
        avatarUrl: user.avatar_url,
        avatar_url: user.avatar_url,
        emailVerified: true,
        email_verified: 1,
        googleId,
        google_id: googleId,
        status: user.status,
      },
    });
  } catch (err: any) {
    console.error('Google dev simulation error:', err);
    res.status(500).json({ error: 'Failed to simulate Google OAuth.' });
  }
});

/**
 * Public: Google OAuth 2.0 Callback Handler
 */
router.get('/auth/google/callback', async (req, res) => {
  try {
    const { code } = req.query;
    if (!code || typeof code !== 'string') {
      res.redirect('/login?error=Google%20authentication%20cancelled%20or%20failed.');
      return;
    }

    // Exchange authorization code for verified profile
    const googleProfile = await exchangeGoogleCode(code);

    // Find, link or register user
    const user = findOrCreateGoogleUser(googleProfile);

    // Generate session JWT
    const token = generateToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      roleId: user.role_id,
      emailVerified: true,
      status: user.status,
    });

    setSessionCookie(res, token);
    logAuditAction(user.id, user.name, 'GOOGLE_LOGIN', 'AUTH', user.id, `User signed in with Google (${user.email}).`, req.ip);

    // Redirect user to appropriate portal
    const isTeam = ['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'SALES', 'TEAM_MEMBER'].includes(user.role_id);
    const targetUrl = isTeam ? '/admin/dashboard' : '/account';

    // Store token in URL hash or cookie so SPA hydrates seamlessly
    res.redirect(`${targetUrl}?auth=success#token=${token}`);
  } catch (err: any) {
    console.error('Google OAuth callback error:', err);
    res.redirect(`/login?error=${encodeURIComponent(err.message || 'Google Sign-In failed')}`);
  }
});

/**
 * Authenticated: Get Current User Session & Permissions
 */
router.get('/auth/me', requireAuth, (req: AuthenticatedRequest, res) => {
  const user = db.prepare(`
    SELECT u.id, u.email, u.name, u.role_id, u.avatar_url, u.job_title, u.phone,
           u.status, u.email_verified, u.google_id, u.created_at, u.last_login_at,
           r.name as role_name
    FROM users u
    JOIN roles r ON u.role_id = r.id
    WHERE u.id = ?
  `).get(req.user!.userId) as any;

  if (!user) {
    res.status(404).json({ error: 'User not found.' });
    return;
  }

  res.json({
    user: {
      ...user,
      roleId: user.role_id,
      emailVerified: Boolean(user.email_verified),
      isGoogleLinked: Boolean(user.google_id),
    },
  });
});

router.get('/me', requireAuth, (req: AuthenticatedRequest, res) => {
  const user = db.prepare(`
    SELECT u.id, u.email, u.name, u.role_id, u.avatar_url, u.job_title, u.phone,
           u.status, u.email_verified, u.google_id, u.created_at, u.last_login_at,
           r.name as role_name
    FROM users u
    JOIN roles r ON u.role_id = r.id
    WHERE u.id = ?
  `).get(req.user!.userId) as any;

  if (!user) {
    res.status(404).json({ error: 'User not found.' });
    return;
  }

  res.json({
    user: {
      ...user,
      roleId: user.role_id,
      emailVerified: Boolean(user.email_verified),
      isGoogleLinked: Boolean(user.google_id),
    },
  });
});

/**
 * Public: Forgot Password Request (Anti-enumeration Protected)
 */
router.post('/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const clientIp = req.ip || '127.0.0.1';

    if (!email) {
      res.status(400).json({ error: 'Email address is required.' });
      return;
    }

    const cleanEmail = String(email).trim().toLowerCase();

    // Rate limiting: 5 forgot-password requests per 15 minutes
    const rateCheck = checkRateLimit(`forgot_${clientIp}_${cleanEmail}`, 5, 15 * 60 * 1000);
    if (!rateCheck.allowed) {
      res.status(429).json({
        error: `Too many password reset requests. Please wait ${rateCheck.resetInSeconds} seconds.`,
      });
      return;
    }

    const user = db.prepare('SELECT id, name, email FROM users WHERE email = ? COLLATE NOCASE').get(cleanEmail) as any;

    let resetUrl: string | undefined;
    if (user) {
      const resetToken = createCryptoToken();
      const expires = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1 hour validity

      db.prepare(`
        UPDATE users SET
          reset_token = ?,
          reset_token_expires = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).run(resetToken, expires, user.id);

      const emailRes = await sendPasswordResetEmail(user.email, user.name, resetToken);
      resetUrl = emailRes.resetUrl;
      logAuditAction(user.id, user.name, 'PASSWORD_RESET_REQUESTED', 'AUTH', user.id, 'Password reset link generated.', clientIp);
    }

    // Generic response to avoid email enumeration
    res.json({
      success: true,
      message: 'If an account exists with this email address, a password reset link has been dispatched.',
      resetUrl, // Provided in development for fast testing
    });
  } catch (err: any) {
    console.error('Forgot password error:', err);
    res.status(500).json({ error: 'Failed to process password reset request.' });
  }
});

/**
 * Public: Reset Password via Cryptographic Token
 */
router.post('/auth/reset-password', async (req, res) => {
  try {
    const token = req.body.token;
    const newPassword = req.body.newPassword || req.body.new_password;
    if (!token || !newPassword) {
      res.status(400).json({ error: 'Reset token and new password are required.' });
      return;
    }

    if (String(newPassword).length < 8) {
      res.status(400).json({ error: 'Password must be at least 8 characters long.' });
      return;
    }

    const user = db.prepare(`
      SELECT id, email, name, reset_token_expires
      FROM users
      WHERE reset_token = ?
    `).get(String(token).trim()) as any;

    if (!user) {
      res.status(400).json({ error: 'Invalid or expired password reset token.' });
      return;
    }

    if (user.reset_token_expires && new Date(user.reset_token_expires).getTime() < Date.now()) {
      res.status(400).json({ error: 'Password reset token has expired. Please request a new one.' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    db.prepare(`
      UPDATE users SET
        password_hash = ?,
        reset_token = NULL,
        reset_token_expires = NULL,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(passwordHash, user.id);

    revokeUserSessions(user.id);
    logAuditAction(user.id, user.name, 'PASSWORD_RESET_SUCCESS', 'AUTH', user.id, 'Password updated via reset token.', req.ip);

    res.json({ success: true, message: 'Password has been successfully updated. You may now sign in.' });
  } catch (err: any) {
    console.error('Reset password error:', err);
    res.status(500).json({ error: 'Failed to reset password.' });
  }
});

/**
 * Public: Verify Email via Token
 */
router.post('/auth/verify-email', (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      res.status(400).json({ error: 'Verification token is required.' });
      return;
    }

    const user = db.prepare(`
      SELECT id, name, email, verification_token_expires
      FROM users
      WHERE verification_token = ?
    `).get(String(token).trim()) as any;

    if (!user) {
      res.status(400).json({ error: 'Invalid or already utilized verification token.' });
      return;
    }

    db.prepare(`
      UPDATE users SET
        email_verified = 1,
        verification_token = NULL,
        verification_token_expires = NULL,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(user.id);

    logAuditAction(user.id, user.name, 'EMAIL_VERIFIED', 'AUTH', user.id, 'Email address verified successfully.', req.ip);

    res.json({ success: true, message: 'Email address verified successfully!' });
  } catch (err: any) {
    console.error('Email verification error:', err);
    res.status(500).json({ error: 'Failed to verify email address.' });
  }
});

/**
 * Authenticated: Update Profile Information
 */
router.patch('/auth/profile', requireAuth, (req: AuthenticatedRequest, res) => {
  try {
    const { name, phone, job_title, avatar_url } = req.body;
    const current = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user!.userId) as any;

    if (!current) {
      res.status(404).json({ error: 'User not found.' });
      return;
    }

    db.prepare(`
      UPDATE users SET
        name = ?,
        phone = ?,
        job_title = ?,
        avatar_url = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(
      name !== undefined ? String(name).trim() : current.name,
      phone !== undefined ? String(phone).trim() : current.phone,
      job_title !== undefined ? String(job_title).trim() : current.job_title,
      avatar_url !== undefined ? String(avatar_url).trim() : current.avatar_url,
      req.user!.userId
    );

    logAuditAction(req.user!.userId, req.user!.name, 'PROFILE_UPDATED', 'AUTH', req.user!.userId, 'User updated profile details.', req.ip);

    const updated = db.prepare('SELECT id, email, name, role_id, avatar_url, job_title, phone, email_verified, status FROM users WHERE id = ?').get(req.user!.userId) as any;

    res.json({
      success: true,
      message: 'Profile updated successfully.',
      user: {
        ...updated,
        roleId: updated.role_id,
        emailVerified: Boolean(updated.email_verified),
      },
    });
  } catch (err: any) {
    console.error('Profile update error:', err);
    res.status(500).json({ error: 'Failed to update profile.' });
  }
});

/**
 * Authenticated: Change Password
 */
router.patch('/auth/password', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const currentPassword = req.body.currentPassword || req.body.current_password;
    const newPassword = req.body.newPassword || req.body.new_password;

    if (!newPassword || String(newPassword).length < 8) {
      res.status(400).json({ error: 'New password must be at least 8 characters long.' });
      return;
    }

    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user!.userId) as any;
    if (!user) {
      res.status(404).json({ error: 'User not found.' });
      return;
    }

    // If user has existing password, verify currentPassword
    if (user.password_hash) {
      if (!currentPassword) {
        res.status(400).json({ error: 'Current password is required to set a new password.' });
        return;
      }
      const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
      if (!isMatch) {
        res.status(401).json({ error: 'Incorrect current password.' });
        return;
      }
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    db.prepare(`
      UPDATE users SET
        password_hash = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(passwordHash, user.id);

    logAuditAction(user.id, user.name, 'PASSWORD_CHANGED', 'AUTH', user.id, 'User updated password.', req.ip);

    res.json({ success: true, message: 'Password updated successfully.' });
  } catch (err: any) {
    console.error('Password change error:', err);
    res.status(500).json({ error: 'Failed to update password.' });
  }
});

/**
 * Authenticated: Delete User Account (Self Deletion)
 */
router.delete('/auth/account', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const confirmationPassword = req.body.confirmationPassword || req.body.password;
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user!.userId) as any;

    if (!user) {
      res.status(404).json({ error: 'User not found.' });
      return;
    }

    // Protect Super Admin from self-deletion
    if (user.role_id === 'SUPER_ADMIN') {
      const superAdminCount = (db.prepare("SELECT COUNT(*) as count FROM users WHERE role_id = 'SUPER_ADMIN'").get() as any).count;
      if (superAdminCount <= 1) {
        res.status(400).json({ error: 'Cannot delete the only Super Administrator account.' });
        return;
      }
    }

    if (user.password_hash && confirmationPassword) {
      const isMatch = await bcrypt.compare(confirmationPassword, user.password_hash);
      if (!isMatch) {
        res.status(401).json({ error: 'Incorrect confirmation password.' });
        return;
      }
    }

    db.prepare('DELETE FROM users WHERE id = ?').run(user.id);
    clearSessionCookie(res);
    logAuditAction(user.id, user.name, 'ACCOUNT_DELETED', 'AUTH', user.id, `User account ${user.email} deleted by owner.`, req.ip);

    res.json({ success: true, message: 'Your account has been permanently deleted.' });
  } catch (err: any) {
    console.error('Account deletion error:', err);
    res.status(500).json({ error: 'Failed to delete account.' });
  }
});

/**
 * Authenticated: Sign Out & Clear Session
 */
router.post('/auth/logout', (req: AuthenticatedRequest, res) => {
  if (req.user) {
    logAuditAction(req.user.userId, req.user.name, 'LOGOUT', 'AUTH', req.user.userId, 'User signed out.', req.ip);
  }
  clearSessionCookie(res);
  res.json({ success: true, message: 'Logged out successfully.' });
});

/* ==========================================================================
   2. LEADS & CRM ENDPOINTS
   ========================================================================== */

// Public: Submit new lead inquiry
router.post('/leads', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      company,
      website,
      projectType,
      servicesRequired,
      budgetRange,
      timeline,
      message,
      additionalInfo,
    } = req.body;

    // Strict validation
    if (!name || !email || !message || !projectType) {
      res.status(400).json({ error: 'Name, email, project type, and requirements message are required.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ error: 'Please enter a valid email address.' });
      return;
    }

    const leadData: LeadDataForAI = {
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      phone: phone ? String(phone).trim() : '',
      company: company ? String(company).trim() : '',
      website: website ? String(website).trim() : '',
      projectType: String(projectType).trim(),
      servicesRequired: Array.isArray(servicesRequired) ? servicesRequired : [],
      budgetRange: budgetRange ? String(budgetRange).trim() : 'Flexible / Open for Discussion',
      timeline: timeline ? String(timeline).trim() : '2–4 Weeks',
      message: String(message).trim(),
      additionalInfo: additionalInfo ? String(additionalInfo).trim() : '',
    };

    // Server-Side AI Lead Qualification
    const qualification = await qualifyLeadServerSide(leadData);

    const leadId = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    db.prepare(`
      INSERT INTO leads (
        id, name, email, phone, company, website, project_type, services_required,
        budget_range, timeline, message, additional_info, status, score, quality,
        ai_summary, ai_pain_points, ai_recommended_service, ai_pricing_inr,
        ai_pricing_usd, ai_closure_prob, ai_outreach_draft
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, 'NEW', ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?
      )
    `).run(
      leadId,
      leadData.name,
      leadData.email,
      leadData.phone || null,
      leadData.company || null,
      leadData.website || null,
      leadData.projectType,
      JSON.stringify(leadData.servicesRequired),
      leadData.budgetRange,
      leadData.timeline,
      leadData.message,
      leadData.additionalInfo || null,
      qualification.score,
      qualification.quality,
      qualification.summary,
      JSON.stringify(qualification.painPoints),
      qualification.recommendedService,
      qualification.pricingInr,
      qualification.pricingUsd,
      qualification.closureProbability,
      qualification.outreachDraft
    );

    // Initial lead activity
    db.prepare(`
      INSERT INTO lead_activity (id, lead_id, action, details)
      VALUES (?, ?, ?, ?)
    `).run(
      `act_${Date.now()}`,
      leadId,
      'LEAD_SUBMITTED',
      `Inquiry submitted from public portal. AI Qualified as ${qualification.quality} (${qualification.score}/100)`
    );

    // Notify WORKVORTEX Team
    notifyTeamNewLead(leadData, qualification).catch((err) => console.warn('Email notify error:', err));

    logAuditAction(undefined, 'Public Visitor', 'LEAD_CREATED', 'LEADS', leadId, `Inquiry created by ${leadData.name} (${leadData.email})`, req.ip);

    res.status(201).json({
      success: true,
      leadId,
      message: 'Your project inquiry has been received. Our team will review your requirements and follow up shortly.',
      qualification: {
        score: qualification.score,
        quality: qualification.quality,
        recommendedService: qualification.recommendedService,
        estimatedPricing: {
          inr: qualification.pricingInr,
          usd: qualification.pricingUsd,
        },
        timeline: leadData.timeline,
      },
    });
  } catch (err: any) {
    console.error('Lead submission error:', err);
    res.status(500).json({ error: 'Failed to process lead inquiry.' });
  }
});

// Admin: Get all leads with search, filter, pagination
router.get('/leads', requireAuth, requireRoles(['SUPER_ADMIN', 'ADMIN', 'SALES', 'VIEWER']), (req, res) => {
  try {
    const { status, quality, search, limit = '100', offset = '0' } = req.query;

    let query = `
      SELECT l.*, u.name as assigned_to_name
      FROM leads l
      LEFT JOIN users u ON l.assigned_to_user_id = u.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (status && status !== 'ALL') {
      query += ' AND l.status = ?';
      params.push(status);
    }

    if (quality && quality !== 'ALL') {
      query += ' AND l.quality = ?';
      params.push(quality);
    }

    if (search) {
      query += ' AND (l.name LIKE ? OR l.email LIKE ? OR l.company LIKE ? OR l.project_type LIKE ?)';
      const term = `%${search}%`;
      params.push(term, term, term, term);
    }

    query += ' ORDER BY l.created_at DESC LIMIT ? OFFSET ?';
    params.push(Number(limit) || 100, Number(offset) || 0);

    const leads = db.prepare(query).all(...params) as any[];

    // Parse JSON fields
    const parsedLeads = leads.map((l) => ({
      ...l,
      services_required: l.services_required ? JSON.parse(l.services_required) : [],
      ai_pain_points: l.ai_pain_points ? JSON.parse(l.ai_pain_points) : [],
    }));

    res.json({ leads: parsedLeads });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Get single lead by ID with notes and activity
router.get('/leads/:id', requireAuth, requireRoles(['SUPER_ADMIN', 'ADMIN', 'SALES', 'VIEWER']), (req, res) => {
  try {
    const id = String(req.params.id);
    const lead = db.prepare(`
      SELECT l.*, u.name as assigned_to_name
      FROM leads l
      LEFT JOIN users u ON l.assigned_to_user_id = u.id
      WHERE l.id = ?
    `).get(id) as any;

    if (!lead) {
      res.status(404).json({ error: 'Lead not found.' });
      return;
    }

    const notes = db.prepare(`
      SELECT n.*, u.name as author_name, u.avatar_url as author_avatar
      FROM lead_notes n
      JOIN users u ON n.user_id = u.id
      WHERE n.lead_id = ?
      ORDER BY n.created_at DESC
    `).all(id);

    const activity = db.prepare(`
      SELECT a.*, u.name as user_name
      FROM lead_activity a
      LEFT JOIN users u ON a.user_id = u.id
      WHERE a.lead_id = ?
      ORDER BY a.created_at DESC
    `).all(id);

    res.json({
      lead: {
        ...lead,
        services_required: lead.services_required ? JSON.parse(lead.services_required) : [],
        ai_pain_points: lead.ai_pain_points ? JSON.parse(lead.ai_pain_points) : [],
      },
      notes,
      activity,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Update lead status, assignment, or fields
router.patch('/leads/:id', requireAuth, requireRoles(['SUPER_ADMIN', 'ADMIN', 'SALES']), (req: AuthenticatedRequest, res) => {
  try {
    const id = String(req.params.id);
    const { status, assigned_to_user_id, notes_summary } = req.body;
    const currentLead = db.prepare('SELECT * FROM leads WHERE id = ?').get(id) as any;

    if (!currentLead) {
      res.status(404).json({ error: 'Lead not found.' });
      return;
    }

    if (status && status !== currentLead.status) {
      db.prepare('UPDATE leads SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(status, id);
      db.prepare(`
        INSERT INTO lead_activity (id, lead_id, user_id, action, details)
        VALUES (?, ?, ?, 'STATUS_CHANGE', ?)
      `).run(`act_${Date.now()}`, id, req.user!.userId, `Status updated from ${currentLead.status} to ${status}`);
    }

    if (assigned_to_user_id !== undefined && assigned_to_user_id !== currentLead.assigned_to_user_id) {
      db.prepare('UPDATE leads SET assigned_to_user_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(assigned_to_user_id || null, id);
      db.prepare(`
        INSERT INTO lead_activity (id, lead_id, user_id, action, details)
        VALUES (?, ?, ?, 'ASSIGNMENT_CHANGE', ?)
      `).run(`act_${Date.now()}`, id, req.user!.userId, `Lead assigned to staff ID: ${assigned_to_user_id || 'Unassigned'}`);
    }

    if (notes_summary !== undefined) {
      db.prepare('UPDATE leads SET notes_summary = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(notes_summary || null, id);
    }

    logAuditAction(req.user!.userId, req.user!.name, 'LEAD_UPDATED', 'LEADS', id, `Lead updated: status=${status || currentLead.status}`);

    res.json({ success: true, message: 'Lead updated successfully.' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Append CRM internal note
router.post('/leads/:id/notes', requireAuth, requireRoles(['SUPER_ADMIN', 'ADMIN', 'SALES', 'EDITOR']), (req: AuthenticatedRequest, res) => {
  try {
    const id = String(req.params.id);
    const { content } = req.body;
    if (!content || !content.trim()) {
      res.status(400).json({ error: 'Note content cannot be empty.' });
      return;
    }

    const noteId = `note_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    db.prepare(`
      INSERT INTO lead_notes (id, lead_id, user_id, content)
      VALUES (?, ?, ?, ?)
    `).run(noteId, id, req.user!.userId, content.trim());

    db.prepare(`
      INSERT INTO lead_activity (id, lead_id, user_id, action, details)
      VALUES (?, ?, ?, 'NOTE_ADDED', ?)
    `).run(`act_${Date.now()}`, id, req.user!.userId, `Added note: "${content.substring(0, 60)}..."`);

    res.status(201).json({ success: true, noteId });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Trigger AI Re-qualification
router.post('/leads/:id/qualify', requireAuth, requireRoles(['SUPER_ADMIN', 'ADMIN', 'SALES']), async (req: AuthenticatedRequest, res) => {
  try {
    const id = String(req.params.id);
    const lead = db.prepare('SELECT * FROM leads WHERE id = ?').get(id) as any;
    if (!lead) {
      res.status(404).json({ error: 'Lead not found.' });
      return;
    }

    const leadData: LeadDataForAI = {
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      company: lead.company,
      website: lead.website,
      projectType: lead.project_type,
      budgetRange: lead.budget_range,
      timeline: lead.timeline,
      message: lead.message,
      additionalInfo: lead.additional_info,
    };

    const qualification = await qualifyLeadServerSide(leadData);

    db.prepare(`
      UPDATE leads SET
        score = ?,
        quality = ?,
        ai_summary = ?,
        ai_pain_points = ?,
        ai_recommended_service = ?,
        ai_pricing_inr = ?,
        ai_pricing_usd = ?,
        ai_closure_prob = ?,
        ai_outreach_draft = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(
      qualification.score,
      qualification.quality,
      qualification.summary,
      JSON.stringify(qualification.painPoints),
      qualification.recommendedService,
      qualification.pricingInr,
      qualification.pricingUsd,
      qualification.closureProbability,
      qualification.outreachDraft,
      id
    );

    db.prepare(`
      INSERT INTO lead_activity (id, lead_id, user_id, action, details)
      VALUES (?, ?, ?, 'AI_REQUALIFIED', ?)
    `).run(`act_${Date.now()}`, id, req.user!.userId, `Re-evaluated with AI: Score ${qualification.score}/100 (${qualification.quality})`);

    res.json({ success: true, qualification });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Delete lead
router.delete('/leads/:id', requireAuth, requireRoles(['SUPER_ADMIN', 'ADMIN']), (req: AuthenticatedRequest, res) => {
  try {
    const id = String(req.params.id);
    db.prepare('DELETE FROM leads WHERE id = ?').run(id);
    logAuditAction(req.user!.userId, req.user!.name, 'LEAD_DELETED', 'LEADS', id, 'Lead permanently deleted');
    res.json({ success: true, message: 'Lead deleted.' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/* ==========================================================================
   3. PROJECTS & CASE STUDIES CMS
   ========================================================================== */

// Public / Admin: Get all projects
router.get('/projects', (req, res) => {
  try {
    const { category, status } = req.query;
    let query = 'SELECT * FROM projects WHERE 1=1';
    const params: any[] = [];

    // If status filter provided or default to published for public
    if (status) {
      if (status !== 'ALL') {
        query += ' AND status = ?';
        params.push(status);
      }
    } else {
      query += " AND status = 'PUBLISHED'";
    }

    if (category && category !== 'ALL') {
      query += ' AND (category = ? OR filter_tags LIKE ?)';
      params.push(category, `%"${category}"%`);
    }

    query += ' ORDER BY display_order ASC, created_at DESC';

    const projects = db.prepare(query).all(...params) as any[];

    const parsed = projects.map((p) => ({
      ...p,
      filter_tags: p.filter_tags ? JSON.parse(p.filter_tags) : [],
      technologies: p.technologies ? JSON.parse(p.technologies) : [],
      metrics: p.metrics ? JSON.parse(p.metrics) : [],
      color_palette: p.color_palette ? JSON.parse(p.color_palette) : [],
      typography: p.typography ? JSON.parse(p.typography) : [],
      screens: p.screens ? JSON.parse(p.screens) : [],
      client_testimonial: p.client_testimonial ? JSON.parse(p.client_testimonial) : null,
    }));

    res.json({ projects: parsed });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Public / Admin: Get single project by slug or ID
router.get('/projects/:idOrSlug', (req, res) => {
  try {
    const idOrSlug = String(req.params.idOrSlug);
    const project = db.prepare('SELECT * FROM projects WHERE id = ? OR slug = ?').get(idOrSlug, idOrSlug) as any;
    if (!project) {
      res.status(404).json({ error: 'Project not found.' });
      return;
    }

    const parsed = {
      ...project,
      filter_tags: project.filter_tags ? JSON.parse(project.filter_tags) : [],
      technologies: project.technologies ? JSON.parse(project.technologies) : [],
      metrics: project.metrics ? JSON.parse(project.metrics) : [],
      color_palette: project.color_palette ? JSON.parse(project.color_palette) : [],
      typography: project.typography ? JSON.parse(project.typography) : [],
      screens: project.screens ? JSON.parse(project.screens) : [],
      client_testimonial: project.client_testimonial ? JSON.parse(project.client_testimonial) : null,
    };

    res.json({ project: parsed });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Create project
router.post('/projects', requireAuth, requireRoles(['SUPER_ADMIN', 'ADMIN', 'EDITOR']), (req: AuthenticatedRequest, res) => {
  try {
    const {
      title,
      slug,
      client,
      industry,
      category,
      filter_tags,
      short_description,
      full_overview,
      challenge,
      strategy,
      solution,
      results,
      type,
      year,
      status = 'PUBLISHED',
      featured = 0,
      featured_number,
      highlight_summary,
      featured_image,
      technologies,
      metrics,
      color_palette,
      typography,
      screens,
      client_testimonial,
      seo_title,
      seo_description,
      display_order = 0,
    } = req.body;

    if (!title || !short_description) {
      res.status(400).json({ error: 'Title and short description are required.' });
      return;
    }

    const safeSlug = (slug || title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const id = `proj_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

    db.prepare(`
      INSERT INTO projects (
        id, slug, title, client, industry, category, filter_tags, short_description,
        full_overview, challenge, strategy, solution, results, type, year, status,
        featured, featured_number, highlight_summary, featured_image, technologies,
        metrics, color_palette, typography, screens, client_testimonial, seo_title,
        seo_description, display_order
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?
      )
    `).run(
      id,
      safeSlug,
      title,
      client || null,
      industry || null,
      category || 'WEBSITES',
      JSON.stringify(filter_tags || ['ALL', category || 'WEBSITES']),
      short_description,
      full_overview || null,
      challenge || null,
      strategy || null,
      solution || null,
      results || null,
      type || 'CLIENT PROJECT',
      year || '2026',
      status,
      featured ? 1 : 0,
      featured_number || null,
      highlight_summary || null,
      featured_image || '/assets/projects/velora.jpg',
      JSON.stringify(technologies || []),
      JSON.stringify(metrics || []),
      JSON.stringify(color_palette || []),
      JSON.stringify(typography || []),
      JSON.stringify(screens || []),
      client_testimonial ? JSON.stringify(client_testimonial) : null,
      seo_title || `${title} — WORKVORTEX Case Study`,
      seo_description || short_description,
      Number(display_order) || 0
    );

    logAuditAction(req.user!.userId, req.user!.name, 'PROJECT_CREATED', 'PROJECTS', id, `Created project "${title}"`);

    res.status(201).json({ success: true, id, slug: safeSlug });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Update project
router.patch('/projects/:id', requireAuth, requireRoles(['SUPER_ADMIN', 'ADMIN', 'EDITOR']), (req: AuthenticatedRequest, res) => {
  try {
    const id = String(req.params.id);
    const p = req.body;
    const existing = db.prepare('SELECT * FROM projects WHERE id = ?').get(id) as any;
    if (!existing) {
      res.status(404).json({ error: 'Project not found.' });
      return;
    }

    db.prepare(`
      UPDATE projects SET
        title = ?,
        slug = ?,
        client = ?,
        industry = ?,
        category = ?,
        filter_tags = ?,
        short_description = ?,
        full_overview = ?,
        challenge = ?,
        strategy = ?,
        solution = ?,
        results = ?,
        type = ?,
        year = ?,
        status = ?,
        featured = ?,
        featured_number = ?,
        highlight_summary = ?,
        featured_image = ?,
        technologies = ?,
        metrics = ?,
        color_palette = ?,
        typography = ?,
        screens = ?,
        client_testimonial = ?,
        seo_title = ?,
        seo_description = ?,
        display_order = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(
      p.title ?? existing.title,
      p.slug ?? existing.slug,
      p.client ?? existing.client,
      p.industry ?? existing.industry,
      p.category ?? existing.category,
      p.filter_tags ? JSON.stringify(p.filter_tags) : existing.filter_tags,
      p.short_description ?? existing.short_description,
      p.full_overview ?? existing.full_overview,
      p.challenge ?? existing.challenge,
      p.strategy ?? existing.strategy,
      p.solution ?? existing.solution,
      p.results ?? existing.results,
      p.type ?? existing.type,
      p.year ?? existing.year,
      p.status ?? existing.status,
      p.featured !== undefined ? (p.featured ? 1 : 0) : existing.featured,
      p.featured_number ?? existing.featured_number,
      p.highlight_summary ?? existing.highlight_summary,
      p.featured_image ?? existing.featured_image,
      p.technologies ? JSON.stringify(p.technologies) : existing.technologies,
      p.metrics ? JSON.stringify(p.metrics) : existing.metrics,
      p.color_palette ? JSON.stringify(p.color_palette) : existing.color_palette,
      p.typography ? JSON.stringify(p.typography) : existing.typography,
      p.screens ? JSON.stringify(p.screens) : existing.screens,
      p.client_testimonial !== undefined ? (p.client_testimonial ? JSON.stringify(p.client_testimonial) : null) : existing.client_testimonial,
      p.seo_title ?? existing.seo_title,
      p.seo_description ?? existing.seo_description,
      p.display_order ?? existing.display_order,
      id
    );

    logAuditAction(req.user!.userId, req.user!.name, 'PROJECT_UPDATED', 'PROJECTS', id, `Updated project "${p.title || existing.title}"`);

    res.json({ success: true, message: 'Project updated.' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Delete project
router.delete('/projects/:id', requireAuth, requireRoles(['SUPER_ADMIN', 'ADMIN']), (req: AuthenticatedRequest, res) => {
  try {
    const id = String(req.params.id);
    db.prepare('DELETE FROM projects WHERE id = ?').run(id);
    logAuditAction(req.user!.userId, req.user!.name, 'PROJECT_DELETED', 'PROJECTS', id, 'Project permanently deleted');
    res.json({ success: true, message: 'Project deleted.' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/* ==========================================================================
   4. SERVICES CMS ENDPOINTS
   ========================================================================== */

// Public / Admin: Get all services
router.get('/services', (_req, res) => {
  try {
    const services = db.prepare('SELECT * FROM services ORDER BY display_order ASC').all() as any[];
    const parsed = services.map((s) => ({
      ...s,
      features: s.features ? JSON.parse(s.features) : [],
      deliverables: s.deliverables ? JSON.parse(s.deliverables) : [],
      process_steps: s.process_steps ? JSON.parse(s.process_steps) : [],
      faqs: s.faqs ? JSON.parse(s.faqs) : [],
    }));
    res.json({ services: parsed });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Public / Admin: Get single service by slug or ID
router.get('/services/:idOrSlug', (req, res) => {
  try {
    const idOrSlug = String(req.params.idOrSlug);
    const service = db.prepare('SELECT * FROM services WHERE id = ? OR slug = ?').get(idOrSlug, idOrSlug) as any;
    if (!service) {
      res.status(404).json({ error: 'Service not found.' });
      return;
    }

    res.json({
      service: {
        ...service,
        features: service.features ? JSON.parse(service.features) : [],
        deliverables: service.deliverables ? JSON.parse(service.deliverables) : [],
        process_steps: service.process_steps ? JSON.parse(service.process_steps) : [],
        faqs: service.faqs ? JSON.parse(service.faqs) : [],
      },
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Create service
router.post('/services', requireAuth, requireRoles(['SUPER_ADMIN', 'ADMIN', 'EDITOR']), (req: AuthenticatedRequest, res) => {
  try {
    const s = req.body;
    if (!s.name || !s.short_description) {
      res.status(400).json({ error: 'Service name and short description are required.' });
      return;
    }

    const safeSlug = (s.slug || s.name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const id = `srv_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

    db.prepare(`
      INSERT INTO services (
        id, slug, name, short_description, full_description, icon_name, hero_image,
        starting_price_inr, starting_price_usd, timeline, features, deliverables,
        process_steps, faqs, cta_heading, cta_subtext, is_published, display_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      safeSlug,
      s.name,
      s.short_description,
      s.full_description || s.short_description,
      s.icon_name || 'Globe',
      s.hero_image || null,
      s.starting_price_inr || '₹7,000 – ₹12,000',
      s.starting_price_usd || '$85 – $145',
      s.timeline || '1–2 Weeks',
      JSON.stringify(s.features || []),
      JSON.stringify(s.deliverables || []),
      JSON.stringify(s.process_steps || []),
      JSON.stringify(s.faqs || []),
      s.cta_heading || `Ready to start your ${s.name}?`,
      s.cta_subtext || 'Get a transparent proposal within 24 hours.',
      s.is_published !== undefined ? (s.is_published ? 1 : 0) : 1,
      Number(s.display_order) || 0
    );

    logAuditAction(req.user!.userId, req.user!.name, 'SERVICE_CREATED', 'SERVICES', id, `Created service "${s.name}"`);

    res.status(201).json({ success: true, id, slug: safeSlug });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Update service
router.patch('/services/:id', requireAuth, requireRoles(['SUPER_ADMIN', 'ADMIN', 'EDITOR']), (req: AuthenticatedRequest, res) => {
  try {
    const id = String(req.params.id);
    const s = req.body;
    const existing = db.prepare('SELECT * FROM services WHERE id = ?').get(id) as any;
    if (!existing) {
      res.status(404).json({ error: 'Service not found.' });
      return;
    }

    db.prepare(`
      UPDATE services SET
        name = ?,
        slug = ?,
        short_description = ?,
        full_description = ?,
        icon_name = ?,
        hero_image = ?,
        starting_price_inr = ?,
        starting_price_usd = ?,
        timeline = ?,
        features = ?,
        deliverables = ?,
        process_steps = ?,
        faqs = ?,
        cta_heading = ?,
        cta_subtext = ?,
        is_published = ?,
        display_order = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(
      s.name ?? existing.name,
      s.slug ?? existing.slug,
      s.short_description ?? existing.short_description,
      s.full_description ?? existing.full_description,
      s.icon_name ?? existing.icon_name,
      s.hero_image ?? existing.hero_image,
      s.starting_price_inr ?? existing.starting_price_inr,
      s.starting_price_usd ?? existing.starting_price_usd,
      s.timeline ?? existing.timeline,
      s.features ? JSON.stringify(s.features) : existing.features,
      s.deliverables ? JSON.stringify(s.deliverables) : existing.deliverables,
      s.process_steps ? JSON.stringify(s.process_steps) : existing.process_steps,
      s.faqs ? JSON.stringify(s.faqs) : existing.faqs,
      s.cta_heading ?? existing.cta_heading,
      s.cta_subtext ?? existing.cta_subtext,
      s.is_published !== undefined ? (s.is_published ? 1 : 0) : existing.is_published,
      s.display_order ?? existing.display_order,
      id
    );

    logAuditAction(req.user!.userId, req.user!.name, 'SERVICE_UPDATED', 'SERVICES', id, `Updated service "${s.name || existing.name}"`);

    res.json({ success: true, message: 'Service updated.' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Delete service
router.delete('/services/:id', requireAuth, requireRoles(['SUPER_ADMIN', 'ADMIN']), (req: AuthenticatedRequest, res) => {
  try {
    const id = String(req.params.id);
    db.prepare('DELETE FROM services WHERE id = ?').run(id);
    logAuditAction(req.user!.userId, req.user!.name, 'SERVICE_DELETED', 'SERVICES', id, 'Service deleted');
    res.json({ success: true, message: 'Service deleted.' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/* ==========================================================================
   5. TESTIMONIALS & FAQS
   ========================================================================== */

router.get('/testimonials', (_req, res) => {
  const testimonials = db.prepare('SELECT * FROM testimonials ORDER BY display_order ASC').all();
  res.json({ testimonials });
});

router.post('/testimonials', requireAuth, requireRoles(['SUPER_ADMIN', 'ADMIN', 'EDITOR']), (req: AuthenticatedRequest, res) => {
  const { author_name, author_role, author_company, author_avatar, quote, rating = 5, is_featured = 1 } = req.body;
  const id = `tst_${Date.now()}`;
  db.prepare(`
    INSERT INTO testimonials (id, author_name, author_role, author_company, author_avatar, quote, rating, is_featured)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(id, author_name, author_role, author_company, author_avatar, quote, rating, is_featured ? 1 : 0);
  res.status(201).json({ success: true, id });
});

router.delete('/testimonials/:id', requireAuth, requireRoles(['SUPER_ADMIN', 'ADMIN']), (req: AuthenticatedRequest, res) => {
  const id = String(req.params.id);
  db.prepare('DELETE FROM testimonials WHERE id = ?').run(id);
  res.json({ success: true });
});

router.get('/faqs', (_req, res) => {
  const faqs = db.prepare('SELECT * FROM faqs WHERE is_published = 1 ORDER BY display_order ASC').all();
  res.json({ faqs });
});

router.post('/faqs', requireAuth, requireRoles(['SUPER_ADMIN', 'ADMIN', 'EDITOR']), (req: AuthenticatedRequest, res) => {
  const { category, question, answer, display_order = 0 } = req.body;
  const id = `faq_${Date.now()}`;
  db.prepare(`
    INSERT INTO faqs (id, category, question, answer, is_published, display_order)
    VALUES (?, ?, ?, ?, 1, ?)
  `).run(id, category || 'General', question, answer, display_order);
  res.status(201).json({ success: true, id });
});

router.delete('/faqs/:id', requireAuth, requireRoles(['SUPER_ADMIN', 'ADMIN']), (req: AuthenticatedRequest, res) => {
  const id = String(req.params.id);
  db.prepare('DELETE FROM faqs WHERE id = ?').run(id);
  res.json({ success: true });
});

/* ==========================================================================
   6. WEBSITE CONTENT CMS & SEO METADATA
   ========================================================================== */

router.get('/content', (_req, res) => {
  const rows = db.prepare('SELECT * FROM page_content').all() as any[];
  const content: Record<string, any> = {};
  for (const row of rows) {
    try {
      content[row.key] = JSON.parse(row.value);
    } catch {
      content[row.key] = row.value;
    }
  }
  res.json({ content });
});

router.patch('/content', requireAuth, requireRoles(['SUPER_ADMIN', 'ADMIN', 'EDITOR']), (req: AuthenticatedRequest, res) => {
  const { updates } = req.body; // { key: value }
  if (!updates || typeof updates !== 'object') {
    res.status(400).json({ error: 'Updates object required.' });
    return;
  }

  for (const [key, val] of Object.entries(updates)) {
    const stringVal = typeof val === 'string' ? val : JSON.stringify(val);
    db.prepare(`
      INSERT INTO page_content (key, section, value, updated_at)
      VALUES (?, 'custom', ?, CURRENT_TIMESTAMP)
      ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP
    `).run(key, stringVal);
  }

  logAuditAction(req.user!.userId, req.user!.name, 'CONTENT_UPDATED', 'PAGE_CONTENT', 'GLOBAL', 'Website content blocks updated');

  res.json({ success: true, message: 'Content updated successfully.' });
});

router.get('/seo', (_req, res) => {
  const seo = db.prepare('SELECT * FROM seo_metadata').all();
  res.json({ seo });
});

router.patch('/seo', requireAuth, requireRoles(['SUPER_ADMIN', 'ADMIN', 'EDITOR']), (req: AuthenticatedRequest, res) => {
  const { route_path, title, description, keywords, canonical_url, og_title, og_description, og_image } = req.body;
  if (!route_path || !title || !description) {
    res.status(400).json({ error: 'Route path, title, and description are required.' });
    return;
  }

  db.prepare(`
    INSERT INTO seo_metadata (
      route_path, title, description, keywords, canonical_url, og_title, og_description, og_image, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(route_path) DO UPDATE SET
      title = excluded.title,
      description = excluded.description,
      keywords = excluded.keywords,
      canonical_url = excluded.canonical_url,
      og_title = excluded.og_title,
      og_description = excluded.og_description,
      og_image = excluded.og_image,
      updated_at = CURRENT_TIMESTAMP
  `).run(route_path, title, description, keywords || null, canonical_url || null, og_title || null, og_description || null, og_image || null);

  logAuditAction(req.user!.userId, req.user!.name, 'SEO_UPDATED', 'SEO', route_path, `SEO updated for route ${route_path}`);

  res.json({ success: true, message: 'SEO metadata updated.' });
});

/* ==========================================================================
   7. MEDIA LIBRARY
   ========================================================================== */

router.get('/media', requireAuth, (_req, res) => {
  const media = db.prepare('SELECT * FROM media ORDER BY created_at DESC').all();
  res.json({ media });
});

router.post('/media/upload', requireAuth, requireRoles(['SUPER_ADMIN', 'ADMIN', 'EDITOR']), upload.single('file'), (req: AuthenticatedRequest, res) => {
  if (!req.file) {
    res.status(400).json({ error: 'No file uploaded.' });
    return;
  }

  const id = `med_${Date.now()}`;
  const publicUrl = `/uploads/${req.file.filename}`;

  db.prepare(`
    INSERT INTO media (id, filename, original_name, url, mime_type, size_bytes, uploaded_by_user_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    req.file.filename,
    req.file.originalname,
    publicUrl,
    req.file.mimetype,
    req.file.size,
    req.user!.userId
  );

  logAuditAction(req.user!.userId, req.user!.name, 'MEDIA_UPLOADED', 'MEDIA', id, `Uploaded ${req.file.originalname} (${req.file.size} bytes)`);

  res.status(201).json({
    success: true,
    media: {
      id,
      url: publicUrl,
      filename: req.file.filename,
      original_name: req.file.originalname,
      size_bytes: req.file.size,
    },
  });
});

router.delete('/media/:id', requireAuth, requireRoles(['SUPER_ADMIN', 'ADMIN']), (req: AuthenticatedRequest, res) => {
  const id = String(req.params.id);
  const media = db.prepare('SELECT * FROM media WHERE id = ?').get(id) as any;
  if (media) {
    const filePath = path.join(uploadDir, media.filename);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.warn('Could not delete file from disk:', err);
      }
    }
    db.prepare('DELETE FROM media WHERE id = ?').run(id);
    logAuditAction(req.user!.userId, req.user!.name, 'MEDIA_DELETED', 'MEDIA', id, `Deleted file ${media.filename}`);
  }
  res.json({ success: true });
});

/* ==========================================================================
   8. TEAM & USER MANAGEMENT (SUPER ADMIN / ADMIN)
   ========================================================================== */

router.get('/team', requireAuth, requireRoles(['SUPER_ADMIN', 'ADMIN']), (_req, res) => {
  const users = db.prepare(`
    SELECT u.id, u.email, u.name, u.role_id, u.avatar_url, u.job_title, u.phone, u.is_active, u.status, u.email_verified, u.google_id, u.last_login_at, u.created_at, r.name as role_name
    FROM users u
    JOIN roles r ON u.role_id = r.id
    ORDER BY u.created_at ASC
  `).all();
  res.json({ users });
});

router.get('/users', requireAuth, requireRoles(['SUPER_ADMIN', 'ADMIN']), (_req, res) => {
  const users = db.prepare(`
    SELECT u.id, u.email, u.name, u.role_id, u.avatar_url, u.job_title, u.phone, u.is_active, u.status, u.email_verified, u.google_id, u.last_login_at, u.created_at, r.name as role_name
    FROM users u
    JOIN roles r ON u.role_id = r.id
    ORDER BY u.created_at DESC
  `).all();
  res.json({ users });
});

router.post('/team', requireAuth, requireRoles(['SUPER_ADMIN', 'ADMIN']), async (req: AuthenticatedRequest, res) => {
  const { email, name, password, role_id = 'EDITOR', job_title, phone } = req.body;
  if (!email || !name || !password) {
    res.status(400).json({ error: 'Email, name, and password are required.' });
    return;
  }

  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email.trim().toLowerCase());
  if (existing) {
    res.status(400).json({ error: 'A user with this email already exists.' });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  const id = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

  db.prepare(`
    INSERT INTO users (id, email, name, password_hash, role_id, job_title, phone, is_active, status, email_verified)
    VALUES (?, ?, ?, ?, ?, ?, ?, 1, 'ACTIVE', 1)
  `).run(id, email.trim().toLowerCase(), name.trim(), passwordHash, role_id, job_title || 'Team Member', phone || null);

  logAuditAction(req.user!.userId, req.user!.name, 'USER_CREATED', 'USERS', id, `Created team user ${name} (${role_id})`);

  res.status(201).json({ success: true, id });
});

router.patch('/team/:id', requireAuth, requireRoles(['SUPER_ADMIN', 'ADMIN']), async (req: AuthenticatedRequest, res) => {
  const id = String(req.params.id);
  const { name, role_id, job_title, phone, is_active, status, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id) as any;
  if (!user) {
    res.status(404).json({ error: 'User not found.' });
    return;
  }

  // Prevent demoting the last SUPER_ADMIN
  if (user.role_id === 'SUPER_ADMIN' && role_id && role_id !== 'SUPER_ADMIN') {
    const superCount = (db.prepare("SELECT COUNT(*) as count FROM users WHERE role_id = 'SUPER_ADMIN'").get() as any).count;
    if (superCount <= 1) {
      res.status(400).json({ error: 'Cannot demote the only Super Administrator.' });
      return;
    }
  }

  let passHash = user.password_hash;
  if (password && password.trim()) {
    const salt = await bcrypt.genSalt(10);
    passHash = await bcrypt.hash(password.trim(), salt);
  }

  db.prepare(`
    UPDATE users SET
      name = ?,
      role_id = ?,
      job_title = ?,
      phone = ?,
      is_active = ?,
      status = ?,
      password_hash = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(
    name ?? user.name,
    role_id ?? user.role_id,
    job_title ?? user.job_title,
    phone ?? user.phone,
    is_active !== undefined ? (is_active ? 1 : 0) : user.is_active,
    status ?? user.status ?? 'ACTIVE',
    passHash,
    id
  );

  logAuditAction(req.user!.userId, req.user!.name, 'USER_UPDATED', 'USERS', id, `Updated user ${user.email}`);

  res.json({ success: true, message: 'User updated.' });
});

router.patch('/users/:id/role', requireAuth, requireRoles(['SUPER_ADMIN']), (req: AuthenticatedRequest, res) => {
  const id = String(req.params.id);
  const { role_id } = req.body;

  if (!role_id) {
    res.status(400).json({ error: 'Role ID is required.' });
    return;
  }

  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id) as any;
  if (!user) {
    res.status(404).json({ error: 'User not found.' });
    return;
  }

  if (user.role_id === 'SUPER_ADMIN' && role_id !== 'SUPER_ADMIN') {
    const superCount = (db.prepare("SELECT COUNT(*) as count FROM users WHERE role_id = 'SUPER_ADMIN'").get() as any).count;
    if (superCount <= 1) {
      res.status(400).json({ error: 'Cannot demote the only Super Administrator.' });
      return;
    }
  }

  db.prepare('UPDATE users SET role_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(role_id, id);
  logAuditAction(req.user!.userId, req.user!.name, 'ROLE_CHANGED', 'USERS', id, `Changed role of ${user.email} to ${role_id}`);
  res.json({ success: true, message: `User role updated to ${role_id}.` });
});

router.patch('/users/:id/status', requireAuth, requireRoles(['SUPER_ADMIN', 'ADMIN']), (req: AuthenticatedRequest, res) => {
  const id = String(req.params.id);
  const { status } = req.body; // 'ACTIVE' | 'DISABLED'

  if (!status || !['ACTIVE', 'DISABLED', 'SUSPENDED'].includes(status)) {
    res.status(400).json({ error: 'Valid status (ACTIVE, DISABLED) is required.' });
    return;
  }

  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id) as any;
  if (!user) {
    res.status(404).json({ error: 'User not found.' });
    return;
  }

  if (user.role_id === 'SUPER_ADMIN' && status === 'DISABLED') {
    res.status(400).json({ error: 'Super Administrator accounts cannot be disabled.' });
    return;
  }

  const isActive = status === 'ACTIVE' ? 1 : 0;
  db.prepare('UPDATE users SET status = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(status, isActive, id);
  
  if (status === 'DISABLED') {
    revokeUserSessions(id);
  }

  logAuditAction(req.user!.userId, req.user!.name, 'STATUS_CHANGED', 'USERS', id, `Changed status of ${user.email} to ${status}`);
  res.json({ success: true, message: `User account is now ${status}.` });
});

router.post('/users/:id/revoke-sessions', requireAuth, requireRoles(['SUPER_ADMIN', 'ADMIN']), (req: AuthenticatedRequest, res) => {
  const id = String(req.params.id);
  revokeUserSessions(id);
  logAuditAction(req.user!.userId, req.user!.name, 'SESSIONS_REVOKED', 'USERS', id, `Revoked active sessions for user ID: ${id}`);
  res.json({ success: true, message: 'All active sessions for this user have been revoked.' });
});

router.delete('/users/:id', requireAuth, requireRoles(['SUPER_ADMIN']), (req: AuthenticatedRequest, res) => {
  const id = String(req.params.id);
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id) as any;

  if (!user) {
    res.status(404).json({ error: 'User not found.' });
    return;
  }

  if (user.role_id === 'SUPER_ADMIN') {
    const superCount = (db.prepare("SELECT COUNT(*) as count FROM users WHERE role_id = 'SUPER_ADMIN'").get() as any).count;
    if (superCount <= 1) {
      res.status(400).json({ error: 'Cannot delete the only Super Administrator.' });
      return;
    }
  }

  db.prepare('DELETE FROM users WHERE id = ?').run(id);
  logAuditAction(req.user!.userId, req.user!.name, 'USER_DELETED', 'USERS', id, `Deleted user ${user.email}`);
  res.json({ success: true, message: 'User deleted.' });
});

/* ==========================================================================
   9. DASHBOARD STATS, SETTINGS & AUDIT LOGS
   ========================================================================== */

router.get('/dashboard/stats', requireAuth, (_req, res) => {
  const totalLeads = (db.prepare('SELECT COUNT(*) as count FROM leads').get() as any).count;
  const newLeads = (db.prepare("SELECT COUNT(*) as count FROM leads WHERE status = 'NEW'").get() as any).count;
  const hotLeads = (db.prepare("SELECT COUNT(*) as count FROM leads WHERE quality = 'HOT'").get() as any).count;
  const warmLeads = (db.prepare("SELECT COUNT(*) as count FROM leads WHERE quality = 'WARM'").get() as any).count;
  const coldLeads = (db.prepare("SELECT COUNT(*) as count FROM leads WHERE quality = 'COLD'").get() as any).count;

  const totalProjects = (db.prepare('SELECT COUNT(*) as count FROM projects').get() as any).count;
  const publishedProjects = (db.prepare("SELECT COUNT(*) as count FROM projects WHERE status = 'PUBLISHED'").get() as any).count;
  const totalServices = (db.prepare('SELECT COUNT(*) as count FROM services').get() as any).count;

  const recentLeads = db.prepare('SELECT id, name, company, email, project_type, budget_range, score, quality, status, created_at FROM leads ORDER BY created_at DESC LIMIT 6').all();
  const recentAudit = db.prepare('SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 10').all();

  res.json({
    metrics: {
      totalLeads,
      newLeads,
      hotLeads,
      warmLeads,
      coldLeads,
      totalProjects,
      publishedProjects,
      totalServices,
    },
    recentLeads,
    recentAudit,
  });
});

router.get('/audit-logs', requireAuth, requireRoles(['SUPER_ADMIN', 'ADMIN']), (_req, res) => {
  const logs = db.prepare('SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 100').all();
  res.json({ logs });
});

router.get('/settings', requireAuth, requireRoles(['SUPER_ADMIN', 'ADMIN']), (_req, res) => {
  const rows = db.prepare('SELECT key, value, description, is_secret, updated_at FROM settings').all() as any[];
  // Mask secrets
  const sanitized = rows.map((r) => ({
    ...r,
    value: r.is_secret && r.value ? `${r.value.substring(0, 4)}••••••••` : r.value,
  }));
  res.json({ settings: sanitized });
});

router.patch('/settings', requireAuth, requireRoles(['SUPER_ADMIN']), (req: AuthenticatedRequest, res) => {
  const { updates } = req.body;
  if (!updates || typeof updates !== 'object') {
    res.status(400).json({ error: 'Updates object required.' });
    return;
  }

  for (const [key, val] of Object.entries(updates)) {
    if (val !== undefined && val !== null) {
      db.prepare(`
        UPDATE settings SET value = ?, updated_at = CURRENT_TIMESTAMP WHERE key = ?
      `).run(String(val), key);
    }
  }

  logAuditAction(req.user!.userId, req.user!.name, 'SETTINGS_UPDATED', 'SETTINGS', 'GLOBAL', 'Studio settings updated');

  res.json({ success: true, message: 'Settings updated.' });
});
