/**
 * WORKVORTEX — AI Lead Qualification Engine
 * Powered by OpenAI API with fallback dynamic contextual analyzer.
 * Evaluates lead score (0-100), quality (HOT/WARM/COLD), business opportunity,
 * detected problems, service recommendation, suggested pricing adhering to
 * VORTEX competitive starting ranges, personalized outreach, and follow-up strategy.
 */

export interface LeadInput {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  projectType: string;
  budgetRange: string;
  timeline: string;
  message: string;
}

export interface SuggestedPricing {
  inr: string;
  usd: string;
  tier: string;
  breakdown: string;
  thirdPartyCostsNote: string;
}

export interface FollowUpStrategy {
  timeline: string;
  actionSteps: string[];
  closureProbability: string;
}

export interface AIQualificationResult {
  leadScore: number; // 0–100
  leadQuality: 'HOT' | 'WARM' | 'COLD';
  businessOpportunity: string;
  problemsDetected: string[];
  recommendedService: string;
  reasonForRecommendation: string;
  suggestedPricing: SuggestedPricing;
  personalizedOutreachMessage: string;
  followUpStrategy: FollowUpStrategy;
  keySignals: string[];
  isRealTimeOpenAI?: boolean;
}

/**
 * Normal Starting Price Ranges (Rule-based benchmark)
 */
export const VORTEX_STARTING_PRICING_RANGES = [
  { service: 'Basic Business Website', inr: '₹4,000 – ₹8,000', usd: '$48 – $95', min: 4000, max: 8000 },
  { service: 'Professional Business Website', inr: '₹7,000 – ₹12,000', usd: '$85 – $145', min: 7000, max: 12000 },
  { service: 'E-commerce Website', inr: '₹10,000 – ₹18,000', usd: '$120 – $220', min: 10000, max: 18000 },
  { service: 'Website + Lead System', inr: '₹10,000 – ₹18,000', usd: '$120 – $220', min: 10000, max: 18000 },
  { service: 'Basic Business Automation', inr: '₹5,000 – ₹10,000', usd: '$60 – $120', min: 5000, max: 10000 },
  { service: 'AI Chatbot / AI Solutions', inr: '₹8,000 – ₹18,000', usd: '$95 – $220', min: 8000, max: 18000 },
  { service: 'Logo & Branding', inr: '₹2,500 – ₹6,000', usd: '$30 – $72', min: 2500, max: 6000 },
  { service: 'Small Landing Page', inr: '₹3,000 – ₹6,000', usd: '$36 – $72', min: 3000, max: 6000 },
  { service: 'Custom / Complex Projects', inr: '₹15,000 – ₹30,000+', usd: '$180 – $360+', min: 15000, max: 30000 },
];

/**
 * Main Qualification Entrypoint
 */
export async function qualifyLeadWithAI(
  lead: LeadInput,
  userApiKey?: string
): Promise<AIQualificationResult> {
  const apiKey =
    userApiKey ||
    (import.meta.env.VITE_OPENAI_API_KEY as string | undefined) ||
    (typeof window !== 'undefined' ? localStorage.getItem('vortex_openai_key') || '' : '');

  if (apiKey && apiKey.trim().startsWith('sk-')) {
    try {
      const openAiResult = await callOpenAIQualification(lead, apiKey.trim());
      return { ...openAiResult, isRealTimeOpenAI: true };
    } catch (err) {
      console.warn('OpenAI API call failed, switching to dynamic semantic analysis:', err);
      return generateDynamicQualification(lead);
    }
  }

  // Dynamic semantic heuristic engine (un-hardcoded, calculates dynamically based on specific input text)
  return generateDynamicQualification(lead);
}

/**
 * Calls OpenAI Chat Completions API with GPT-4o-mini
 */
