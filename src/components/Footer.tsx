import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-16 bg-[#04060A] border-t border-slate-800/80 text-left relative">
      <div className="container-vortex space-y-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-12 border-b border-slate-800/80">
          {/* Logo & Tagline */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 p-[1px]">
                <div className="w-full h-full bg-[#04060A] rounded-[7px] flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-4 h-4 fill-none stroke-blue-400 stroke-[9] stroke-linecap-round stroke-linejoin-round">
                    <path d="M 20 28 L 36 76 L 50 46 L 64 76 L 80 28" />
                  </svg>
                </div>
              </div>
              <span className="font-display font-bold text-xl text-white tracking-tight">
                WORKVORTEX
              </span>
            </div>
            <p className="text-xs font-mono tracking-widest text-slate-400 uppercase">
              Build. Automate. Scale.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <nav className="flex flex-wrap items-center gap-6 text-xs font-mono tracking-wider text-slate-300">
            <a href="#work" className="hover:text-blue-400 transition-colors">
              WORK
            </a>
            <a href="#lab" className="hover:text-blue-400 transition-colors">
              LAB
            </a>
            <a href="#archive" className="hover:text-blue-400 transition-colors">
              UI ARCHIVE
            </a>
            <a href="#system" className="hover:text-blue-400 transition-colors">
              DESIGN SYSTEM
            </a>
            <a href="#about" className="hover:text-blue-400 transition-colors">
              ABOUT
            </a>
          </nav>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            data-cursor="TOP"
            className="p-3 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-all self-start md:self-auto"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom copyright & transparent disclaimer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            © 2026 WORKVORTEX. All rights reserved.
          </div>
          <div className="text-[11px] text-slate-400">
            DIGITAL WORK & INTERFACE SHOWCASE // SAMPLE & CONCEPT DESIGNS
          </div>
        </div>
      </div>
    </footer>
  );
};
