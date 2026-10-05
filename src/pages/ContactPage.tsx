import React, { useState } from 'react';
import {
  Mail,
  CheckCircle2,
  ArrowRight,
  Loader2,
  ExternalLink,
  MessageSquare,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { buildBreadcrumbSchema, buildContactSchema } from '../config/seo';
import { api } from '../services/api';
import { generateMailtoLink, generateWhatsAppLink } from '../utils/sendEmail';

export const ContactPage: React.FC = () => {
  const projectTypes = [
    'Custom Website Development',
    'Web Applications & SaaS',
    'UI/UX & Design Systems',
    'Business Automation & AI',
    'E-commerce Storefront',
    'Mobile Application MVP',
    'Custom / Enterprise System',
  ];

  const budgetOptionsMap: Record<string, string[]> = {
    'Custom Website Development': [
      '₹4,000 – ₹8,000 / $48 – $95 (Starter Flagship)',
      '₹7,000 – ₹12,000 / $85 – $145 (Professional Multi-Page)',
      'Flexible / Open for Discussion',
    ],
    'Web Applications & SaaS': [
      '₹15,000 – ₹22,000 / $180 – $265 (Custom Web App MVP)',
      '₹22,000 – ₹30,000+ / $265 – $360+ (Full SaaS Architecture & Database)',
      'Flexible / Open for Discussion',
    ],
    'UI/UX & Design Systems': [
      '₹5,000 – ₹7,500 / $60 – $90 (Figma Design Kit)',
      '₹7,500 – ₹10,000 / $90 – $120 (Complete Interactive Design System)',
      'Flexible / Open for Discussion',
    ],
    'Business Automation & AI': [
      '₹8,000 – ₹13,000 / $95 – $155 (Smart Website AI Assistant)',
      '₹13,000 – ₹18,000 / $155 – $220 (Custom Knowledge Base & CRM Lead Bot)',
      'Flexible / Open for Discussion',
    ],
    'E-commerce Storefront': [
      '₹10,000 – ₹14,000 / $120 – $170 (Starter Online Store + Cart Drawer)',
      '₹14,000 – ₹18,000 / $170 – $220 (Full Product Catalog + Checkout Tokenization)',
      'Flexible / Open for Discussion',
    ],
    'Mobile Application MVP': [
      '₹15,000 – ₹25,000 / $180 – $300 (React Native Companion App)',
      'Flexible / Open for Discussion',
    ],
    'Custom / Enterprise System': [
      '₹25,000 – ₹50,000+ / $300 – $600+ (Full Relational Portal)',
      'Flexible / Open for Discussion',
    ],
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    website: '',
    projectType: 'Custom Website Development',
    budgetRange: '₹7,000 – ₹12,000 / $85 – $145 (Professional Multi-Page)',
    timeline: '1–2 Weeks',
    message: '',
    additionalInfo: '',
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submissionResult, setSubmissionResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleProjectTypeSelect = (type: string) => {
    const options = budgetOptionsMap[type] || budgetOptionsMap['Custom Website Development'];
    setFormData((prev) => ({
      ...prev,
      projectType: type,
      budgetRange: options[0],
    }));
  };

  const timelineOptions = ['< 1 week (Fast Kickoff)', '1–2 Weeks', '2–4 Weeks', '1–2 Months', 'Flexible'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const response = await api.submitLead(formData);
      setIsSubmitting(false);
      setSubmitted(true);
      setSubmissionResult(response);
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMsg(err.message || 'Transmission failed. You can use the direct email client fallback below.');
    }
  };

  const mailtoUrl = generateMailtoLink(formData as any);
  const whatsappUrl = generateWhatsAppLink(formData as any);

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Contact & Inquiries', path: '/contact' },
  ]);

  const contactSchema = buildContactSchema();

  return (
    <div className="pt-32 pb-24 bg-[#F8FAFC] font-body">
      <SEO
        title="Start a Project & AI Pricing Estimator — WORKVORTEX Studio"
        description="Request a digital product consultation with WORKVORTEX. Instant scope estimation, transparent starting pricing, and 24-hour proposal turnaround."
        canonical="/contact"
        schema={[breadcrumbSchema, contactSchema]}
      />

      <div className="container-vortex space-y-16">
        
        {/* Header */}
        <header className="max-w-3xl space-y-4 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-blue-700 font-semibold">
            <Mail className="w-3.5 h-3.5" />
            <span>START A PROJECT INQUIRY</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-slate-900 tracking-tight leading-tight">
            LET’S BUILD SOMETHING EXTRAORDINARY.
          </h1>
          <p className="text-slate-600 font-body text-base sm:text-lg leading-relaxed">
            Fill in your project requirements below. Our backend AI evaluation engine will process your scope, generate an estimated price dossier, and alert our engineering team for a 24-hour proposal turnaround.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Inquiry Form */}
          <section aria-label="Inquiry Form" className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm text-left">
            {submitted ? (
              <div className="py-6 space-y-8">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
                    Inquiry Received Successfully!
                  </h2>
                  <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-700 font-semibold">
                    Reference ID: {submissionResult?.leadId || 'VORTEX-LEAD'}
                  </div>
                  <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-slate-900">{formData.name}</strong>. Our engineering squad has received your inquiry and will follow up at <strong className="text-slate-900">{formData.email}</strong> within 24 hours.
                  </p>
                </div>

                {/* Scope & Pricing Estimation Pill */}
                {submissionResult?.qualification && (
                  <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-blue-700 font-bold block flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      <span>Estimated Scope & Benchmark:</span>
                    </span>
                    <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                      <div>
                        <span className="text-slate-500 block text-[11px]">RECOMMENDED SERVICE</span>
                        <span className="font-bold text-slate-900 text-sm">
                          {submissionResult.qualification.recommendedService}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[11px]">ESTIMATED STARTING BUDGET</span>
                        <span className="font-bold text-emerald-700 text-sm">
                          {submissionResult.qualification.estimatedPricing?.inr}
                        </span>
                        <span className="text-slate-500 block text-[10.5px]">
                          ({submissionResult.qualification.estimatedPricing?.usd})
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Direct Alternative Options */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-mono text-slate-500 block text-center font-medium">
                    Optional: Connect directly via WhatsApp or Email
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-4 rounded-xl border border-slate-200 hover:border-emerald-400 bg-white hover:bg-emerald-50 text-slate-800 text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-all shadow-xs"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-600" />
                      <span>WhatsApp Direct Chat</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                    <a
                      href={mailtoUrl}
                      className="py-3 px-4 rounded-xl border border-slate-200 hover:border-blue-400 bg-white hover:bg-blue-50 text-slate-800 text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-all shadow-xs"
                    >
                      <Mail className="w-4 h-4 text-blue-600" />
                      <span>Open in Mail Client</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setSubmissionResult(null);
                    }}
                    className="text-xs font-mono text-blue-600 hover:underline cursor-pointer"
                  >
                    ← Submit another project inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {errorMsg && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono">
                    {errorMsg}
                  </div>
                )}

                {/* 1. Project Type Chips */}
                <div className="space-y-3">
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-900 font-bold">
                    1. Select Primary Focus *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {projectTypes.map((type) => {
                      const isSelected = formData.projectType === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => handleProjectTypeSelect(type)}
                          className={`p-3 rounded-xl text-left text-xs font-mono transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'bg-blue-50 border-2 border-blue-600 text-blue-900 font-bold shadow-xs'
                              : 'bg-slate-50/70 border border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                          }`}
                        >
                          <span>{type}</span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Budget Selection */}
                <div className="space-y-3">
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-900 font-bold">
                    2. Estimated Budget Target *
                  </label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                  >
                    {(budgetOptionsMap[formData.projectType] || budgetOptionsMap['Custom Website Development']).map(
                      (opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* 3. Timeline */}
                <div className="space-y-3">
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-900 font-bold">
                    3. Target Delivery Timeline *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {timelineOptions.map((tl) => (
                      <button
                        key={tl}
                        type="button"
                        onClick={() => setFormData({ ...formData, timeline: tl })}
                        className={`p-2.5 rounded-xl text-center text-xs font-mono transition-all cursor-pointer ${
                          formData.timeline === tl
                            ? 'bg-blue-600 text-white font-bold shadow-xs'
                            : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {tl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Client Contact Details */}
                <div className="space-y-4 pt-2 border-t border-slate-100">
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-900 font-bold">
                    4. Contact & Organization Details *
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-600 mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Marcus Vance"
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-600 mb-1">Corporate Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="marcus@company.com"
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-600 mb-1">Company / Studio</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Company Name"
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-600 mb-1">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* 5. Project Description */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-900 font-bold">
                    5. Project Requirements & Goals *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your product requirements, target audience, key pain points, or reference websites..."
                    className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full py-3.5 text-sm font-semibold flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting & AI Evaluating Scope...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Project Inquiry</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </section>

          {/* Right Column: Studio Guarantee & Contacts */}
          <aside className="lg:col-span-5 space-y-6 text-left">
            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm space-y-5">
              <h2 className="font-display font-bold text-xl text-slate-900">
                Direct Studio Contact
              </h2>

              <div className="space-y-3 text-xs font-mono">
                <div className="space-y-1">
                  <span className="text-slate-500">Official Inquiry Inbox:</span>
                  <a href="mailto:workvortex01@gmail.com" className="font-bold text-blue-600 hover:underline block text-sm">
                    workvortex01@gmail.com
                  </a>
                </div>

                <div className="space-y-1 pt-2 border-t border-slate-100">
                  <span className="text-slate-500">Fast Response Guarantee:</span>
                  <p className="text-slate-700 font-semibold">Within 24 Hours with Scope Dossier</p>
                </div>

                <div className="space-y-1 pt-2 border-t border-slate-100">
                  <span className="text-slate-500">Engagement Milestone Terms:</span>
                  <p className="text-slate-700 font-semibold">50% Deposit upon Kickoff / 50% upon QA Release</p>
                </div>
              </div>
            </div>

            {/* Guarantees */}
            <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white p-7 rounded-3xl space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-blue-300 font-bold uppercase">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>The WORKVORTEX Guarantee</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>100% intellectual property & source code ownership</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Sub-second Core Web Vitals speed target</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Strict TypeScript compilation with zero debt</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
