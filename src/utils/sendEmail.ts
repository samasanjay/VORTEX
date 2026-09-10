export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  phone?: string;
  projectType: string;
  budgetRange: string;
  timeline: string;
  message: string;
}

export interface SendEmailResponse {
  success: boolean;
  message: string;
}

export const OFFICIAL_STUDIO_EMAIL = 'workvortex01@gmail.com';

/**
 * Sends inquiry email using Web3Forms or Formspree serverless dispatch
 */
export async function sendInquiryEmail(data: ContactFormData): Promise<SendEmailResponse> {
  const accessKey =
    import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'a3c8e44c-3543-4560-8451-2d7c08796245';

  const payload = {
    access_key: accessKey,
    subject: `[WORKVORTEX INQUIRY] ${data.projectType} from ${data.name}`,
    from_name: `WORKVORTEX Inquiry (${data.name})`,
    to_email: OFFICIAL_STUDIO_EMAIL,
    reply_to: data.email,
    name: data.name,
    email: data.email,
    company: data.company || 'Not specified',
    phone: data.phone || 'Not specified',
    project_type: data.projectType,
    budget_range: data.budgetRange,
    timeline: data.timeline,
    message: data.message,
    source: 'WORKVORTEX Digital Showcase Website (workvortex01@gmail.com)',
  };

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (response.ok && (result.success || result.message === 'Form submitted successfully')) {
      return {
        success: true,
        message: `Inquiry successfully delivered to ${OFFICIAL_STUDIO_EMAIL}.`,
      };
    } else {
      return {
        success: true,
        message: `Inquiry registered for ${OFFICIAL_STUDIO_EMAIL}. Mail client ready.`,
      };
    }
  } catch {
    return {
      success: true,
      message: `Inquiry prepared for ${OFFICIAL_STUDIO_EMAIL}. Mail client ready.`,
    };
  }
}

/**
 * Generates a pre-filled mailto URI for instant native email client dispatch to workvortex01@gmail.com
 */
export function generateMailtoLink(data: ContactFormData, destinationEmail = OFFICIAL_STUDIO_EMAIL): string {
  const subject = encodeURIComponent(`[WORKVORTEX Project Inquiry] ${data.projectType} - ${data.name}`);
  const body = encodeURIComponent(
`Hello WORKVORTEX Team,

I would like to discuss a project with your studio.

--- CLIENT DETAILS ---
Name: ${data.name}
Email: ${data.email}
Company: ${data.company || 'N/A'}
Phone / WhatsApp: ${data.phone || 'N/A'}

--- PROJECT SCOPE ---
Focus: ${data.projectType}
Budget Range: ${data.budgetRange}
Timeline: ${data.timeline}

--- REQUIREMENTS & OVERVIEW ---
${data.message}

---
Target: ${destinationEmail}
Sent via WORKVORTEX Digital Showcase Portal`
  );

  return `mailto:${destinationEmail}?subject=${subject}&body=${body}`;
}

/**
 * Generates a WhatsApp direct inquiry link
 */
export function generateWhatsAppLink(data: ContactFormData, phoneNumber = '919876543210'): string {
  const text = encodeURIComponent(
`Hi WORKVORTEX! I am ${data.name} from ${data.company || 'my organization'}. I am interested in a ${data.projectType} project (Timeline: ${data.timeline}, Budget: ${data.budgetRange}). Overview: ${data.message}`
  );
  return `https://wa.me/${phoneNumber}?text=${text}`;
}
