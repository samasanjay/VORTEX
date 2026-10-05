import { db } from './db.js';

export interface LeadDataForAI {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
  projectType: string;
  servicesRequired?: string[];
  budgetRange: string;
  timeline: string;
  message: string;
  additionalInfo?: string;
}

export interface AIQualificationResult {
  score: number; // 0-100
  quality: 'HOT' | 'WARM' | 'COLD';
  summary: string;
  painPoints: string[];
  recommendedService: string;
  pricingInr: string;
  pricingUsd: string;
  closureProbability: string;
  outreachDraft: string;
  keySignals: string[];
  isRealTimeOpenAI: boolean;
}

/**
 * Get OpenAI API Key from Server Environment or Stored Settings
 */
function getOpenAIKey(): string {
  if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.trim().startsWith('sk-')) {
    return process.env.OPENAI_API_KEY.trim();
  }

  try {
    const setting = db.prepare("SELECT value FROM settings WHERE key = 'openai_api_key'").get() as { value: string } | undefined;
    if (setting && setting.value && setting.value.trim().startsWith('sk-')) {
      return setting.value.trim();
    }
  } catch {
    // ignore
  }

  return '';
}

/**
 * Server-Side Master Qualification Entrypoint
 */
export async function qualifyLeadServerSide(lead: LeadDataForAI): Promise<AIQualificationResult> {
  const apiKey = getOpenAIKey();

  if (apiKey) {
    try {
      const openAiResult = await callOpenAIQualification(lead, apiKey);
      return { ...openAiResult, isRealTimeOpenAI: true };
    } catch (err) {
      console.warn('[AI Pipeline] OpenAI API request failed, falling back to dynamic semantic engine:', err);
    }
  }

  return generateHeuristicQualification(lead);
}

/**
 * Call OpenAI API directly from server
 */
