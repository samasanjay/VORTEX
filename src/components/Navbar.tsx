import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenExplore?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenExplore }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Simple scrollspy
      const sections = ['work', 'lab', 'archive', 'system', 'about'];
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 200;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      } else if (window.scrollY < 200) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'WORK', href: '#work', id: 'work' },
    { label: 'LAB', href: '#lab', id: 'lab' },
    { label: 'UI ARCHIVE', href: '#archive', id: 'archive' },
    { label: 'DESIGN SYSTEM', href: '#system', id: 'system' },
    { label: 'ABOUT', href: '#about', id: 'about' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-nav py-3.5 shadow-2xl' : 'bg-transparent py-6'
      }`}
    >
      <div className="container-vortex flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-3 group text-decoration-none"
          data-cursor="HOME"
          aria-label="WORKVORTEX home"
        >
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 p-[1px] shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
            <div className="w-full h-full bg-[#06080D] rounded-[11px] flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-5 h-5 fill-none stroke-blue-400 stroke-[9] stroke-linecap-round stroke-linejoin-round group-hover:stroke-blue-300 transition-colors">
                <path d="M 20 28 L 36 76 L 50 46 L 64 76 L 80 28" />
              </svg>
            </div>
          </div>
          <div>
            <div className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5">
              WORKVORTEX
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            </div>
            <div className="text-[10px] font-mono tracking-widest text-slate-400 hidden sm:block">
              BUILD. AUTOMATE. SCALE.
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-[#0D111A]/80 border border-white/10 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                data-cursor="NAV"
                className={`px-4 py-2 rounded-full font-mono text-xs font-semibold tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'text-white bg-blue-600/30 border border-blue-500/40 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#work"
            onClick={onOpenExplore}
            data-cursor="EXPLORE"
            className="btn-primary text-xs py-2.5 px-5 font-mono tracking-wider group"
          >
            <span>EXPLORE</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-nav border-b border-slate-800 px-6 py-6 mt-3 space-y-3 bg-[#070A12]/95 backdrop-blur-2xl">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-widest px-2 mb-2">Navigation</div>
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-lg text-sm font-mono font-semibold text-slate-200 hover:bg-white/5 hover:text-blue-400 border border-transparent hover:border-slate-800 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-800">
            <a
              href="#work"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenExplore?.();
              }}
              className="btn-primary w-full text-xs py-3 font-mono tracking-wider justify-center"
            >
              EXPLORE THE WORK →
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
