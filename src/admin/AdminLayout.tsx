import React, { useState } from 'react';
import { NavLink, Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import {
  LayoutDashboard,
  Users,
  FolderGit2,
  Layers,
  MessageSquare,
  HelpCircle,
  FileText,
  Search,
  Image,
  ShieldCheck,
  History,
  Settings,
  LogOut,
  ExternalLink,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user, logout, hasRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navSections = [
    {
      title: 'OVERVIEW',
      items: [
        { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard, roles: ['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'SALES', 'VIEWER'] },
      ],
    },
    {
      title: 'CRM & CLIENTS',
      items: [
        { label: 'Leads Pipeline', path: '/admin/leads', icon: Users, roles: ['SUPER_ADMIN', 'ADMIN', 'SALES', 'VIEWER'] },
      ],
    },
    {
      title: 'CMS & PORTFOLIO',
      items: [
        { label: 'Projects CMS', path: '/admin/projects', icon: FolderGit2, roles: ['SUPER_ADMIN', 'ADMIN', 'EDITOR'] },
        { label: 'Services CMS', path: '/admin/services', icon: Layers, roles: ['SUPER_ADMIN', 'ADMIN', 'EDITOR'] },
        { label: 'Testimonials', path: '/admin/testimonials', icon: MessageSquare, roles: ['SUPER_ADMIN', 'ADMIN', 'EDITOR'] },
        { label: 'FAQs CMS', path: '/admin/faq', icon: HelpCircle, roles: ['SUPER_ADMIN', 'ADMIN', 'EDITOR'] },
        { label: 'Content Blocks', path: '/admin/content', icon: FileText, roles: ['SUPER_ADMIN', 'ADMIN', 'EDITOR'] },
      ],
    },
    {
      title: 'MARKETING & ASSETS',
      items: [
        { label: 'SEO Manager', path: '/admin/seo', icon: Search, roles: ['SUPER_ADMIN', 'ADMIN', 'EDITOR'] },
        { label: 'Media Library', path: '/admin/media', icon: Image, roles: ['SUPER_ADMIN', 'ADMIN', 'EDITOR'] },
      ],
    },
    {
      title: 'OPERATIONS',
      items: [
        { label: 'Team Accounts', path: '/admin/team', icon: ShieldCheck, roles: ['SUPER_ADMIN', 'ADMIN'] },
        { label: 'Audit Trail', path: '/admin/audit-logs', icon: History, roles: ['SUPER_ADMIN', 'ADMIN'] },
        { label: 'Studio Settings', path: '/admin/settings', icon: Settings, roles: ['SUPER_ADMIN'] },
      ],
    },
  ];

  // Helper for breadcrumbs
  const getBreadcrumb = () => {
    const p = location.pathname.replace('/admin', '');
    if (!p || p === '/' || p === '/dashboard') return 'Dashboard Overview';
    if (p.startsWith('/leads/')) return 'Lead Details & Dossier';
    if (p === '/leads') return 'Leads & Inquiry CRM';
    if (p.startsWith('/projects/new')) return 'Create New Case Study';
    if (p.includes('/projects/') && p.includes('/edit')) return 'Edit Case Study';
    if (p === '/projects') return 'Case Studies & Portfolio CMS';
    if (p.startsWith('/services/new')) return 'Create New Service';
    if (p.includes('/services/') && p.includes('/edit')) return 'Edit Service';
    if (p === '/services') return 'Services & Capabilities CMS';
    if (p === '/testimonials') return 'Client Testimonials';
    if (p === '/faq') return 'Interactive FAQs CMS';
    if (p === '/content') return 'Website Content Manager';
    if (p === '/seo') return 'Global & Page SEO Manager';
    if (p === '/media') return 'Media Library & Assets';
    if (p === '/team') return 'Team & Access Control';
    if (p === '/audit-logs') return 'System Audit Logs';
    if (p === '/settings') return 'Studio Platform Settings';
    return 'Admin Control Panel';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-body selection:bg-blue-600 selection:text-white">
      {/* Top Bar */}
      <header className="h-16 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/admin/dashboard" className="flex items-center gap-2.5">
            <img
              src="/assets/workvortex-logo.png"
              alt="WORKVORTEX"
              className="w-7 h-7 rounded-lg object-contain"
            />
            <div className="hidden sm:flex flex-col">
              <span className="font-display font-bold text-sm tracking-tight text-white leading-none">
                WORK<span className="text-blue-500">VORTEX</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-slate-400 font-semibold uppercase">
                OPS PLATFORM
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-slate-400 border-l border-slate-800 pl-4">
            <span>Admin</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-slate-200 font-semibold">{getBreadcrumb()}</span>
          </div>
        </div>

        {/* Right action pill */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 hover:text-white transition-colors"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>

          {/* User Profile Pill */}
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60">
            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white uppercase">
              {user?.name ? user.name[0] : 'A'}
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-medium text-slate-200 leading-tight truncate max-w-[120px]">
                {user?.name || 'Administrator'}
              </span>
              <span className="text-[9.5px] font-mono font-semibold text-blue-400 leading-none">
                {user?.roleId || 'ADMIN'}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="p-1 rounded text-slate-400 hover:text-rose-400 transition-colors ml-1"
              title="Log out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0 top-16' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="py-5 px-3 space-y-6 overflow-y-auto flex-1">
            {navSections.map((sec, idx) => {
              const visibleItems = sec.items.filter((item) => hasRole(item.roles));
              if (visibleItems.length === 0) return null;

              return (
                <div key={idx} className="space-y-1">
                  <div className="px-3 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold mb-1.5">
                    {sec.title}
                  </div>
                  {visibleItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                            isActive
                              ? 'bg-blue-600 text-white font-semibold shadow-xs shadow-blue-500/20'
                              : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                          }`
                        }
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{item.label}</span>
                      </NavLink>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* Sidebar Footer */}
          <div className="p-3 border-t border-slate-800 bg-slate-950/40">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 px-2 py-1">
              <span>WORKVORTEX v2.6</span>
              <span className="inline-flex items-center gap-1 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Node + SQLite
              </span>
            </div>
          </div>
        </aside>

        {/* Main Content Pane */}
        <main className="flex-1 overflow-y-auto bg-slate-950 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
