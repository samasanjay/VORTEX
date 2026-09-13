import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { ArrowLeft, Home, Compass, Layers, Mail, ArrowUpRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="pt-36 pb-28 bg-[#F8FAFC] min-h-[80vh] flex items-center">
      <SEO
        title="404 — Page Not Found"
        description="The requested page could not be located on WORKVORTEX. Explore our selected work directory or return to the home page."
        canonical="/404"
        noindex={true}
      />

      <div className="container-vortex max-w-2xl mx-auto text-center space-y-8">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-xs font-mono text-rose-700 font-semibold shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
          <span>HTTP 404 — ROUTE NOT FOUND</span>
        </div>

        {/* Big 404 Visual & Headline */}
        <div className="space-y-3">
          <div className="font-display font-extrabold text-7xl sm:text-9xl tracking-tighter text-slate-200 select-none">
            404
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-5xl text-slate-900 tracking-tight -mt-6 sm:-mt-10 relative z-10">
            Page Not Found
          </h1>
          <p className="text-slate-600 font-body text-base sm:text-lg max-w-lg mx-auto leading-relaxed pt-2">
            The page you are looking for may have been moved, renamed, or does not exist in the WORKVORTEX directory.
          </p>
        </div>

        {/* Quick Recovery Action Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-left pt-4">
          <Link
            to="/"
            className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-400 shadow-xs hover:shadow-md transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Home className="w-4 h-4" />
              </div>
              <div>
                <div className="font-display font-bold text-sm text-slate-900">Return Home</div>
                <div className="text-[11px] text-slate-500 font-mono">workvortex.studio/</div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
          </Link>

          <Link
            to="/work"
            className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-400 shadow-xs hover:shadow-md transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <div className="font-display font-bold text-sm text-slate-900">Selected Work</div>
                <div className="text-[11px] text-slate-500 font-mono">Case studies & apps</div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
          </Link>

          <Link
            to="/ui-archive"
            className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-400 shadow-xs hover:shadow-md transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <div className="font-display font-bold text-sm text-slate-900">UI Archive</div>
                <div className="text-[11px] text-slate-500 font-mono">Interface vault</div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 transition-colors" />
          </Link>

          <Link
            to="/contact"
            className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-400 shadow-xs hover:shadow-md transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <div className="font-display font-bold text-sm text-slate-900">Start a Project</div>
                <div className="text-[11px] text-slate-500 font-mono">Studio inquiries</div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
          </Link>
        </div>

        {/* Back Link */}
        <div className="pt-2">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Go back to previous page</span>
          </button>
        </div>
      </div>
    </div>
  );
};
