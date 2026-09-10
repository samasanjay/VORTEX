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
        <div className="sticky top-0 z-30 px-6 py-4 bg-white/95 backdrop-blur-xl border-b border-slate-200 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <span
              className={
                project.type === 'EXPERIMENTAL CONCEPT' ? 'badge-concept' : 'badge-sample'
              }
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              {project.type}
            </span>
            <span className="text-xs font-mono text-slate-500 hidden sm:inline-block font-medium">
              // {project.category}
            </span>
          </div>

          {/* Tab Switcher & Close */}
          <div className="flex items-center gap-3">
            <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200">
              <button
                onClick={() => setActiveTab('case-study')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors ${
                  activeTab === 'case-study'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Case Study
              </button>
              <button
                onClick={() => setActiveTab('interactive-screens')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors ${
                  activeTab === 'interactive-screens'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Interactive Viewer
              </button>
              <button
                onClick={() => setActiveTab('tech-spec')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors ${
                  activeTab === 'tech-spec'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tech & Specs
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-10 space-y-12 bg-white">

          {/* Title & Headline Banner */}
          <div className="space-y-4 border-b border-slate-200 pb-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight">
                {project.name}
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-3 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700 font-semibold">
                  RELEASE {project.year}
                </span>
                <span className="text-xs font-mono px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-700 font-semibold">
                  {project.status}
                </span>
              </div>
            </div>
            <p className="text-slate-600 font-body text-base sm:text-lg max-w-3xl leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* TAB 1: Case Study 9-Section Breakdown */}
          {activeTab === 'case-study' && (
            <div className="space-y-12">
              
              {/* Main Visual Showcase with Device switcher */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-wider font-semibold">
                    Interface Presentation
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDeviceMode('desktop')}
                      className={`p-1.5 rounded-md text-xs font-mono flex items-center gap-1.5 transition-colors ${
                        deviceMode === 'desktop'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200 font-semibold'
                          : 'bg-slate-100 text-slate-600 border border-slate-200 hover:text-slate-900'
                      }`}
                    >
                      <Monitor className="w-3.5 h-3.5" />
                      <span>Desktop</span>
                    </button>
                    <button
                      onClick={() => setDeviceMode('mobile')}
                      className={`p-1.5 rounded-md text-xs font-mono flex items-center gap-1.5 transition-colors ${
                        deviceMode === 'mobile'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200 font-semibold'
                          : 'bg-slate-100 text-slate-600 border border-slate-200 hover:text-slate-900'
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Mobile</span>
                    </button>
                    <button
                      onClick={() => setIsZoomed(!isZoomed)}
                      className="p-1.5 rounded-md text-xs font-mono flex items-center gap-1.5 bg-slate-100 text-slate-600 border border-slate-200 hover:text-slate-900"
                    >
                      {isZoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
                      <span>{isZoomed ? 'Reset' : 'Zoom'}</span>
                    </button>
                  </div>
                </div>

                {/* Device Frame Viewport */}
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 p-2 sm:p-4 flex items-center justify-center">
                  <div
                    className={`transition-all duration-500 rounded-xl overflow-hidden border border-slate-200 shadow-xl bg-white ${
                      deviceMode === 'mobile' ? 'max-w-[380px]' : 'w-full'
                    } ${isZoomed ? 'scale-110 sm:scale-125 my-8 sm:my-16' : 'scale-100'}`}
                  >
                    <div className="px-4 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-[11px] font-mono text-slate-500 font-medium">
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

              {/* 9-Section Case Study Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">

                {/* 01 — OVERVIEW */}
                <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-3 shadow-sm">
                  <div className="font-mono text-xs text-blue-600 tracking-wider font-bold">
                    01 — OVERVIEW
                  </div>
                  <h4 className="font-display font-bold text-lg text-slate-900">Project Scope</h4>
                  <p className="text-slate-600 font-body text-sm leading-relaxed">
                    {project.overview}
                  </p>
                </div>

                {/* 02 — THE IDEA */}
                <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-3 shadow-sm">
                  <div className="font-mono text-xs text-blue-600 tracking-wider font-bold">
                    02 — THE IDEA
                  </div>
                  <h4 className="font-display font-bold text-lg text-slate-900">Problem & Concept</h4>
                  <p className="text-slate-600 font-body text-sm leading-relaxed">
                    {project.idea}
                  </p>
                </div>

                {/* 03 — DESIGN DIRECTION */}
                <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-3 shadow-sm">
                  <div className="font-mono text-xs text-blue-600 tracking-wider font-bold">
                    03 — DESIGN DIRECTION
                  </div>
                  <h4 className="font-display font-bold text-lg text-slate-900">Visual Language</h4>
                  <p className="text-slate-600 font-body text-sm leading-relaxed">
                    {project.designDirection}
                  </p>
                </div>

                {/* 04 — USER EXPERIENCE */}
                <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-3 shadow-sm">
                  <div className="font-mono text-xs text-blue-600 tracking-wider font-bold">
                    04 — USER EXPERIENCE
                  </div>
                  <h4 className="font-display font-bold text-lg text-slate-900">Interaction Flows</h4>
                  <p className="text-slate-600 font-body text-sm leading-relaxed">
                    {project.userExperience}
                  </p>
                </div>

                {/* 05 — INTERFACE */}
                <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-3 shadow-sm">
                  <div className="font-mono text-xs text-blue-600 tracking-wider font-bold">
                    05 — INTERFACE
                  </div>
                  <h4 className="font-display font-bold text-lg text-slate-900">Components & Hierarchy</h4>
                  <p className="text-slate-600 font-body text-sm leading-relaxed">
                    {project.interfaceNotes}
                  </p>
                </div>

                {/* 06 — RESPONSIVE DESIGN */}
                <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-3 shadow-sm">
                  <div className="font-mono text-xs text-blue-600 tracking-wider font-bold">
                    06 — RESPONSIVE DESIGN
                  </div>
                  <h4 className="font-display font-bold text-lg text-slate-900">Multi-Device Adaptation</h4>
                  <p className="text-slate-600 font-body text-sm leading-relaxed">
                    {project.responsiveDesign}
                  </p>
                </div>

                {/* 07 — TECHNOLOGY */}
                <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-3 shadow-sm">
                  <div className="font-mono text-xs text-blue-600 tracking-wider font-bold">
                    07 — TECHNOLOGY
                  </div>
                  <h4 className="font-display font-bold text-lg text-slate-900">Stack & Architecture</h4>
                  <p className="text-slate-600 font-body text-sm leading-relaxed">
                    {project.techArchitecture}
                  </p>
                </div>

                {/* 08 — KEY FEATURES */}
                <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-3 shadow-sm">
                  <div className="font-mono text-xs text-blue-600 tracking-wider font-bold">
                    08 — KEY FEATURES
                  </div>
                  <h4 className="font-display font-bold text-lg text-slate-900">Core Capabilities</h4>
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

              {/* 09 — FINAL EXPERIENCE */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50/60 border border-blue-200 space-y-3 shadow-sm">
                <div className="font-mono text-xs text-blue-700 tracking-wider font-bold">
                  09 — FINAL EXPERIENCE
                </div>
                <h4 className="font-display font-bold text-2xl text-slate-900">Outcome & Impression</h4>
                <p className="text-slate-700 font-body text-base leading-relaxed">
                  {project.finalExperience}
                </p>
              </div>

            </div>
          )}

          {/* TAB 2: Interactive Screens */}
          {activeTab === 'interactive-screens' && (
            <div className="space-y-8">
              <div className="space-y-2">
                <h3 className="font-display font-bold text-xl text-slate-900">Screen Architecture</h3>
                <p className="text-slate-600 text-sm">
                  Examine detailed screens, viewport metrics, and component highlights.
                </p>
              </div>

              {project.screens.map((screen) => (
                <div
                  key={screen.id}
                  className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 space-y-6 shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-mono text-blue-600 uppercase tracking-wider block font-bold">
                        {screen.category}
                      </span>
                      <h4 className="font-display font-bold text-xl text-slate-900">{screen.title}</h4>
                    </div>
                    {screen.metrics && (
                      <div className="flex items-center gap-3">
                        {screen.metrics.map((m, idx) => (
                          <div
                            key={idx}
                            className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-center shadow-sm"
                          >
                            <span className="block text-[10px] font-mono text-slate-500 uppercase font-semibold">
                              {m.label}
                            </span>
                            <span className="font-mono font-bold text-sm text-blue-600">
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="rounded-xl overflow-hidden border border-slate-200 bg-white shadow-md">
                    <img
                      src={screen.image}
                      alt={screen.title}
                      className="w-full h-auto object-cover"
                    />
                  </div>

                  <p className="text-slate-700 text-sm leading-relaxed">{screen.description}</p>

                  {screen.highlights && (
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200">
                      {screen.highlights.map((hl, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-mono text-slate-700 shadow-sm"
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
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <h4 className="font-display font-bold text-lg text-slate-900">Project Color Palette</h4>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {project.colorPalette.map((color) => (
                    <div
                      key={color.hex}
                      className="p-4 rounded-xl border border-slate-200 bg-[#F8FAFC] space-y-3 shadow-sm"
                    >
                      <div
                        className="w-full h-12 rounded-lg border border-slate-300 shadow-inner"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div>
                        <span className="block font-mono font-bold text-sm text-slate-900">{color.hex}</span>
                        <span className="block text-xs font-body text-slate-500">{color.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typography */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-600" />
                  <h4 className="font-display font-bold text-lg text-slate-900">Typography Hierarchy</h4>
                </div>
                <div className="space-y-3">
                  {project.typography.map((type, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-slate-200 bg-[#F8FAFC] flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-sm"
                    >
                      <div>
                        <span className="text-xs font-mono text-blue-600 block font-semibold">{type.role}</span>
                        <span className="text-base font-semibold text-slate-900">{type.family}</span>
                      </div>
                      <span className="font-mono text-xs text-slate-600 bg-white px-2.5 py-1 rounded border border-slate-200 self-start sm:self-auto shadow-sm">
                        Weight: {type.weight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies List */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-sky-600" />
                  <h4 className="font-display font-bold text-lg text-slate-900">Engineered Technologies</h4>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 font-mono text-xs font-semibold flex items-center gap-2 shadow-sm"
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
            <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs font-mono text-slate-500 font-semibold">
                CONTINUE EXPLORING
              </div>
              <button
                onClick={() => onSelectAnotherProject?.(nextProject)}
                className="inline-flex items-center gap-2 text-sm font-mono font-semibold text-blue-600 hover:text-blue-800 transition-colors group"
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
