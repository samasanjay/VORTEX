import React from 'react';
import { Link } from 'react-router-dom';
import { TECH_STACK } from '../data/projects';
import {
  Sparkles,
  Terminal,
  Compass,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Globe,
  Code,
  Box,
  Palette,
  Smartphone,
  Database,
  Server,
  Radio,
  GitBranch,
  Cpu
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const pillars = [
    {
      title: 'Aesthetic Restraint',
      description: 'Intentional minimalism, deliberate typography, and high-contrast editorial hierarchy over superficial decoration.',
      icon: <Sparkles className="w-5 h-5 text-blue-600" />,
    },
    {
      title: 'Technical Integrity',
      description: 'Zero fluff or exaggerated business metrics. Honest architecture with modern TypeScript, Next.js, and WebGL.',
      icon: <Terminal className="w-5 h-5 text-indigo-600" />,
    },
    {
      title: 'Spatial & Digital Fluency',
      description: 'Pushing interfaces beyond basic templates into volumetric depth, fluid responsive micro-interactions, and GPU acceleration.',
      icon: <Compass className="w-5 h-5 text-sky-600" />,
    },
    {
      title: 'Performance Obsessed',
      description: 'Fluid 60–120 FPS animations, sub-second LCP load times, and accessible keyboard-first navigation.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
    },
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Globe': return <Globe className="w-5 h-5 text-blue-600" />;
      case 'Code': return <Code className="w-5 h-5 text-cyan-600" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-indigo-600" />;
      case 'Box': return <Box className="w-5 h-5 text-purple-600" />;
      case 'Palette': return <Palette className="w-5 h-5 text-sky-600" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-emerald-600" />;
      case 'Database': return <Database className="w-5 h-5 text-amber-600" />;
      case 'Server': return <Server className="w-5 h-5 text-rose-600" />;
      case 'Radio': return <Radio className="w-5 h-5 text-violet-600" />;
      case 'GitBranch': return <GitBranch className="w-5 h-5 text-teal-600" />;
      default: return <Cpu className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="pt-32 pb-24 bg-[#F8FAFC]">
      <div className="container-vortex space-y-20">
        {/* Hero */}
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            <span>STUDIO PHILOSOPHY & CAPABILITIES</span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-slate-900 tracking-tight leading-tight">
            WE BUILD DIGITAL EXPERIENCES.
          </h1>

          <div className="space-y-4 text-slate-600 font-body text-lg sm:text-xl leading-relaxed">
            <p>
              <strong className="text-slate-900 font-bold">WORKVORTEX</strong> explores the intersection of design, technology, and digital product development.
            </p>
            <p className="text-slate-600 text-base">
              We design and develop modern interfaces, web experiences, applications, and experimental digital products with an unyielding commitment to craftsmanship, performance, and honest presentation.
            </p>
          </div>
        </div>

        {/* 4 Pillars */}
        <div className="space-y-8">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
              Core Engineering Pillars
            </h2>
            <p className="text-slate-600 text-sm">
              The foundational principles guiding every product we architect.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="p-6 rounded-2xl border border-slate-200 bg-white space-y-4 hover:border-slate-300 hover:shadow-md transition-all"
              >
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 shadow-xs inline-block">
                  {p.icon}
                </div>
                <h3 className="font-display font-bold text-lg text-slate-900">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-body leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Foundation */}
        <div className="space-y-8">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
              Built With Modern Technology
            </h2>
            <p className="text-slate-600 text-sm">
              Production stacks, type-safe data modeling, and GPU accelerated graphics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {TECH_STACK.map((tech) => (
              <div
                key={tech.name}
                className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 transition-all duration-300 space-y-4 flex flex-col justify-between shadow-xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 shadow-xs">
                      {getIcon(tech.iconName)}
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
                      {tech.category}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-slate-900">
                    {tech.name}
                  </h3>

                  <p className="text-xs text-slate-600 font-body leading-relaxed">
                    {tech.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <span className="text-[10px] font-mono text-slate-500 font-semibold block mb-1.5">
                    Featured In:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {tech.featuredIn.map((p) => (
                      <span
                        key={p}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-blue-700 font-semibold"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transparent Portfolio Disclosure */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
            <h3 className="font-display font-bold text-xl text-slate-900">
              Transparent Showcase Policy
            </h3>
          </div>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            All sample projects presented in this showcase (such as Velora, Taskflow, Finmate, Homora, FitTrack, and SpiceHub) are high-fidelity conceptual and demonstration builds engineered by WORKVORTEX. We believe in presenting our technical capabilities and design craftsmanship with complete transparency, without fictional client claims or vanity statistics.
          </p>
        </div>

        {/* CTA */}
        <div className="p-10 sm:p-12 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-lg">
          <div className="space-y-2 max-w-xl">
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
              Ready to architect your next digital product?
            </h3>
            <p className="text-blue-100 text-sm sm:text-base">
              Get in touch with our team to discuss project requirements, timelines, and interface specs.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-6 py-3.5 rounded-full bg-white text-blue-600 font-bold text-sm shadow-md hover:bg-blue-50 transition-colors inline-flex items-center gap-2 shrink-0 self-start md:self-auto"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};
