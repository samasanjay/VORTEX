import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Save, Loader2, CheckCircle2, Sparkles } from 'lucide-react';

export const ContentManager: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Content blocks
  const [heroContent, setHeroContent] = useState({
    badge: 'WORKVORTEX / DIGITAL STUDIO',
    headline_line1: 'Engineered for',
    headline_accent: 'Digital Distinction.',
    subtext: 'We architect high-performance digital products, web applications, SaaS dashboards, and modern interfaces engineered with React 19, Next.js, and TypeScript.',
    primary_cta_text: 'Start a Project',
    primary_cta_link: '/contact',
    secondary_cta_text: 'Explore Work',
    secondary_cta_link: '/work',
    availability_status: 'Available for 2026 Collaborations',
  });

  const [contactInfo, setContactInfo] = useState({
    email: 'workvortex01@gmail.com',
    phone: '+91 98765 43210',
    location: 'Global Digital Studio',
    working_hours: 'Monday – Saturday: 09:00 – 19:00 IST',
    response_time: 'Within 24 Hours',
  });

  const [socialLinks, setSocialLinks] = useState({
    github: 'https://github.com/workvortex',
    twitter: 'https://x.com/workvortex',
    linkedin: 'https://linkedin.com/company/workvortex',
    dribbble: 'https://dribbble.com/workvortex',
  });

  useEffect(() => {
    api
      .getContent()
      .then((res) => {
        if (res.content.home_hero) setHeroContent(res.content.home_hero);
        if (res.content.studio_contact_info) setContactInfo(res.content.studio_contact_info);
        if (res.content.social_links) setSocialLinks(res.content.social_links);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      await api.updateContent({
        home_hero: heroContent,
        studio_contact_info: contactInfo,
        social_links: socialLinks,
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err: any) {
      alert(`Save error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-6 w-32 bg-slate-800 rounded animate-pulse" />
        <div className="h-96 bg-slate-900 border border-slate-800 rounded-xl animate-pulse" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
            Website Content Manager (CMS)
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
            Update public homepage headlines, contact channels, and studio announcements without writing code.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {savedSuccess && (
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Published Live!</span>
            </span>
          )}
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold font-mono flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            <span>Save All Changes</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Homepage Hero Section */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              Homepage Hero & Value Proposition
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Badge Tagline</label>
              <input
                type="text"
                value={heroContent.badge}
                onChange={(e) => setHeroContent({ ...heroContent, badge: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Availability Pill</label>
              <input
                type="text"
                value={heroContent.availability_status}
                onChange={(e) => setHeroContent({ ...heroContent, availability_status: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Headline (Line 1)</label>
              <input
                type="text"
                value={heroContent.headline_line1}
                onChange={(e) => setHeroContent({ ...heroContent, headline_line1: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Headline Accent (Line 2)</label>
              <input
                type="text"
                value={heroContent.headline_accent}
                onChange={(e) => setHeroContent({ ...heroContent, headline_accent: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white font-bold text-blue-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">Subtext / Positioning Statement</label>
            <textarea
              rows={3}
              value={heroContent.subtext}
              onChange={(e) => setHeroContent({ ...heroContent, subtext: e.target.value })}
              className="w-full p-3 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Primary CTA Button</label>
              <input
                type="text"
                value={heroContent.primary_cta_text}
                onChange={(e) => setHeroContent({ ...heroContent, primary_cta_text: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Secondary CTA Button</label>
              <input
                type="text"
                value={heroContent.secondary_cta_text}
                onChange={(e) => setHeroContent({ ...heroContent, secondary_cta_text: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
              />
            </div>
          </div>
        </div>

        {/* Studio Channels & Social Links */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Contact Details */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold border-b border-slate-800 pb-2">
              Studio Official Contact
            </h2>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Inquiry Email</label>
              <input
                type="email"
                value={contactInfo.email}
                onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Studio Phone</label>
              <input
                type="text"
                value={contactInfo.phone}
                onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Working Hours</label>
              <input
                type="text"
                value={contactInfo.working_hours}
                onChange={(e) => setContactInfo({ ...contactInfo, working_hours: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold border-b border-slate-800 pb-2">
              Social Links
            </h2>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">GitHub URL</label>
              <input
                type="text"
                value={socialLinks.github}
                onChange={(e) => setSocialLinks({ ...socialLinks, github: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded text-xs text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Twitter / X URL</label>
              <input
                type="text"
                value={socialLinks.twitter}
                onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded text-xs text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">LinkedIn URL</label>
              <input
                type="text"
                value={socialLinks.linkedin}
                onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded text-xs text-white font-mono"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
