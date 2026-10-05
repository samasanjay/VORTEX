import React from 'react';
import { SEO } from '../components/SEO';
import {
  Code2,
  Cpu,
  Database,
  Cloud
} from 'lucide-react';

export const TechnologyPage: React.FC = () => {
  const stackCategories = [
    {
      category: 'Frontend & UI Core',
      icon: Code2,
      technologies: [
        { name: 'React 19', desc: 'Concurrent rendering, Server Actions, optimistic state mutations' },
        { name: 'TypeScript 6', desc: 'Strict compile-time type safety across all models and APIs' },
        { name: 'Next.js 15 (App Router)', desc: 'Edge server rendering, streaming SSR, and asset optimization' },
        { name: 'Tailwind CSS v4', desc: 'Tokenized styling engine with zero runtime overhead' },
        { name: 'Three.js & WebGL', desc: 'Hardware-accelerated 3D graphics and particle shaders' },
      ],
    },
    {
      category: 'Backend & Persistence Layer',
      icon: Database,
      technologies: [
        { name: 'Node.js & Express', desc: 'High-throughput async event loops and structured REST services' },
        { name: 'SQLite (DatabaseSync) & PostgreSQL', desc: 'ACID-compliant relational persistence with WAL mode' },
        { name: 'WebSockets & SSE', desc: 'Zero-latency multiplayer state sync and live telemetry streaming' },
        { name: 'JWT & Bcrypt Security', desc: 'Role-based access control with cryptographically hashed credentials' },
      ],
    },
    {
      category: 'AI & Automation Pipelines',
      icon: Cpu,
      technologies: [
        { name: 'OpenAI GPT-4o-mini', desc: 'Server-side lead scoring, strategic pricing, and automated dossier synthesis' },
        { name: 'Dynamic Semantic Analyzer', desc: 'Zero-latency heuristic fallback engine with keyword pattern matching' },
        { name: 'Webhook Relays', desc: 'Bi-directional sync connectors for Notion, Slack, CRM, and WhatsApp' },
      ],
    },
    {
      category: 'Infrastructure & Edge Cloud',
      icon: Cloud,
      technologies: [
        { name: 'Cloudflare Workers & Pages', desc: 'Global sub-50ms edge request routing with DDoS mitigation' },
        { name: 'Vercel & Netlify Edge', desc: 'Automated CI/CD git preview deployments and serverless functions' },
        { name: 'Google Structured Schema', desc: 'Dynamic JSON-LD Rich Snippet metadata on all page routes' },
      ],
    },
  ];

  return (
    <div className="space-y-0 font-body">
      <SEO
        title="Technology Stack & Architecture Standards — WORKVORTEX"
        description="Explore the technical stack, architectural standards, and performance benchmarks powering WORKVORTEX web applications and SaaS platforms."
        canonical="/technology"
      />

      {/* Hero */}
      <section className="pt-32 sm:pt-40 pb-16 bg-radial-gradient border-b border-slate-200/80">
        <div className="container-vortex text-left space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-mono text-slate-700 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span className="font-bold text-blue-600">STACK & ARCHITECTURE</span>
            <span className="text-slate-300">/</span>
            <span>PRODUCTION BENCHMARKS</span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-slate-900 tracking-tight leading-tight">
            Engineered with Modern, Type-Safe Web Standards.
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
            We avoid bloated templates. Every application is constructed with clean, typed TypeScript, hardware-accelerated rendering, and edge-native deployment pipelines.
          </p>
        </div>
      </section>

      {/* Stack Categories Grid */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="container-vortex space-y-16 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {stackCategories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-50/50 border border-slate-200/80 rounded-2xl p-7 space-y-5"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h2 className="font-display font-bold text-xl text-slate-900">
                      {cat.category}
                    </h2>
                  </div>

                  <div className="space-y-3.5">
                    {cat.technologies.map((tech, i) => (
                      <div key={i} className="p-3.5 bg-white rounded-xl border border-slate-200/70 space-y-1">
                        <div className="font-mono font-bold text-xs text-blue-600">
                          {tech.name}
                        </div>
                        <p className="text-xs text-slate-600 font-body leading-relaxed">
                          {tech.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benchmarks */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="container-vortex max-w-4xl space-y-8 text-left">
          <span className="badge-vortex">PERFORMANCE AUDIT</span>
          <h2 className="font-display font-bold text-3xl text-slate-900">
            Core Web Vitals & Production Metrics
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-1">
              <span className="text-xs font-mono text-slate-500">LCP (Page Speed)</span>
              <div className="font-display font-bold text-2xl text-emerald-600">&lt; 0.8s</div>
              <span className="text-[10px] font-mono text-slate-400">Green Tier Target</span>
            </div>

            <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-1">
              <span className="text-xs font-mono text-slate-500">CLS (Layout Shift)</span>
              <div className="font-display font-bold text-2xl text-emerald-600">0.00</div>
              <span className="text-[10px] font-mono text-slate-400">Zero Content Jitter</span>
            </div>

            <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-1">
              <span className="text-xs font-mono text-slate-500">FID / INP (Latency)</span>
              <div className="font-display font-bold text-2xl text-emerald-600">&lt; 16ms</div>
              <span className="text-[10px] font-mono text-slate-400">Instant Click Response</span>
            </div>

            <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-1">
              <span className="text-xs font-mono text-slate-500">Lighthouse Score</span>
              <div className="font-display font-bold text-2xl text-emerald-600">98-100</div>
              <span className="text-[10px] font-mono text-slate-400">Top 1% Percentile</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
