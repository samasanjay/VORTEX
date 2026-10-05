import { db } from './db.js';

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
export const PUBLIC_SITE_URL = process.env.PUBLIC_SITE_URL || 'http://localhost:5173';

export interface GoogleProfile {
  googleId: string;
  email: string;
  name: string;
  avatarUrl?: string;
}

/**
 * Check if Google OAuth credentials are configured
 */
export function isGoogleOAuthConfigured(): boolean {
  return Boolean(GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET);
}

/**
 * Get Google OAuth Authorization Consent URL
 */
export function getGoogleAuthorizationUrl(stateNonce: string): string {
  const redirectUri = `${PUBLIC_SITE_URL}/api/auth/google/callback`;
  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    state: stateNonce,
    access_type: 'offline',
    prompt: 'select_account',
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

/**
 * Exchange Authorization Code for Google Verified Identity
 */
export async function exchangeGoogleCode(code: string): Promise<GoogleProfile> {
  if (!isGoogleOAuthConfigured()) {
    throw new Error('Google OAuth is not configured. Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env.');
  }

  const redirectUri = `${PUBLIC_SITE_URL}/api/auth/google/callback`;
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }),
  });

  if (!tokenResponse.ok) {
    const errorBody = await tokenResponse.text();
    throw new Error(`Google token exchange failed (${tokenResponse.status}): ${errorBody}`);
  }

  const tokenData = (await tokenResponse.json()) as {
    access_token: string;
    id_token: string;
    expires_in: number;
    token_type: string;
  };

  // Fetch verified user profile
  const userinfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });

  if (!userinfoResponse.ok) {
    throw new Error('Failed to retrieve user profile from Google OpenID userinfo endpoint.');
  }

  const userinfo = (await userinfoResponse.json()) as {
    sub: string;
    email: string;
    email_verified?: boolean;
    name: string;
    picture?: string;
  };

  if (!userinfo.email) {
    throw new Error('Google account did not provide a valid email address.');
  }

  return {
    googleId: userinfo.sub,
    email: userinfo.email.toLowerCase().trim(),
    name: userinfo.name || userinfo.email.split('@')[0],
    avatarUrl: userinfo.picture,
  };
}

/**
 * Authenticate or Register User via Google OpenID identity (with automatic account linking)
 */
export function findOrCreateGoogleUser(profile: GoogleProfile): {
  id: string;
  email: string;
  name: string;
  role_id: string;
  avatar_url: string | null;
  status: string;
  email_verified: number;
  isNewUser: boolean;
} {
  // 1. Check if user already exists with this google_id
  const existingGoogleUser = db.prepare('SELECT * FROM users WHERE google_id = ?').get(profile.googleId) as any;

  if (existingGoogleUser) {
    db.prepare(`
      UPDATE users SET
        name = COALESCE(name, ?),
        avatar_url = COALESCE(avatar_url, ?),
        email_verified = 1,
        last_login_at = CURRENT_TIMESTAMP,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(profile.name, profile.avatarUrl || null, existingGoogleUser.id);

    return {
      id: existingGoogleUser.id,
      email: existingGoogleUser.email,
      name: existingGoogleUser.name,
      role_id: existingGoogleUser.role_id,
      avatar_url: existingGoogleUser.avatar_url || profile.avatarUrl || null,
      status: existingGoogleUser.status || 'ACTIVE',
      email_verified: 1,
      isNewUser: false,
    };
  }

  // 2. Check if user exists by verified email (Account Linking)
  const existingEmailUser = db.prepare('SELECT * FROM users WHERE email = ?').get(profile.email) as any;

  if (existingEmailUser) {
    db.prepare(`
      UPDATE users SET
        google_id = ?,
        email_verified = 1,
        avatar_url = COALESCE(avatar_url, ?),
        last_login_at = CURRENT_TIMESTAMP,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(profile.googleId, profile.avatarUrl || null, existingEmailUser.id);

    return {
      id: existingEmailUser.id,
      email: existingEmailUser.email,
      name: existingEmailUser.name,
      role_id: existingEmailUser.role_id,
      avatar_url: existingEmailUser.avatar_url || profile.avatarUrl || null,
      status: existingEmailUser.status || 'ACTIVE',
      email_verified: 1,
      isNewUser: false,
    };
  }

  // 3. New User Registration via Google OAuth
  const newUserId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  db.prepare(`
    INSERT INTO users (
      id, email, name, password_hash, google_id, email_verified, role_id, avatar_url, status, is_active, last_login_at
    ) VALUES (
      ?, ?, ?, 'GOOGLE_OAUTH_ACCOUNT', ?, 1, 'PUBLIC_USER', ?, 'ACTIVE', 1, CURRENT_TIMESTAMP
    )
  `).run(
    newUserId,
    profile.email,
    profile.name,
    profile.googleId,
    profile.avatarUrl || null
  );

  return {
    id: newUserId,
    email: profile.email,
    name: profile.name,
    role_id: 'PUBLIC_USER',
    avatar_url: profile.avatarUrl || null,
    status: 'ACTIVE',
    email_verified: 1,
    isNewUser: true,
  };
}