async function callOpenAIQualification(lead: LeadDataForAI, apiKey: string): Promise<AIQualificationResult> {
  const systemPrompt = `You are the Lead Qualification AI Engine for WORKVORTEX — a digital product and web engineering studio ("Build. Automate. Scale.").
Analyze the incoming client inquiry and output an accurate, strategic qualification dossier in strict JSON format.

Standard Starting Ranges:
- Basic Website: ₹4,000 – ₹8,000 ($48 – $95)
- Professional Business Website: ₹7,000 – ₹12,000 ($85 – $145)
- E-commerce Website: ₹10,000 – ₹18,000 ($120 – $220)
- SaaS / Web App MVP: ₹15,000 – ₹30,000+ ($180 – $360+)
- Automation & AI Solutions: ₹8,000 – ₹18,000 ($95 – $220)
- UI/UX & Design Systems: ₹5,000 – ₹10,000 ($60 – $120)

Output ONLY valid JSON matching this schema:
{
  "score": <number 0-100>,
  "quality": <"HOT" | "WARM" | "COLD">,
  "summary": <string: 2 sentences executive summary of the lead intent>,
  "painPoints": [<string>, <string>],
  "recommendedService": <string>,
  "pricingInr": <string>,
  "pricingUsd": <string>,
  "closureProbability": <string: e.g. "80%">,
  "outreachDraft": <string: personalized email outreach draft to client>,
  "keySignals": [<string>, <string>]
}`;

  const userContent = JSON.stringify(lead, null, 2);

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
        { role: 'user', content: `Please qualify this client inquiry:\n\n${userContent}` },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI HTTP ${response.status}: ${errorText}`);
  }

  const json = (await response.json()) as any;
  const parsed = JSON.parse(json.choices[0].message.content);

  return {
    score: Math.min(100, Math.max(10, Number(parsed.score) || 75)),
    quality: ['HOT', 'WARM', 'COLD'].includes(parsed.quality) ? parsed.quality : 'WARM',
    summary: parsed.summary || 'Inquiry analyzed successfully.',
    painPoints: Array.isArray(parsed.painPoints) ? parsed.painPoints : ['Modernization requirement'],
    recommendedService: parsed.recommendedService || lead.projectType,
    pricingInr: parsed.pricingInr || '₹10,000 – ₹18,000',
    pricingUsd: parsed.pricingUsd || '$120 – $220',
    closureProbability: parsed.closureProbability || '70%',
    outreachDraft: parsed.outreachDraft || `Hi ${lead.name}, thank you for reaching out to WORKVORTEX. We would be thrilled to assist you with ${lead.projectType}.`,
    keySignals: Array.isArray(parsed.keySignals) ? parsed.keySignals : ['Defined timeline'],
    isRealTimeOpenAI: true,
  };
}

/**
 * Dynamic Semantic & Heuristic Fallback Engine
 */
function generateHeuristicQualification(lead: LeadDataForAI): AIQualificationResult {
  const msgLower = (lead.message + ' ' + (lead.additionalInfo || '')).toLowerCase();
  const projectType = lead.projectType || 'Professional Business Website';

  let score = 50;
  const signals: string[] = [];
  const painPoints: string[] = [];

  // Budget assessment
  if (lead.budgetRange.includes('30,000') || lead.budgetRange.includes('18,000')) {
    score += 25;
    signals.push('High budget allocation aligned with custom engineering');
  } else if (lead.budgetRange.includes('12,000') || lead.budgetRange.includes('10,000')) {
    score += 18;
    signals.push('Standard commercial tier budget');
  } else if (lead.budgetRange.includes('Flexible')) {
    score += 15;
    signals.push('Open to scope-based consultation');
  } else {
    score += 10;
  }

  // Timeline assessment
  if (lead.timeline.includes('Immediate') || lead.timeline.includes('1-2') || lead.timeline.includes('1–2')) {
    score += 15;
    signals.push('High urgency / fast kickoff timeline');
  } else if (lead.timeline.includes('Month') || lead.timeline.includes('3-4')) {
    score += 10;
    signals.push('Structured quarterly roadmap');
  }

  // Message depth assessment
  const wordCount = lead.message.trim().split(/\s+/).length;
  if (wordCount > 30) {
    score += 10;
    signals.push('Comprehensive problem definition & detailed scope');
  } else if (wordCount > 10) {
    score += 5;
  }

  if (lead.company && lead.company.trim().length > 1) {
    score += 5;
    signals.push(`Corporate entity representation (${lead.company})`);
  }

  // Detect pain points
  if (msgLower.includes('slow') || msgLower.includes('speed') || msgLower.includes('performance')) {
    painPoints.push('Legacy performance bottlenecks & slow load times');
  }
  if (msgLower.includes('convert') || msgLower.includes('leads') || msgLower.includes('sales')) {
    painPoints.push('Low conversion rates & lack of automated capture funnels');
  }
  if (msgLower.includes('mobile') || msgLower.includes('responsive')) {
    painPoints.push('Suboptimal mobile experience on current site');
  }
  if (msgLower.includes('automate') || msgLower.includes('manual') || msgLower.includes('time')) {
    painPoints.push('Manual operational overhead and repetitive workflows');
  }
  if (painPoints.length === 0) {
    painPoints.push('Need for modern brand authority and elevated UI/UX');
  }

  score = Math.min(98, Math.max(30, score));
  const quality: 'HOT' | 'WARM' | 'COLD' = score >= 80 ? 'HOT' : score >= 60 ? 'WARM' : 'COLD';

  // Pricing determination based on project type
  let pricingInr = '₹7,000 – ₹12,000';
  let pricingUsd = '$85 – $145';

  if (projectType.includes('E-commerce')) {
    pricingInr = '₹10,000 – ₹18,000';
    pricingUsd = '$120 – $220';
  } else if (projectType.includes('SaaS') || projectType.includes('Application') || projectType.includes('Complex')) {
    pricingInr = '₹15,000 – ₹30,000+';
    pricingUsd = '$180 – $360+';
  } else if (projectType.includes('Automation') || projectType.includes('AI')) {
    pricingInr = '₹8,000 – ₹18,000';
    pricingUsd = '$95 – $220';
  } else if (projectType.includes('Logo') || projectType.includes('Landing')) {
    pricingInr = '₹3,000 – ₹6,000';
    pricingUsd = '$36 – $72';
  }

  const closureProb = quality === 'HOT' ? '80% – 90%' : quality === 'WARM' ? '60% – 75%' : '40% – 50%';

  const outreachDraft = `Hi ${lead.name},

Thank you for reaching out to WORKVORTEX regarding your ${projectType} project.

We reviewed your requirements for ${lead.company || 'your project'} and identified key opportunities to optimize ${painPoints[0] || 'your digital interface'}.

Based on our established studio benchmarks, we can deliver this within ${lead.timeline || '2–3 weeks'} starting at ${pricingInr} (${pricingUsd}).

Would you be available for a brief 15-minute technical alignment call this week to finalize the scope?

Best regards,
The WORKVORTEX Engineering Team
workvortex01@gmail.com`;

  return {
    score,
    quality,
    summary: `${lead.name} from ${lead.company || 'Independent Organization'} is requesting ${projectType} with an estimated budget of ${lead.budgetRange} and ${lead.timeline} timeline.`,
    painPoints,
    recommendedService: projectType,
    pricingInr,
    pricingUsd,
    closureProbability: closureProb,
    outreachDraft,
    keySignals: signals,
    isRealTimeOpenAI: false,
  };
}
