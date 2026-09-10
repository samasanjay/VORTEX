import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PROJECTS } from '../data/projects';
import {
  ArrowLeft,
  ArrowRight,
  Monitor,
  Smartphone,
  ZoomIn,
  ZoomOut,
  CheckCircle2,
  Sparkles,
  Layers,
  Copy,
  Check
} from 'lucide-react';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const projectIndex = PROJECTS.findIndex((p) => p.slug === slug || p.id === slug);
  const project = projectIndex !== -1 ? PROJECTS[projectIndex] : null;

  if (!project) {
    return (
      <div className="pt-40 pb-24 text-center container-vortex space-y-4">
        <h2 className="font-display font-bold text-3xl text-slate-900">Project Not Found</h2>
        <p className="text-slate-600">The project you are looking for does not exist in our directory.</p>
        <Link to="/work" className="btn-primary inline-flex">
          Back to Portfolio Directory
        </Link>
      </div>
    );
  }

  const nextProject = PROJECTS[(projectIndex + 1) % PROJECTS.length];
  const prevProject = PROJECTS[(projectIndex - 1 + PROJECTS.length) % PROJECTS.length];

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="pt-28 pb-24 bg-[#F8FAFC]">
      {/* Top Breadcrumb Bar */}
      <div className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-[69px] z-30 py-3 shadow-2xs">
        <div className="container-vortex flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/work" className="hover:text-blue-600 transition-colors">
              Work
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-bold">{project.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(`/work/${prevProject.slug}`)}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 text-xs flex items-center gap-1 transition-colors"
              title={`Previous: ${prevProject.name}`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Prev</span>
            </button>
            <button
              onClick={() => navigate(`/work/${nextProject.slug}`)}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 text-xs flex items-center gap-1 transition-colors"
              title={`Next: ${nextProject.name}`}
            >
              <span className="hidden sm:inline">Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="container-vortex pt-10 space-y-16">
        
        {/* Project Header Dossier */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={
                project.type === 'EXPERIMENTAL CONCEPT' ? 'badge-concept' : 'badge-sample'
              }
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              {project.type}
            </span>
            <span className="text-xs font-mono text-blue-600 font-bold uppercase tracking-wider">
              // {project.category}
            </span>
            <span className="text-xs font-mono text-slate-500">
              // RELEASE {project.year}
            </span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl text-slate-900 tracking-tight">
            {project.name}
          </h1>

          <p className="text-slate-600 font-body text-lg sm:text-xl max-w-4xl leading-relaxed">
            {project.description}
          </p>

          {/* Quick specs pill row */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.technologies.map((t) => (
              <span key={t} className="badge-tech font-mono text-xs">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Interactive Device Viewport */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider font-semibold">
              Live Interface Stage
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDeviceMode('desktop')}
                className={`p-1.5 px-3 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors ${
                  deviceMode === 'desktop'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200 font-semibold'
                    : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop (1920px)</span>
              </button>
              <button
                onClick={() => setDeviceMode('mobile')}
                className={`p-1.5 px-3 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors ${
                  deviceMode === 'mobile'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200 font-semibold'
                    : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile (375px)</span>
              </button>
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="p-1.5 px-3 rounded-lg text-xs font-mono flex items-center gap-1.5 bg-white text-slate-600 border border-slate-200 hover:text-slate-900"
              >
                {isZoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
                <span>{isZoomed ? 'Reset Scale' : 'Zoom Inspect'}</span>
              </button>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-white p-4 sm:p-8 flex items-center justify-center shadow-lg">
            <div
              className={`transition-all duration-500 rounded-2xl overflow-hidden border border-slate-200 shadow-2xl bg-white ${
                deviceMode === 'mobile' ? 'max-w-[400px]' : 'w-full'
              } ${isZoomed ? 'scale-110 sm:scale-125 my-8 sm:my-16' : 'scale-100'}`}
            >
              <div className="px-4 py-2.5 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-[11px] font-mono text-slate-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <span>workvortex.studio/{project.slug}</span>
                <span>100% SCALE</span>
              </div>
              <img
                src={project.featuredImage}
                alt={project.name}
                className="w-full h-auto object-contain object-top"
              />
            </div>
          </div>
        </div>

        {/* 9-Chapter Case Study Breakdown */}
        <div className="space-y-8">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
              Case Study Documentation
            </h2>
            <p className="text-slate-600 text-sm">
              Comprehensive architectural dossier and design rationale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 01 Overview */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
              <span className="font-mono text-xs text-blue-600 font-bold uppercase tracking-wider block">
                01 — OVERVIEW
              </span>
              <h3 className="font-display font-bold text-xl text-slate-900">Project Scope</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{project.overview}</p>
            </div>

            {/* 02 Idea */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
              <span className="font-mono text-xs text-blue-600 font-bold uppercase tracking-wider block">
                02 — THE IDEA
              </span>
              <h3 className="font-display font-bold text-xl text-slate-900">Problem & Solution Thesis</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{project.idea}</p>
            </div>

            {/* 03 Design Direction */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
              <span className="font-mono text-xs text-blue-600 font-bold uppercase tracking-wider block">
                03 — DESIGN DIRECTION
              </span>
              <h3 className="font-display font-bold text-xl text-slate-900">Visual Language</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{project.designDirection}</p>
            </div>

            {/* 04 UX */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
              <span className="font-mono text-xs text-blue-600 font-bold uppercase tracking-wider block">
                04 — USER EXPERIENCE
              </span>
              <h3 className="font-display font-bold text-xl text-slate-900">Interaction Ergonomics</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{project.userExperience}</p>
            </div>

            {/* 05 Interface */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
              <span className="font-mono text-xs text-blue-600 font-bold uppercase tracking-wider block">
                05 — INTERFACE
              </span>
              <h3 className="font-display font-bold text-xl text-slate-900">Components & Data Density</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{project.interfaceNotes}</p>
            </div>

            {/* 06 Responsive */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
              <span className="font-mono text-xs text-blue-600 font-bold uppercase tracking-wider block">
                06 — RESPONSIVE DESIGN
              </span>
              <h3 className="font-display font-bold text-xl text-slate-900">Multi-Screen Adaptation</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{project.responsiveDesign}</p>
            </div>

            {/* 07 Technology */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
              <span className="font-mono text-xs text-blue-600 font-bold uppercase tracking-wider block">
                07 — TECHNOLOGY
              </span>
              <h3 className="font-display font-bold text-xl text-slate-900">Architecture & Performance</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{project.techArchitecture}</p>
            </div>

            {/* 08 Key Features */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
              <span className="font-mono text-xs text-blue-600 font-bold uppercase tracking-wider block">
                08 — KEY FEATURES
              </span>
              <h3 className="font-display font-bold text-xl text-slate-900">Engineered Capabilities</h3>
              <ul className="space-y-2 pt-1">
                {project.keyFeatures.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 09 Final Experience */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 space-y-3 shadow-sm">
            <span className="font-mono text-xs text-blue-700 font-bold uppercase tracking-wider block">
              09 — FINAL EXPERIENCE
            </span>
            <h3 className="font-display font-bold text-2xl text-slate-900">Outcome & Impression</h3>
            <p className="text-slate-700 font-body text-base leading-relaxed">
              {project.finalExperience}
            </p>
          </div>
        </div>

        {/* Design System Tokens for this project */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">
          {/* Color Palette */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-sm">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <h3 className="font-display font-bold text-lg text-slate-900">Project Color Palette</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {project.colorPalette.map((c) => (
                <div key={c.hex} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                  <div
                    className="w-full h-14 rounded-lg border border-slate-300 shadow-inner flex items-end justify-end p-1.5"
                    style={{ backgroundColor: c.hex }}
                  >
                    <button
                      onClick={() => copyColor(c.hex)}
                      className="p-1 rounded bg-white/90 text-slate-800 shadow-xs"
                      title="Copy HEX"
                    >
                      {copiedHex === c.hex ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                  <div>
                    <span className="font-mono font-bold text-xs text-slate-900 block">{c.hex}</span>
                    <span className="text-[11px] text-slate-500 block">{c.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-sm">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              <h3 className="font-display font-bold text-lg text-slate-900">Typography Scale</h3>
            </div>
            <div className="space-y-3">
              {project.typography.map((type, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between"
                >
                  <div>
                    <span className="text-[11px] font-mono text-blue-600 font-bold block">{type.role}</span>
                    <span className="text-sm font-semibold text-slate-900">{type.family}</span>
                  </div>
                  <span className="text-xs font-mono bg-white px-2 py-1 rounded border border-slate-200 text-slate-600">
                    {type.weight}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="pt-12 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <Link
            to={`/work/${prevProject.slug}`}
            className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 transition-colors shadow-xs group"
          >
            <ArrowLeft className="w-5 h-5 text-blue-600 group-hover:-translate-x-1 transition-transform" />
            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase block">Previous Project</span>
              <span className="font-display font-bold text-slate-900">{prevProject.name}</span>
            </div>
          </Link>

          <Link
            to={`/work/${nextProject.slug}`}
            className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 transition-colors shadow-xs group text-right"
          >
            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase block">Next Project</span>
              <span className="font-display font-bold text-slate-900">{nextProject.name}</span>
            </div>
            <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
};
