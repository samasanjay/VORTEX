import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#F8FAFC] border-t border-slate-200 text-left pt-16 pb-12 font-body">
      <div className="container-vortex space-y-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-200">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" className="flex items-center gap-3" aria-label="WORKVORTEX home">
              <img
                src="/assets/workvortex-logo.png"
                alt="WORKVORTEX Digital Studio Logo"
                width="36"
                height="36"
                decoding="async"
                className="w-9 h-9 rounded-lg object-contain shadow-xs"
              />
              <span className="font-display font-bold text-xl text-slate-900 tracking-tight">
                WORK<span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">VORTEX</span>
              </span>
            </Link>
            <p className="text-sm text-slate-600 font-body max-w-sm leading-relaxed">
              High-performance digital products, web applications, user interfaces, SaaS platforms, and business automation solutions engineered with React 19 and TypeScript.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-blue-700 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
              <span>Available for 2026 Collaborations</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-900 font-bold">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link to="/" className="hover:text-blue-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/work" className="hover:text-blue-600 transition-colors">
                  Selected Work
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-blue-600 transition-colors">
                  Services Catalog
                </Link>
              </li>
              <li>
                <Link to="/process" className="hover:text-blue-600 transition-colors">
                  Engineering Process
                </Link>
              </li>
              <li>
                <Link to="/technology" className="hover:text-blue-600 transition-colors">
                  Technology Stack
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-600 transition-colors">
                  About Studio
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect & Legal */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-900 font-bold">
              Direct Contact
            </h3>
            <div className="space-y-2 text-sm text-slate-600">
              <p>
                Inquiries:{' '}
                <a
                  href="mailto:workvortex01@gmail.com"
                  className="font-medium text-blue-600 hover:underline block"
                >
                  workvortex01@gmail.com
                </a>
              </p>
              <p>
                Phone:{' '}
                <a
                  href="tel:7988021741"
                  className="font-medium text-slate-800 hover:text-blue-600 hover:underline"
                >
                  +91 7988021741
                </a>
              </p>
              <p className="text-xs text-slate-500 font-mono">
                Response within 24 hours with custom scope proposal.
              </p>
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="btn-primary text-xs py-2 px-4 inline-flex items-center gap-1.5 shadow-sm"
                >
                  <span>Start a Project →</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} WORKVORTEX Digital Studio. Engineered with React 19, TypeScript & Three.js.
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 gap-y-2">
            <Link to="/faq" className="hover:text-slate-900 transition-colors">
              FAQ
            </Link>
            <Link to="/privacy-policy" className="hover:text-slate-900 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-slate-900 transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/refund-policy" className="hover:text-slate-900 transition-colors">
              Cancellation & Refund Policy
            </Link>
            <Link
              to="/admin/login"
              className="hover:text-blue-600 transition-colors flex items-center gap-1"
            >
              <Shield className="w-3 h-3 text-slate-400" />
              <span>Admin Portal</span>
            </Link>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-lg bg-slate-200/70 hover:bg-slate-300 text-slate-700 transition-colors ml-1 cursor-pointer"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
