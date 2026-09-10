import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-16 bg-[#F1F5F9] border-t border-slate-200 text-left relative">
      <div className="container-vortex space-y-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-12 border-b border-slate-200">
          {/* Logo & Tagline */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 p-[1.5px] shadow-sm">
                <div className="w-full h-full bg-white rounded-[6.5px] flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-4 h-4 fill-none stroke-blue-600 stroke-[9] stroke-linecap-round stroke-linejoin-round">
                    <path d="M 20 28 L 36 76 L 50 46 L 64 76 L 80 28" />
                  </svg>
                </div>
              </div>
              <span className="font-display font-bold text-xl text-slate-900 tracking-tight">
                WORKVORTEX
              </span>
            </div>
            <p className="text-xs font-mono tracking-widest text-slate-500 uppercase font-semibold">
              Build. Automate. Scale.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <nav className="flex flex-wrap items-center gap-6 text-xs font-mono tracking-wider text-slate-600 font-semibold">
            <a href="#work" className="hover:text-blue-600 transition-colors">
              WORK
            </a>
            <a href="#lab" className="hover:text-blue-600 transition-colors">
              LAB
            </a>
            <a href="#archive" className="hover:text-blue-600 transition-colors">
              UI ARCHIVE
            </a>
            <a href="#system" className="hover:text-blue-600 transition-colors">
              DESIGN SYSTEM
            </a>
            <a href="#about" className="hover:text-blue-600 transition-colors">
              ABOUT
            </a>
          </nav>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            data-cursor="TOP"
            className="p-3 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all shadow-sm self-start md:self-auto"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom copyright & transparent disclaimer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-slate-500 font-medium">
          <div>
            © 2026 WORKVORTEX. All rights reserved.
          </div>
          <div className="text-[11px] text-slate-500">
            DIGITAL WORK & INTERFACE SHOWCASE // SAMPLE & CONCEPT DESIGNS
          </div>
        </div>
      </div>
    </footer>
  );
};
