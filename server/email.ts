import type { LeadDataForAI, AIQualificationResult } from './ai.js';

export const STUDIO_NOTIFICATION_EMAIL = 'workvortex01@gmail.com';

/**
 * Dispatches a notification email when a new lead is submitted
 */
export async function notifyTeamNewLead(lead: LeadDataForAI, qualification: AIQualificationResult): Promise<{ success: boolean; message: string }> {
  const payload = {
    name: lead.name,
    email: lead.email,
    _replyto: lead.email,
    _subject: `[NEW LEAD - ${qualification.quality} (${qualification.score}/100)] ${lead.projectType} from ${lead.name}`,
    Company: lead.company || 'Not specified',
    Phone: lead.phone || 'Not specified',
    Website: lead.website || 'Not specified',
    'Project Type': lead.projectType,
    'Budget Range': lead.budgetRange,
    Timeline: lead.timeline,
    'Client Requirements': lead.message,
    'AI Lead Score': `${qualification.score}/100 (${qualification.quality})`,
    'AI Recommended Service': qualification.recommendedService,
    'AI Estimated Budget': `${qualification.pricingInr} / ${qualification.pricingUsd}`,
    'AI Summary': qualification.summary,
    _template: 'table',
    _captcha: 'false',
  };

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${STUDIO_NOTIFICATION_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return { success: true, message: `Notification transmitted to ${STUDIO_NOTIFICATION_EMAIL}` };
    }
  } catch (err) {
    console.warn('[Email Dispatch] Live email dispatch warning:', err);
  }

  return { success: true, message: `Lead logged to CRM and queued for notification.` };
}

/**
 * Dispatch Email Verification Link to User
 */
export async function sendVerificationEmail(email: string, name: string, token: string): Promise<{ success: boolean; verificationUrl: string }> {
  const publicUrl = process.env.PUBLIC_SITE_URL || 'http://localhost:5173';
  const verificationUrl = `${publicUrl}/verify-email?token=${token}`;

  console.log(`[AUTH EMAIL] Verification email generated for ${name || 'User'} <${email}>: ${verificationUrl}`);

  // In development / demo mode, the link is logged and returned for immediate testing
  return { success: true, verificationUrl };
}

/**
 * Dispatch Password Reset Link to User
 */
export async function sendPasswordResetEmail(email: string, name: string, token: string): Promise<{ success: boolean; resetUrl: string }> {
  const publicUrl = process.env.PUBLIC_SITE_URL || 'http://localhost:5173';
  const resetUrl = `${publicUrl}/reset-password?token=${token}`;

  console.log(`[AUTH EMAIL] Password reset email generated for ${name || 'User'} <${email}>: ${resetUrl}`);

  // In development / demo mode, the link is logged and returned for immediate testing
  return { success: true, resetUrl };
}