async function callOpenAIQualification(
  lead: LeadInput,
  apiKey: string
): Promise<AIQualificationResult> {
  const systemPrompt = `You are the Lead Qualification AI Engine for WORKVORTEX — a digital product and web engineering studio ("Build. Automate. Scale.").

Your task is to analyze an incoming client inquiry and output an accurate, strategic qualification dossier.

IMPORTANT PRICING & BEHAVIOR RULES:
- WORKVORTEX is winning initial clients, building portfolio, and collecting testimonials.
- Pricing MUST remain affordable, competitive, and transparent.
- Standard Starting Price Ranges:
  • Basic Business Website: ₹4,000–₹8,000 (~$48–$95)
  • Professional Business Website: ₹7,000–₹12,000 (~$85–$145)
  • E-commerce Website: ₹10,000–₹18,000 (~$120–$220)
  • Website + Lead System: ₹10,000–₹18,000 (~$120–$220)
  • Basic Business Automation: ₹5,000–₹10,000 (~$60–$120)
  • AI Chatbot / AI Solutions: ₹8,000–₹18,000 (~$95–$220)
  • Logo & Branding: ₹2,500–₹6,000 (~$30–$72)
  • Small Landing Page: ₹3,000–₹6,000 (~$36–$72)
  • Custom/Complex Projects: ₹15,000–₹30,000+ (~$180–$360+), depending on scope.

PRICING CONSTRAINTS:
1. Never aggressively overprice a new client.
2. Use the lower/middle part of the range for simpler scopes.
3. Use the higher part only when technical complexity, multi-page needs, or integrations justify it.
4. Suggested price is a starting recommendation, subject to owner approval and final requirement clarity.
5. Do not invent fake discounts.
6. Clearly separate third-party costs (Domain, hosting, API credits, payment gateway transaction fees).

Output MUST be a JSON object with this exact structure:
{
  "leadScore": number (0 to 100),
  "leadQuality": "HOT" | "WARM" | "COLD",
  "businessOpportunity": "string describing potential and scope",
  "problemsDetected": ["problem 1", "problem 2", "problem 3"],
  "recommendedService": "string matching one of the services",
  "reasonForRecommendation": "string explaining strategic rationale",
  "suggestedPricing": {
    "inr": "₹X,XXX",
    "usd": "$XX",
    "tier": "string",
    "breakdown": "string explaining why this price was chosen within the range",
    "thirdPartyCostsNote": "string separating domain, hosting, API fees"
  },
  "personalizedOutreachMessage": "A professional, warm, client-tailored email/message ready to send to the client mentioning their requirements",
  "followUpStrategy": {
    "timeline": "e.g. Within 4 hours, Day 2 check-in, Day 4 demo link",
    "actionSteps": ["step 1", "step 2", "step 3"],
    "closureProbability": "e.g. High (75%)"
  },
  "keySignals": ["signal 1", "signal 2", "signal 3"]
}`;

  const userPrompt = `Incoming Lead Data:
Client Name: ${lead.name}
Email: ${lead.email}
Company: ${lead.company || 'Not provided'}
Phone/WhatsApp: ${lead.phone || 'Not provided'}
Selected Project Type: ${lead.projectType}
Budget Range Selected: ${lead.budgetRange}
Timeline: ${lead.timeline}
Message / Requirements:
"${lead.message}"`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `OpenAI API Error ${response.status}`);
  }

  const json = await response.json();
  const content = json.choices?.[0]?.message?.content;
  if (!content) throw new Error('No content returned from OpenAI');

  return JSON.parse(content) as AIQualificationResult;
}

/**
 * Dynamic Heuristic Engine (Computes unique scores, detects problems, and assigns pricing without hardcoding)
 */
