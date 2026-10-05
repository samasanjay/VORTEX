import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import type { SEOMetadata } from '../types/api';
import { Save, CheckCircle2, Eye, Loader2 } from 'lucide-react';

export const SEOManager: React.FC = () => {
  const [seoList, setSeoList] = useState<SEOMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoute, setSelectedRoute] = useState<string>('/');
  const [currentSEO, setCurrentSEO] = useState<SEOMetadata>({
    route_path: '/',
    title: '',
    description: '',
    keywords: '',
    canonical_url: '',
    og_title: '',
    og_description: '',
    og_image: '',
    robots: 'index, follow',
  });
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const availableRoutes = [
    { path: '/', label: 'Home Page (/)' },
    { path: '/work', label: 'Selected Work (/work)' },
    { path: '/services', label: 'Services Catalog (/services)' },
    { path: '/about', label: 'About Studio (/about)' },
    { path: '/process', label: 'Process & Methodology (/process)' },
    { path: '/technology', label: 'Technology Stack (/technology)' },
    { path: '/contact', label: 'Contact & Estimator (/contact)' },
    { path: '/faq', label: 'FAQ Directory (/faq)' },
    { path: '/privacy-policy', label: 'Privacy Policy (/privacy-policy)' },
    { path: '/terms', label: 'Terms & Conditions (/terms)' },
    { path: '/refund-policy', label: 'Cancellation & Refund Policy (/refund-policy)' },
  ];

  const fetchSEO = () => {
    setLoading(true);
    api
      .getSEO()
      .then((res) => {
        setSeoList(res.seo);
        const match = res.seo.find((s) => s.route_path === selectedRoute);
        if (match) {
          setCurrentSEO(match);
        } else {
          setCurrentSEO({
            route_path: selectedRoute,
            title: `WORKVORTEX — ${selectedRoute === '/' ? 'Digital Product Studio' : selectedRoute.replace('/', '')}`,
            description: 'WORKVORTEX digital product and web engineering studio.',
            canonical_url: `https://workvortex.studio${selectedRoute}`,
            og_title: `WORKVORTEX — ${selectedRoute}`,
            og_description: 'Build. Automate. Scale.',
            og_image: '/assets/workvortex-logo.png',
            robots: 'index, follow',
          });
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchSEO();
  }, [selectedRoute]);

  const handleRouteChange = (route: string) => {
    setSelectedRoute(route);
    const match = seoList.find((s) => s.route_path === route);
    if (match) {
      setCurrentSEO(match);
    } else {
      setCurrentSEO({
        route_path: route,
        title: `WORKVORTEX — ${route === '/' ? 'Digital Product Studio' : route.replace('/', '')}`,
        description: 'WORKVORTEX digital product and web engineering studio.',
        canonical_url: `https://workvortex.studio${route}`,
        og_title: `WORKVORTEX — ${route}`,
        og_description: 'Build. Automate. Scale.',
        og_image: '/assets/workvortex-logo.png',
        robots: 'index, follow',
      });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      await api.updateSEO(currentSEO);
      setSavedSuccess(true);
      fetchSEO();
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err: any) {
      alert(`SEO save error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading && seoList.length === 0) {
    return (
      <div className="p-16 text-center text-xs font-mono text-slate-500">
        <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-blue-500" />
        <span>Loading SEO configuration...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
            SEO & Social Graph Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
            Configure Google Rich Snippets, OpenGraph social cards, canonicals, and indexation tags.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {savedSuccess && (
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>SEO Updated!</span>
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold font-mono flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            <span>Save Route SEO</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Route Selector & Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-1.5">
                Select Website Route to Configure
              </label>
              <select
                value={selectedRoute}
                onChange={(e) => handleRouteChange(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-blue-400 font-semibold focus:outline-none focus:border-blue-500"
              >
                {availableRoutes.map((r) => (
                  <option key={r.path} value={r.path}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            <form onSubmit={handleSave} className="space-y-4 pt-2 border-t border-slate-800">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  SEO Page Title &lt;title&gt; *
                </label>
                <input
                  type="text"
                  required
                  value={currentSEO.title}
                  onChange={(e) => setCurrentSEO({ ...currentSEO, title: e.target.value })}
                  placeholder="Primary search title (under 60 characters)"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                />
                <span className="text-[10px] font-mono text-slate-500 mt-1 block">
                  Length: {currentSEO.title.length} characters (Optimal: 50-60)
                </span>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Meta Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={currentSEO.description}
                  onChange={(e) => setCurrentSEO({ ...currentSEO, description: e.target.value })}
                  placeholder="Compelling 150-160 character snippet for Google search results..."
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white leading-relaxed"
                />
                <span className="text-[10px] font-mono text-slate-500 mt-1 block">
                  Length: {currentSEO.description.length} characters (Optimal: 140-160)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Canonical URL</label>
                  <input
                    type="text"
                    value={currentSEO.canonical_url || ''}
                    onChange={(e) => setCurrentSEO({ ...currentSEO, canonical_url: e.target.value })}
                    placeholder="https://workvortex.studio/..."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-slate-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Robots Directives</label>
                  <input
                    type="text"
                    value={currentSEO.robots || 'index, follow'}
                    onChange={(e) => setCurrentSEO({ ...currentSEO, robots: e.target.value })}
                    placeholder="index, follow"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Keywords</label>
                <input
                  type="text"
                  value={currentSEO.keywords || ''}
                  onChange={(e) => setCurrentSEO({ ...currentSEO, keywords: e.target.value })}
                  placeholder="react 19, web studio, nextjs, digital agency"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-slate-300"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">OpenGraph OG Title</label>
                  <input
                    type="text"
                    value={currentSEO.og_title || ''}
                    onChange={(e) => setCurrentSEO({ ...currentSEO, og_title: e.target.value })}
                    placeholder="Social share title"
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">OG Image URL</label>
                  <input
                    type="text"
                    value={currentSEO.og_image || ''}
                    onChange={(e) => setCurrentSEO({ ...currentSEO, og_image: e.target.value })}
                    placeholder="/assets/workvortex-logo.png"
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded text-xs font-mono text-slate-300"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Right: Live Google & Social Preview */}
        <div className="lg:col-span-5 space-y-6">
          {/* Google Search Snippet Preview */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold border-b border-slate-800 pb-2 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-blue-400" />
              <span>Google SERP Snippet Preview</span>
            </h3>

            <div className="bg-white p-4 rounded-lg text-left space-y-1 shadow-sm font-sans">
              <div className="text-[12px] text-slate-600 truncate flex items-center gap-1">
                <span>https://workvortex.studio</span>
                <span className="text-slate-400">›</span>
                <span className="text-slate-800 font-medium">
                  {selectedRoute === '/' ? 'home' : selectedRoute.replace('/', '')}
                </span>
              </div>
              <h4 className="text-[#1a0dab] text-base font-medium hover:underline leading-snug cursor-pointer line-clamp-1">
                {currentSEO.title || 'WORKVORTEX Digital Studio'}
              </h4>
              <p className="text-[#4d5156] text-xs leading-relaxed line-clamp-2">
                {currentSEO.description ||
                  'High-performance digital products, web applications, and modern interfaces engineered with React.'}
              </p>
            </div>
          </div>

          {/* Twitter / OpenGraph Social Card Preview */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold border-b border-slate-800 pb-2">
              Social Card Preview (Twitter / LinkedIn)
            </h3>

            <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden text-left space-y-2 pb-3">
              <div className="w-full h-36 bg-slate-900 flex items-center justify-center border-b border-slate-800 relative overflow-hidden">
                {currentSEO.og_image ? (
                  <img
                    src={currentSEO.og_image}
                    alt="OG Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-xs font-mono text-slate-500">No OG Image Set</div>
                )}
              </div>
              <div className="px-3 space-y-1">
                <span className="text-[10.5px] font-mono text-slate-500 uppercase">
                  workvortex.studio
                </span>
                <h5 className="text-xs font-bold text-slate-200 line-clamp-1">
                  {currentSEO.og_title || currentSEO.title || 'WORKVORTEX'}
                </h5>
                <p className="text-[11px] text-slate-400 line-clamp-2">
                  {currentSEO.og_description || currentSEO.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
