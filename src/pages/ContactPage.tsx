import React, { useState } from 'react';
import { Mail, Clock, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: 'Web Application / SaaS',
    timeline: '1–3 months',
    message: '',
  });

  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
  };

  const projectTypes = [
    'Web Application / SaaS',
    'E-Commerce Experience',
    'Mobile App (iOS / Android)',
    'UI/UX & Design System',
    'Dashboard & Analytics',
    'Other Digital Product',
  ];

  const timelineOptions = ['< 1 month', '1–3 months', '3–6 months', 'Flexible'];

  return (
    <div className="pt-32 pb-24 bg-[#F8FAFC]">
      <div className="container-vortex space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-blue-700 font-semibold">
            <Mail className="w-3.5 h-3.5" />
            <span>START A COLLABORATION</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-slate-900 tracking-tight">
            LET’S BUILD SOMETHING GREAT.
          </h1>
          <p className="text-slate-600 font-body text-base sm:text-lg leading-relaxed">
            Whether you are launching a new digital platform, rethinking a complex software interface, or engineering a responsive web app, we’d love to connect.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-2xl text-slate-900">
                    Inquiry Received
                  </h3>
                  <p className="text-slate-600 max-w-md mx-auto text-sm leading-relaxed">
                    Thank you, <strong className="text-slate-900">{formData.name}</strong>. We have received your project details and will get back to you within 24 hours.
                  </p>
                </div>
                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        company: '',
                        projectType: 'Web Application / SaaS',
                        timeline: '1–3 months',
                        message: '',
                      });
                    }}
                    className="btn-secondary text-xs py-2 px-4"
                  >
                    Submit Another Inquiry
                  </button>
                  <Link to="/work" className="btn-primary text-xs py-2 px-4">
                    <span>Explore Selected Work</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
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

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-semibold text-slate-700 block">
                    Organization / Project Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Acme Labs"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                  />
                </div>

                {/* Project Type */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-semibold text-slate-700 block">
                    Project Focus
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {projectTypes.map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setFormData({ ...formData, projectType: type })}
                        className={`p-2.5 rounded-xl text-left text-xs font-medium border transition-colors ${
                          formData.projectType === type
                            ? 'bg-blue-50 border-blue-300 text-blue-700 font-semibold'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-semibold text-slate-700 block">
                    Estimated Timeline
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {timelineOptions.map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setFormData({ ...formData, timeline: opt })}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                          formData.timeline === opt
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-semibold text-slate-700 block">
                    Project Overview & Goals
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about the project, target audience, and key deliverables..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                  />
                </div>

                <button type="submit" className="btn-primary w-full py-3 justify-center text-sm font-semibold">
                  <span>Send Project Inquiry</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Studio Information */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-sm">
              <h3 className="font-display font-bold text-xl text-slate-900">
                Direct Contact
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-200 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-500 block uppercase">Inquiries & Partnerships</span>
                    <span className="text-sm font-semibold text-slate-900">studio@workvortex.studio</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-200 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-500 block uppercase">Response Commitment</span>
                    <span className="text-sm font-semibold text-slate-900">Within 24 business hours</span>
                  </div>
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
                We handle product architecture, design systems, UI/UX flows, frontend engineering, and production handoffs with strict milestone transparency.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