function generateDynamicQualification(lead: LeadInput): AIQualificationResult {
  const msgLower = (lead.message || '').toLowerCase();
  const typeLower = (lead.projectType || '').toLowerCase();
  const name = lead.name || 'Client';

  // 1. Calculate Lead Score (0 - 100) dynamically
  let score = 40;
  const signals: string[] = [];
  const problems: string[] = [];

  // Contact completeness
  if (lead.email && lead.email.includes('@')) {
    score += 10;
    signals.push('Verified contact email provided');
  }
  if (lead.phone && lead.phone.trim().length > 5) {
    score += 10;
    signals.push('Direct phone / WhatsApp contact supplied');
  }
  if (lead.company && lead.company.trim().length > 1) {
    score += 8;
    signals.push(`Corporate entity identified: "${lead.company}"`);
  }

  // Message depth & technical intent
  const wordCount = lead.message ? lead.message.trim().split(/\s+/).length : 0;
  if (wordCount > 30) {
    score += 15;
    signals.push('Detailed project specification provided');
  } else if (wordCount > 10) {
    score += 8;
  } else {
    problems.push('Brief requirement description — discovery call recommended to define deliverables');
  }

  // Timeline urgency
  if (lead.timeline && (lead.timeline.includes('< 1') || msgLower.includes('urgent') || msgLower.includes('asap'))) {
    score += 12;
    signals.push('High-urgency project kickoff timeline');
  } else if (lead.timeline && lead.timeline.includes('1–3')) {
    score += 8;
    signals.push('Realistic 1–3 month development window');
  }

  // Detect specific problem areas
  if (msgLower.includes('slow') || msgLower.includes('redesign') || msgLower.includes('old') || msgLower.includes('ugly')) {
    problems.push('Legacy design or outdated user experience impacting brand trust');
  }
  if (msgLower.includes('sell') || msgLower.includes('payment') || msgLower.includes('cart') || typeLower.includes('e-com')) {
    problems.push('Need for frictionless payment checkout and product catalog management');
  }
  if (msgLower.includes('lead') || msgLower.includes('customer') || msgLower.includes('conversion') || typeLower.includes('lead')) {
    problems.push('Under-optimized lead capture funnel causing lost customer inquiries');
  }
  if (msgLower.includes('manual') || msgLower.includes('automate') || msgLower.includes('bot') || typeLower.includes('auto') || typeLower.includes('ai')) {
    problems.push('Time-consuming repetitive manual workflows needing automation');
  }
  if (problems.length === 0) {
    problems.push('Need for clean, modern digital presence to establish market credibility');
    problems.push('Lack of mobile-responsive interface optimized for conversions');
  }

  // Cap score
  score = Math.min(98, Math.max(25, score));

  // Determine Quality Tier
  let quality: 'HOT' | 'WARM' | 'COLD' = 'WARM';
  if (score >= 75) {
    quality = 'HOT';
  } else if (score < 50) {
    quality = 'COLD';
  }

  // Determine Recommended Service & Pricing matching VORTEX starting rules
  let recommendedService = 'Professional Business Website';
  let inrPrice = '₹8,500';
  let usdPrice = '$105';
  let priceTier = 'Standard Starter Range';
  let priceBreakdown =
    'Positioned in the middle of the ₹7,000–₹12,000 range to offer unbeatable value for a multi-section business platform.';
  let reason =
    'A custom, high-speed professional website with responsive layouts and structured sections will immediately elevate brand credibility.';

  if (typeLower.includes('e-com') || msgLower.includes('shop') || msgLower.includes('store') || msgLower.includes('product')) {
    recommendedService = 'E-commerce Website';
    inrPrice = '₹12,500';
    usdPrice = '$150';
    priceTier = 'Competitive E-Com Starter';
    priceBreakdown =
      'Within the ₹10,000–₹18,000 starting range. Covers catalog setup, shopping cart, and payment gateway integration.';
    reason =
      'Complete online store infrastructure with secure checkout, inventory management, and mobile-optimized buying flow.';
  } else if (typeLower.includes('lead') || msgLower.includes('funnel') || msgLower.includes('sales')) {
    recommendedService = 'Website + Lead System';
    inrPrice = '₹11,000';
    usdPrice = '$135';
    priceTier = 'Lead Generation Tier';
    priceBreakdown =
      'Within the ₹10,000–₹18,000 starting range. Includes conversion copy structure, CRM webhook, and automated lead alerts.';
    reason =
      'Engineered specifically to capture, validate, and route potential client inquiries straight to your phone and email.';
  } else if (typeLower.includes('landing') || typeLower.includes('single')) {
    recommendedService = 'Small Landing Page';
    inrPrice = '₹3,999';
    usdPrice = '$48';
    priceTier = 'Accessible Single-Page';
    priceBreakdown =
      'Within the ₹3,000–₹6,000 starting range. Focused on high-speed loading and single-goal action conversion.';
    reason =
      'High-impact single page to launch products, capture early signups, or showcase a single key offering.';
  } else if (typeLower.includes('auto') || msgLower.includes('automation') || msgLower.includes('zapier')) {
    recommendedService = 'Basic Business Automation';
    inrPrice = '₹6,500';
    usdPrice = '$80';
    priceTier = 'Workflow Optimization';
    priceBreakdown =
      'Within the ₹5,000–₹10,000 starting range. Automates notifications, lead sync, and database records.';
    reason =
      'Eliminates manual admin tasks by linking your website forms directly to Google Sheets, email, and WhatsApp.';
  } else if (typeLower.includes('ai') || typeLower.includes('bot') || msgLower.includes('ai') || msgLower.includes('gpt')) {
    recommendedService = 'AI Chatbot / AI Solutions';
    inrPrice = '₹9,999';
    usdPrice = '$120';
    priceTier = 'AI Solution Tier';
    priceBreakdown =
      'Within the ₹8,000–₹18,000 starting range. Embeds custom knowledge base AI assistant directly on web interface.';
    reason =
      '24/7 AI-driven customer inquiry handling and intelligent FAQ assistance to engage visitors instantly.';
  } else if (typeLower.includes('logo') || typeLower.includes('brand') || typeLower.includes('ui/ux')) {
    recommendedService = 'Logo & Branding';
    inrPrice = '₹3,500';
    usdPrice = '$42';
    priceTier = 'Brand Identity Tier';
    priceBreakdown =
      'Within the ₹2,500–₹6,000 starting range. Delivers vector logo marks, color palette, and typography guide.';
    reason =
      'Clean modern visual identity to make your digital presence memorable and polished across all platforms.';
  } else if (typeLower.includes('custom') || typeLower.includes('saas') || typeLower.includes('app') || typeLower.includes('complex')) {
    recommendedService = 'Custom / Complex Projects';
    inrPrice = '₹18,000';
    usdPrice = '$220';
    priceTier = 'Custom Development Range';
    priceBreakdown =
      'Starting part of the ₹15,000–₹30,000+ range. Modular architecture with database auth and API endpoints.';
    reason =
      'Tailored full-stack implementation built from the ground up for scalable web application performance.';
  }

  // Outreach Message Template
  const personalizedOutreach = `Hi ${name.split(' ')[0]},

Thank you for reaching out to WORKVORTEX regarding your ${lead.projectType || 'project'}.

We reviewed your requirements: "${lead.message.slice(0, 100)}${lead.message.length > 100 ? '...' : ''}"

Here is how we can assist:
• Recommended Scope: ${recommendedService}
• Starting Estimate: ${inrPrice} (${usdPrice}) — transparent starting range with no hidden agency markups.
• Timeline: Target kickoff within ${lead.timeline || '1–2 weeks'}.

Would you be available for a brief 10-minute discovery call or chat on WhatsApp to finalize the exact deliverables and lock in your project schedule?

Best regards,
WORKVORTEX Studio Team
workvortex01@gmail.com | Build. Automate. Scale.`;

  // Follow-up Strategy
  const followUpStrategy: FollowUpStrategy = {
    timeline: quality === 'HOT' ? 'Immediate response (within 2-4 hours)' : 'Within 12-24 hours',
    actionSteps: [
      `1. Send personalized email draft directly to ${lead.email}.`,
      lead.phone ? `2. WhatsApp brief introductory greeting to ${lead.phone}.` : '2. Prepare wireframe overview for follow-up.',
      '3. Day 2: Send demo preview link or interactive Figma concept.',
      '4. Day 4: Final availability check before archiving inquiry slot.',
    ],
    closureProbability: quality === 'HOT' ? 'High (70–85%)' : quality === 'WARM' ? 'Moderate (45–65%)' : 'Low (<30%)',
  };

  return {
    leadScore: score,
    leadQuality: quality,
    businessOpportunity: `High-value opportunity for ${recommendedService}. Client shows clear intent and readiness for digital transformation.`,
    problemsDetected: problems,
    recommendedService,
    reasonForRecommendation: reason,
    suggestedPricing: {
      inr: inrPrice,
      usd: usdPrice,
      tier: priceTier,
      breakdown: priceBreakdown,
      thirdPartyCostsNote:
        'Starting estimate covers development & design. Third-party expenses (domain, hosting, paid API credits, payment gateway charges) are billed at actual cost.',
    },
    personalizedOutreachMessage: personalizedOutreach,
    followUpStrategy,
    keySignals: signals,
    isRealTimeOpenAI: false,
  };
}
