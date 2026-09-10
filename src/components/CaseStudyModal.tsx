import React, { useState } from 'react';
import type { Project } from '../types/project';
import {
  X,
  Monitor,
  Smartphone,
  ZoomIn,
  ZoomOut,
  Layers,
  Sparkles,
  CheckCircle2,
  Code2,
  Cpu,
  ArrowRight
} from 'lucide-react';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectAnotherProject?: (project: Project) => void;
  allProjects?: Project[];
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onSelectAnotherProject,
  allProjects,
}) => {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'case-study' | 'interactive-screens' | 'tech-spec'>('case-study');

  if (!project) return null;

  const nextProject = allProjects
    ? allProjects[(allProjects.findIndex((p) => p.id === project.id) + 1) % allProjects.length]
    : null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-content text-left relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Sticky Header */}
        <div className="sticky top-0 z-30 px-6 py-4 bg-[#090D15]/95 backdrop-blur-xl border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className={
                project.type === 'EXPERIMENTAL CONCEPT' ? 'badge-concept' : 'badge-sample'
              }
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              {project.type}
            </span>
            <span className="text-xs font-mono text-slate-400 hidden sm:inline-block">
              // {project.category}
            </span>
          </div>

          {/* Tab Switcher & Close */}
          <div className="flex items-center gap-3">
            <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800">
              <button
                onClick={() => setActiveTab('case-study')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors ${
                  activeTab === 'case-study'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Case Study
              </button>
              <button
                onClick={() => setActiveTab('interactive-screens')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors ${
                  activeTab === 'interactive-screens'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Interactive Viewer
              </button>
              <button
                onClick={() => setActiveTab('tech-spec')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors ${
                  activeTab === 'tech-spec'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Tech & Specs
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-10 space-y-12">

          {/* Title & Headline Banner */}
          <div className="space-y-4 border-b border-slate-800 pb-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
                {project.name}
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-400">
                  RELEASE {project.year}
                </span>
                <span className="text-xs font-mono px-3 py-1 rounded-md bg-blue-950/60 border border-blue-800/40 text-blue-400">
                  {project.status}
                </span>
              </div>
            </div>
            <p className="text-slate-300 font-body text-base sm:text-lg max-w-3xl leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* TAB 1: Case Study 9-Section Breakdown */}
          {activeTab === 'case-study' && (
            <div className="space-y-12">
              
              {/* Main Visual Showcase with Device switcher */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    Interface Presentation
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDeviceMode('desktop')}
                      className={`p-1.5 rounded-md text-xs font-mono flex items-center gap-1.5 transition-colors ${
                        deviceMode === 'desktop'
                          ? 'bg-blue-600/30 text-blue-400 border border-blue-500/40'
                          : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                      }`}
                    >
                      <Monitor className="w-3.5 h-3.5" />
                      <span>Desktop</span>
                    </button>
                    <button
                      onClick={() => setDeviceMode('mobile')}
                      className={`p-1.5 rounded-md text-xs font-mono flex items-center gap-1.5 transition-colors ${
                        deviceMode === 'mobile'
                          ? 'bg-blue-600/30 text-blue-400 border border-blue-500/40'
                          : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Mobile</span>
                    </button>
                    <button
                      onClick={() => setIsZoomed(!isZoomed)}
                      className="p-1.5 rounded-md text-xs font-mono flex items-center gap-1.5 bg-slate-900 text-slate-400 border border-slate-800 hover:text-white"
                    >
                      {isZoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
                      <span>{isZoomed ? 'Reset' : 'Zoom'}</span>
                    </button>
                  </div>
                </div>

                {/* Device Frame Viewport */}
                <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 p-2 sm:p-4 flex items-center justify-center">
                  <div
                    className={`transition-all duration-500 rounded-xl overflow-hidden border border-slate-800 shadow-2xl bg-[#090D15] ${
                      deviceMode === 'mobile' ? 'max-w-[380px]' : 'w-full'
                    } ${isZoomed ? 'scale-110 sm:scale-125 my-8 sm:my-16' : 'scale-100'}`}
                  >
                    <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
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

              {/* 9-Section Case Study Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">

                {/* 01 — OVERVIEW */}
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
                  <div className="font-mono text-xs text-blue-400 tracking-wider">
                    01 — OVERVIEW
                  </div>
                  <h4 className="font-display font-bold text-lg text-white">Project Scope</h4>
                  <p className="text-slate-300 font-body text-sm leading-relaxed">
                    {project.overview}
                  </p>
                </div>

                {/* 02 — THE IDEA */}
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
                  <div className="font-mono text-xs text-blue-400 tracking-wider">
                    02 — THE IDEA
                  </div>
                  <h4 className="font-display font-bold text-lg text-white">Problem & Concept</h4>
                  <p className="text-slate-300 font-body text-sm leading-relaxed">
                    {project.idea}
                  </p>
                </div>

                {/* 03 — DESIGN DIRECTION */}
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
                  <div className="font-mono text-xs text-blue-400 tracking-wider">
                    03 — DESIGN DIRECTION
                  </div>
                  <h4 className="font-display font-bold text-lg text-white">Visual Language</h4>
                  <p className="text-slate-300 font-body text-sm leading-relaxed">
                    {project.designDirection}
                  </p>
                </div>

                {/* 04 — USER EXPERIENCE */}
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
                  <div className="font-mono text-xs text-blue-400 tracking-wider">
                    04 — USER EXPERIENCE
                  </div>
                  <h4 className="font-display font-bold text-lg text-white">Interaction Flows</h4>
                  <p className="text-slate-300 font-body text-sm leading-relaxed">
                    {project.userExperience}
                  </p>
                </div>

                {/* 05 — INTERFACE */}
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
                  <div className="font-mono text-xs text-blue-400 tracking-wider">
                    05 — INTERFACE
                  </div>
                  <h4 className="font-display font-bold text-lg text-white">Components & Hierarchy</h4>
                  <p className="text-slate-300 font-body text-sm leading-relaxed">
                    {project.interfaceNotes}
                  </p>
                </div>

                {/* 06 — RESPONSIVE DESIGN */}
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
                  <div className="font-mono text-xs text-blue-400 tracking-wider">
                    06 — RESPONSIVE DESIGN
                  </div>
                  <h4 className="font-display font-bold text-lg text-white">Multi-Device Adaptation</h4>
                  <p className="text-slate-300 font-body text-sm leading-relaxed">
                    {project.responsiveDesign}
                  </p>
                </div>

                {/* 07 — TECHNOLOGY */}
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
                  <div className="font-mono text-xs text-blue-400 tracking-wider">
                    07 — TECHNOLOGY
                  </div>
                  <h4 className="font-display font-bold text-lg text-white">Stack & Architecture</h4>
                  <p className="text-slate-300 font-body text-sm leading-relaxed">
                    {project.techArchitecture}
                  </p>
                </div>

                {/* 08 — KEY FEATURES */}
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
                  <div className="font-mono text-xs text-blue-400 tracking-wider">
                    08 — KEY FEATURES
                  </div>
                  <h4 className="font-display font-bold text-lg text-white">Core Capabilities</h4>
                  <ul className="space-y-2 pt-1">
                    {project.keyFeatures.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* 09 — FINAL EXPERIENCE */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-blue-950/40 border border-blue-800/30 space-y-3">
                <div className="font-mono text-xs text-blue-400 tracking-wider">
                  09 — FINAL EXPERIENCE
                </div>
                <h4 className="font-display font-bold text-2xl text-white">Outcome & Impression</h4>
                <p className="text-slate-200 font-body text-base leading-relaxed">
                  {project.finalExperience}
                </p>
              </div>

            </div>
          )}

          {/* TAB 2: Interactive Screens */}
          {activeTab === 'interactive-screens' && (
            <div className="space-y-8">
              <div className="space-y-2">
                <h3 className="font-display font-bold text-xl text-white">Screen Architecture</h3>
                <p className="text-slate-400 text-sm">
                  Examine detailed screens, viewport metrics, and component highlights.
                </p>
              </div>

              {project.screens.map((screen) => (
                <div
                  key={screen.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-mono text-blue-400 uppercase tracking-wider block">
                        {screen.category}
                      </span>
                      <h4 className="font-display font-bold text-xl text-white">{screen.title}</h4>
                    </div>
                    {screen.metrics && (
                      <div className="flex items-center gap-3">
                        {screen.metrics.map((m, idx) => (
                          <div
                            key={idx}
                            className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-center"
                          >
                            <span className="block text-[10px] font-mono text-slate-400 uppercase">
                              {m.label}
                            </span>
                            <span className="font-mono font-bold text-sm text-blue-400">
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                    <img
                      src={screen.image}
                      alt={screen.title}
                      className="w-full h-auto object-cover"
                    />
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed">{screen.description}</p>

                  {screen.highlights && (
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/60">
                      {screen.highlights.map((hl, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300"
                        >
                          ✓ {hl}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: Tech & Design Specs */}
          {activeTab === 'tech-spec' && (
            <div className="space-y-10">
              
              {/* Color Palette */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <h4 className="font-display font-bold text-lg text-white">Project Color Palette</h4>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {project.colorPalette.map((color) => (
                    <div
                      key={color.hex}
                      className="p-4 rounded-xl border border-slate-800 bg-slate-900/80 space-y-3"
                    >
                      <div
                        className="w-full h-12 rounded-lg border border-white/10 shadow-inner"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div>
                        <span className="block font-mono font-bold text-sm text-white">{color.hex}</span>
                        <span className="block text-xs font-body text-slate-400">{color.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typography */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-400" />
                  <h4 className="font-display font-bold text-lg text-white">Typography Hierarchy</h4>
                </div>
                <div className="space-y-3">
                  {project.typography.map((type, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div>
                        <span className="text-xs font-mono text-blue-400 block">{type.role}</span>
                        <span className="text-base font-semibold text-white">{type.family}</span>
                      </div>
                      <span className="font-mono text-xs text-slate-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800 self-start sm:self-auto">
                        Weight: {type.weight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies List */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <h4 className="font-display font-bold text-lg text-white">Engineered Technologies</h4>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-4 py-2 rounded-xl bg-blue-950/40 border border-blue-800/40 text-blue-300 font-mono text-xs font-semibold flex items-center gap-2"
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Modal Footer Next Project Navigation */}
          {nextProject && (
            <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs font-mono text-slate-400">
                CONTINUE EXPLORING
              </div>
              <button
                onClick={() => onSelectAnotherProject?.(nextProject)}
                className="inline-flex items-center gap-2 text-sm font-mono font-semibold text-blue-400 hover:text-blue-300 transition-colors group"
              >
                <span>NEXT PROJECT: {nextProject.name}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
