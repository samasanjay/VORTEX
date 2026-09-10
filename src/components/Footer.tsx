import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#F8FAFC] border-t border-slate-200 text-left pt-16 pb-12">
      <div className="container-vortex space-y-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-200">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/assets/workvortex-logo.jpg"
                alt="WORKVORTEX"
                className="w-9 h-9 rounded-lg object-contain shadow-xs"
              />
              <span className="font-display font-bold text-xl text-slate-900 tracking-tight">
                WORK<span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">VORTEX</span>
              </span>
            </Link>
            <p className="text-sm text-slate-600 font-body max-w-sm leading-relaxed">
              High-performance digital products, web applications, user interfaces, and mobile experiences crafted with modern design systems.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-blue-700 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
              <span>Available for 2026 Collaborations</span>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 font-bold">
              Navigation
            </h4>
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
                <Link to="/ui-archive" className="hover:text-blue-600 transition-colors">
                  UI Archive
                </Link>
              </li>
              <li>
                <Link to="/design-system" className="hover:text-blue-600 transition-colors">
                  Design System
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-600 transition-colors">
                  About Studio
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-600 transition-colors font-medium text-blue-600">
                  Start a Project →
                </Link>
              </li>
            </ul>
          </div>

          {/* Projects Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 font-bold">
              Featured Projects
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link to="/work/velora" className="hover:text-blue-600 transition-colors flex items-center justify-between group">
                  <span>Velora E-Commerce</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/work/taskflow" className="hover:text-blue-600 transition-colors flex items-center justify-between group">
                  <span>Taskflow Management</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/work/finmate" className="hover:text-blue-600 transition-colors flex items-center justify-between group">
                  <span>Finmate Dashboard</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/work/homora" className="hover:text-blue-600 transition-colors flex items-center justify-between group">
                  <span>Homora Real Estate</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/work/fittrack" className="hover:text-blue-600 transition-colors flex items-center justify-between group">
                  <span>FitTrack Mobile App</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

            {/* Quick Contact & Studio Location */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 font-bold">
              Studio Inquiry
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Have a product design, web application, or interface concept in mind? Let’s architect something exceptional.
            </p>
            <div className="space-y-2 pt-1">
              <a
                href="mailto:workvortex01@gmail.com"
                className="text-xs font-mono text-blue-600 hover:underline block font-semibold"
              >
                workvortex01@gmail.com
              </a>
              <Link to="/contact" className="btn-primary text-xs py-2 px-4 inline-flex">
                <span>Inquire Now</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © 2026 WORKVORTEX. All rights reserved. Transparent Portfolio & Digital Showcase.
          </div>
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors self-start sm:self-auto shadow-xs flex items-center gap-1.5"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
