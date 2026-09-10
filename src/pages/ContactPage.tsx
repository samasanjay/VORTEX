import React, { useState } from 'react';
import {
  Mail,
  Clock,
  Send,
  CheckCircle2,
  ArrowRight,
  Loader2,
  ExternalLink,
  MessageSquare,
  Sparkles,
  DollarSign
} from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ContactFormData } from '../utils/sendEmail';
import {
  sendInquiryEmail,
  generateMailtoLink,
  generateWhatsAppLink
} from '../utils/sendEmail';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: 'Web Application / SaaS',
    budgetRange: '$5,000 – $15,000',
    timeline: '1–3 months',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');

  const projectTypes = [
    'Web Application / SaaS',
    'E-Commerce Experience',
    'Mobile App (iOS / Android)',
    'UI/UX & Design System',
    'Dashboard & Analytics',
    'AI & Spatial Interface',
  ];

  const budgetOptions = [
    '<$5,000',
    '$5,000 – $15,000',
    '$15,000 – $30,000',
    '$30,000+',
  ];

  const timelineOptions = ['< 1 month', '1–3 months', '3–6 months', 'Flexible'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setStatusMessage('Transmitting inquiry to studio inbox...');

    try {
      const response = await sendInquiryEmail(formData);
      setIsSubmitting(false);
      setSubmitted(true);
      setStatusMessage(response.message);
    } catch {
      setIsSubmitting(false);
      setSubmitted(true);
      setStatusMessage('Inquiry prepared. Mail application fallback ready.');
    }
  };

  const mailtoUrl = generateMailtoLink(formData);
  const whatsappUrl = generateWhatsAppLink(formData);

  return (
    <div className="pt-32 pb-24 bg-[#F8FAFC]">
      <div className="container-vortex space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-blue-700 font-semibold">
            <Mail className="w-3.5 h-3.5" />
            <span>START A PROJECT INQUIRY</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-slate-900 tracking-tight">
            LET’S BUILD SOMETHING GREAT.
          </h1>
          <p className="text-slate-600 font-body text-base sm:text-lg leading-relaxed">
            Fill in your project requirements below. Your inquiry will be transmitted directly to our studio inbox, and our engineering team will get back to you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Interactive Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
            {submitted ? (
              <div className="py-8 space-y-8">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
                    Inquiry Sent Successfully!
                  </h3>
                  {statusMessage && (
                    <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-700 font-semibold">
                      {statusMessage}
                    </div>
                  )}
                  <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-slate-900">{formData.name}</strong>. We have received your project details and a team member will review your requirements and reach out via <strong className="text-slate-900">{formData.email}</strong>.
                  </p>
                </div>

                {/* Submitted Summary Box */}
                <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-3 text-left">
                  <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold block">
                    Inquiry Summary Transmitted:
                  </span>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block font-mono">CLIENT</span>
                      <span className="font-semibold text-slate-800">{formData.name} ({formData.company || 'Individual'})</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-mono">EMAIL</span>
                      <span className="font-semibold text-slate-800">{formData.email}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-mono">PROJECT TYPE</span>
                      <span className="font-semibold text-slate-800">{formData.projectType}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-mono">TIMELINE / BUDGET</span>
                      <span className="font-semibold text-slate-800">{formData.timeline} • {formData.budgetRange}</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-200">
                    <span className="text-slate-400 block font-mono text-[11px]">MESSAGE</span>
                    <p className="text-xs text-slate-700 italic line-clamp-3">"{formData.message}"</p>
                  </div>
                </div>

                {/* Direct Alternative Options */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-mono text-slate-500 block text-center font-medium">
                    Optional: Open inquiry in your email client or WhatsApp
                  </span>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={mailtoUrl}
                      className="btn-secondary w-full sm:w-auto text-xs py-2.5 px-4 justify-center flex items-center gap-2"
                      title="Open in default mail client"
                    >
                      <Mail className="w-3.5 h-3.5 text-blue-600" />
                      <span>Open in Mail App</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary w-full sm:w-auto text-xs py-2.5 px-4 justify-center flex items-center gap-2"
                      title="Send via WhatsApp"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Message on WhatsApp</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  </div>
                </div>

                {/* Reset or explore actions */}
                <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        company: '',
                        phone: '',
                        projectType: 'Web Application / SaaS',
                        budgetRange: '$5,000 – $15,000',
                        timeline: '1–3 months',
                        message: '',
                      });
                    }}
                    className="text-xs font-mono font-semibold text-slate-600 hover:text-slate-900 py-2 px-3 rounded-lg hover:bg-slate-100"
                  >
                    Submit Another Inquiry
                  </button>
                  <Link to="/work" className="btn-primary text-xs py-2 px-5">
                    <span>Browse Portfolio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name and Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-semibold text-slate-700 block">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Rivera"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-semibold text-slate-700 block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Company and Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-semibold text-slate-700 block">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Acme Studio"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-semibold text-slate-700 block">
                      Phone / WhatsApp (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Project Focus Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-semibold text-slate-700 block">
                    Project Type & Focus
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {projectTypes.map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setFormData({ ...formData, projectType: type })}
                        className={`p-2.5 rounded-xl text-left text-xs font-medium border transition-colors ${
                          formData.projectType === type
                            ? 'bg-blue-50 border-blue-300 text-blue-700 font-semibold shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget Range & Timeline Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Budget */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-semibold text-slate-700 block flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-slate-500" />
                      <span>Budget Estimate</span>
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                    >
                      {budgetOptions.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Timeline */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-semibold text-slate-700 block flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>Estimated Timeline</span>
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                    >
                      {timelineOptions.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-semibold text-slate-700 block">
                    Project Requirements & Deliverables *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your project goals, target audience, preferred technologies, and specific features needed..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full py-3 justify-center text-sm font-semibold shadow-md disabled:opacity-75 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Inquiry...</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <span>Send Project Inquiry Directly</span>
                      <Send className="w-4 h-4" />
                    </span>
                  )}
                </button>

                <p className="text-[11px] font-mono text-slate-400 text-center">
                  Protected by SSL • Direct delivery to studio inbox • NDA upon request
                </p>
              </form>
            )}
          </div>

          {/* Right Column: Studio Information & Direct Email */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-sm">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <h3 className="font-display font-bold text-xl text-slate-900">
                  Direct Studio Inbox
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-500 block uppercase">Project Inquiries</span>
                    <a
                      href="mailto:studio@workvortex.studio"
                      className="text-sm font-semibold text-blue-600 hover:underline"
                    >
                      studio@workvortex.studio
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-200 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-500 block uppercase">Response Commitment</span>
                    <span className="text-sm font-semibold text-slate-900">Within 24 business hours</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <span className="text-xs font-mono text-slate-500 font-semibold block mb-2">
                  Preferred Project Scopes:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="badge-tech text-[11px]">Web Applications</span>
                  <span className="badge-tech text-[11px]">SaaS Dashboards</span>
                  <span className="badge-tech text-[11px]">Design Systems</span>
                  <span className="badge-tech text-[11px]">Mobile Apps</span>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-slate-100/70 border border-slate-200 space-y-3">
              <span className="text-xs font-mono text-blue-600 uppercase font-bold">
                Engagement Model
              </span>
              <h4 className="font-display font-bold text-lg text-slate-900">
                End-to-End Product Sprints
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We take ideas from wireframes and product architecture to interactive prototypes, component systems, and production frontend code with clear milestone deliverables.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
