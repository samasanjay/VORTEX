import React from 'react';
import { SEO } from '../components/SEO';
import {
  Compass,
  Sparkles,
  Code2,
  Rocket,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Terminal,
} from 'lucide-react';

export const ProcessPage: React.FC = () => {
  const phases = [
    {
      step: '01',
      title: 'Discovery, Positioning & Architecture',
      duration: 'Days 1–3',
      icon: Compass,
      desc: 'We dissect your product vision, commercial goals, competitor landscape, and target user mental models. We define database schemas, component boundaries, and security boundaries.',
      deliverables: [
        'Information Architecture & User Flow Blueprints',
        'Database Entity Relational Model (ERD)',
        'Technical Stack & Edge Cloud Deployment Strategy',
        'Binding Fixed-Price Milestone Schedule',
      ],
    },
    {
      step: '02',
      title: 'High-Fidelity UI/UX & Design Systems',
      duration: 'Days 4–8',
      icon: Sparkles,
      desc: 'Translating product concepts into breathtaking editorial typography, tokenized color systems, dark/light variations, and high-density responsive views down to 360px.',
      deliverables: [
        'Complete Figma Design System with auto-layout components',
        'Interactive Clickable Prototypes for stakeholder review',
        'Design Token JSON export (variables, radii, shadows)',
        'Micro-interaction and motion choreography specs',
      ],
    },
    {
      step: '03',
      title: 'Full-Stack TypeScript Engineering',
      duration: 'Weeks 2–4',
      icon: Code2,
      desc: 'Engineering type-safe React 19, Next.js, and Node systems. We implement state synchronization, optimistic UI mutations, REST/GraphQL endpoints, and secure role-based authorization.',
      deliverables: [
        '100% Strict TypeScript Codebase with Zero Linter Warnings',
        'Normalized Database Persistence (PostgreSQL / SQLite)',
        'Role-Based Access Control (RBAC) & JWT/Session Security',
        'Automated CI/CD Build Pipelines & Unit Verifications',
      ],
    },
    {
      step: '04',
      title: 'Edge Deployment, Hardening & Launch',
      duration: 'Final Sprint',
      icon: Rocket,
      desc: 'Multi-device responsive validation, Core Web Vitals speed optimization, Google Rich Snippets structured schema injection, and DNS edge propagation on Cloudflare or Vercel.',
      deliverables: [
        'Sub-second Core Web Vitals (98+ Lighthouse Score)',
        'Structured Google Rich Snippet JSON-LD Compliance',
        'Production Domain SSL & Edge Routing Configuration',
        '100% Source Code Ownership & Engineering Handoff Session',
      ],
    },
  ];

  return (
    <div className="space-y-0 font-body">
      <SEO
        title="Engineering Process & Methodology — WORKVORTEX"
        description="Learn how WORKVORTEX delivers production-grade web applications, digital products, and design systems through our 4-phase agile engineering pipeline."
        canonical="/process"
      />

      {/* Hero */}
      <section className="pt-32 sm:pt-40 pb-16 bg-radial-gradient border-b border-slate-200/80">
        <div className="container-vortex text-left space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-mono text-slate-700 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span className="font-bold text-blue-600">METHODOLOGY</span>
            <span className="text-slate-300">/</span>
            <span>AGILE DELIVERY PIPELINE</span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-slate-900 tracking-tight leading-tight">
            Predictable Execution from Discovery to Production.
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
            We eliminate scope ambiguity with an uncompromising four-phase delivery methodology centered on transparency, strict typing, and high-velocity sprints.
          </p>
        </div>
      </section>

      {/* Phases */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="container-vortex space-y-16">
          {phases.map((phase) => {
            const Icon = phase.icon;
            return (
              <div
                key={phase.step}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start p-8 rounded-2xl border border-slate-200/80 bg-slate-50/40 text-left"
              >
                <div className="lg:col-span-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono font-extrabold text-blue-600 text-2xl">
                      {phase.step}
                    </span>
                    <span className="text-xs font-mono text-slate-500 uppercase font-semibold">
                      Sprint Horizon: {phase.duration}
                    </span>
                  </div>

                  <h2 className="font-display font-bold text-2xl text-slate-900">
                    {phase.title}
                  </h2>

                  <p className="text-sm text-slate-600 leading-relaxed font-body">
                    {phase.desc}
                  </p>
                </div>

                <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-slate-200/80 space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-slate-900 font-bold">
                    Phase Contract Deliverables
                  </h3>
                  <ul className="space-y-2.5">
                    {phase.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Standards */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="container-vortex max-w-4xl space-y-10 text-left">
          <div className="space-y-2">
            <span className="badge-vortex">ENGINEERING STANDARDS</span>
            <h2 className="font-display font-bold text-3xl text-slate-900">
              Guarantees on Every Engagement
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-2">
              <ShieldCheck className="w-6 h-6 text-blue-600" />
              <h3 className="font-display font-bold text-base text-slate-900">100% IP Ownership</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                All source code, design assets, and infrastructure configurations belong entirely to your company.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-2">
              <Zap className="w-6 h-6 text-blue-600" />
              <h3 className="font-display font-bold text-base text-slate-900">Core Web Vitals</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We guarantee sub-second LCP and green scores across mobile and desktop Lighthouse audits.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-2">
              <Terminal className="w-6 h-6 text-blue-600" />
              <h3 className="font-display font-bold text-base text-slate-900">Zero Technical Debt</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Clean, typed TypeScript with modular component boundaries and zero unhandled edge states.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
