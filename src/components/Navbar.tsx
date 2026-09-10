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
        scrolled ? 'glass-nav py-3.5 shadow-sm' : 'bg-transparent py-5'
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
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 p-[1.5px] shadow-md shadow-blue-500/15 group-hover:shadow-blue-500/30 transition-shadow">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-5 h-5 fill-none stroke-blue-600 stroke-[9] stroke-linecap-round stroke-linejoin-round group-hover:stroke-blue-500 transition-colors">
                <path d="M 20 28 L 36 76 L 50 46 L 64 76 L 80 28" />
              </svg>
            </div>
          </div>
          <div>
            <div className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 flex items-center gap-1.5">
              WORKVORTEX
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            </div>
            <div className="text-[10px] font-mono tracking-widest text-slate-500 hidden sm:block font-semibold">
              BUILD. AUTOMATE. SCALE.
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-white/90 border border-slate-200/80 shadow-sm backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                data-cursor="NAV"
                className={`px-4 py-1.5 rounded-full font-mono text-xs font-semibold tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'text-blue-700 bg-blue-50 border border-blue-200 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
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
          className="md:hidden p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-nav border-b border-slate-200 px-6 py-6 mt-3 space-y-3 bg-white/98 shadow-xl">
          <div className="text-xs font-mono text-slate-500 uppercase tracking-widest px-2 mb-2 font-semibold">
            Navigation
          </div>
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-lg text-sm font-mono font-semibold text-slate-800 hover:bg-slate-100 hover:text-blue-600 border border-transparent hover:border-slate-200 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-200">
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
