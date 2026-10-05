import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import type { Project, Service, Testimonial, FAQ } from '../types/api';
import { Hero3D } from '../components/Hero3D';
import { SEO } from '../components/SEO';
import { buildOrganizationSchema, buildWebSiteSchema } from '../config/seo';
import {
  ArrowDown,
  ArrowUpRight,
  Layers,
  Star,
  Plus,
  Minus
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [heroContent, setHeroContent] = useState<any>(null);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  useEffect(() => {
    // Fetch live CMS data with graceful fallback
    api.getProjects({ status: 'PUBLISHED' }).then((res) => setProjects(res.projects)).catch(() => {});
    api.getServices().then((res) => setServices(res.services)).catch(() => {});
    api.getTestimonials().then((res) => setTestimonials(res.testimonials)).catch(() => {});
    api.getFAQs().then((res) => setFaqs(res.faqs)).catch(() => {});
    api.getContent().then((res) => {
      if (res.content.home_hero) setHeroContent(res.content.home_hero);
    }).catch(() => {});
  }, []);

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 3);

  return (
    <div className="space-y-0 font-body">
      <SEO
        title="WORKVORTEX — Digital Products, UI/UX & Web Engineering Studio"
        description="WORKVORTEX crafts high-performance digital products, web applications, SaaS dashboards, and modern interfaces engineered with React, Next.js, and TypeScript."
        canonical="/"
        schema={[buildOrganizationSchema(), buildWebSiteSchema()]}
      />

      {/* 1. Hero Section */}
      <section className="relative pt-32 sm:pt-40 pb-20 md:pb-28 overflow-hidden bg-radial-gradient border-b border-slate-200/80">
        <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

        <div className="container-vortex relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headline */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-mono tracking-wider text-slate-700 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                <span className="font-bold text-blue-600">WORKVORTEX</span>
                <span className="text-slate-300">/</span>
                <span className="font-medium text-slate-600">
                  {heroContent?.badge || 'DIGITAL PRODUCT STUDIO'}
                </span>
              </div>

              <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-[4.75rem] tracking-tight leading-[1.05] text-slate-900">
                {heroContent?.headline_line1 || 'Engineered for'}{' '}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  {heroContent?.headline_accent || 'Digital Distinction.'}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl font-normal leading-relaxed">
                {heroContent?.subtext ||
                  'We architect high-performance digital products, web applications, SaaS dashboards, and modern interfaces engineered with React 19, Next.js, and TypeScript.'}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <Link
                  to="/contact"
                  className="btn-primary text-sm py-3 px-6 shadow-md shadow-blue-500/10 flex items-center gap-2"
                >
                  <span>Start a Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/work"
                  className="btn-secondary text-sm py-3 px-6 shadow-xs flex items-center gap-2"
                >
                  <span>Explore Selected Work</span>
                  <ArrowDown className="w-4 h-4 text-slate-400" />
                </Link>
              </div>

              {/* Live availability pill */}
              <div className="pt-2 flex items-center gap-2.5 text-xs font-mono text-slate-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>
                  {heroContent?.availability_status || 'Accepting New 2026 Collaborations'}
                </span>
                <span className="text-slate-300">•</span>
                <span>Fast 24-Hour Scope Estimation</span>
              </div>
            </div>

            {/* Right Column: 3D Torus Knot Experience */}
            <div className="lg:col-span-5 h-[380px] sm:h-[460px] lg:h-[500px] w-full flex items-center justify-center relative">
              <div className="w-full h-full relative z-10">
                <Hero3D />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Engineering Telemetry & Capability Badges */}
      <section className="py-12 bg-white border-b border-slate-200/80">
        <div className="container-vortex">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            <div className="space-y-1 p-4 rounded-xl bg-slate-50/70 border border-slate-100">
              <div className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
                0.8s LCP
              </div>
              <p className="text-xs font-mono text-slate-500">Sub-second Core Web Vitals</p>
            </div>

            <div className="space-y-1 p-4 rounded-xl bg-slate-50/70 border border-slate-100">
              <div className="font-display font-bold text-2xl sm:text-3xl text-blue-600">
                100%
              </div>
              <p className="text-xs font-mono text-slate-500">TypeScript Strict Type Safety</p>
            </div>

            <div className="space-y-1 p-4 rounded-xl bg-slate-50/70 border border-slate-100">
              <div className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
                120 FPS
              </div>
              <p className="text-xs font-mono text-slate-500">Smooth Hardware Animation</p>
            </div>

            <div className="space-y-1 p-4 rounded-xl bg-slate-50/70 border border-slate-100">
              <div className="font-display font-bold text-2xl sm:text-3xl text-indigo-600">
                AI + CRM
              </div>
              <p className="text-xs font-mono text-slate-500">Autonomous Lead Automation</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Case Studies */}
      <section className="py-20 bg-[#F8FAFC] border-b border-slate-200">
        <div className="container-vortex space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-left">
            <div className="space-y-2">
              <span className="badge-vortex">FLAGSHIP CASE STUDIES</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
                Selected Works & Architectural Showcases
              </h2>
            </div>
            <Link
              to="/work"
              className="text-xs font-mono font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 self-start"
            >
              <span>View All Projects ({projects.length})</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProjects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => navigate(`/work/${proj.slug}`)}
                className="card-vortex p-0 overflow-hidden flex flex-col justify-between group cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="aspect-[16/10] bg-slate-100 relative overflow-hidden border-b border-slate-200">
                    <img
                      src={proj.featured_image || '/assets/projects/velora.jpg'}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-[10.5px] font-mono font-bold text-slate-900 shadow-xs">
                      {proj.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="font-display font-bold text-xl text-slate-900 group-hover:text-blue-600 transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {proj.short_description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {proj.technologies?.slice(0, 3).map((tech, i) => (
                        <span key={i} className="text-[10.5px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-blue-600 font-semibold">
                  <span>Explore Case Study</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Capabilities & Services Catalog */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="container-vortex space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-left">
            <div className="space-y-2">
              <span className="badge-vortex">STUDIO CAPABILITIES</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
                Engineering & Design Services
              </h2>
            </div>
            <Link
              to="/services"
              className="text-xs font-mono font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 self-start"
            >
              <span>Explore All Capabilities</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {services.slice(0, 4).map((srv) => (
              <div
                key={srv.id}
                onClick={() => navigate(`/services/${srv.slug}`)}
                className="card-vortex p-6 flex flex-col justify-between hover:border-blue-300 transition-all cursor-pointer group"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                    {srv.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {srv.short_description}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-slate-900">{srv.starting_price_inr}</span>
                  <span className="text-blue-600 font-semibold flex items-center gap-0.5">
                    <span>Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Client Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-20 bg-[#F8FAFC] border-b border-slate-200">
          <div className="container-vortex space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="badge-vortex">CLIENT TESTIMONIALS</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
                Trusted by Technical Leaders
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {testimonials.map((t) => (
                <div key={t.id} className="card-vortex p-6 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex text-amber-400">
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-700 italic leading-relaxed">
                      "{t.quote}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                      {t.author_name[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-slate-900">{t.author_name}</div>
                      <div className="text-[10.5px] font-mono text-slate-500">
                        {t.author_role} • {t.author_company}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. FAQ Preview */}
      {faqs.length > 0 && (
        <section className="py-20 bg-white border-b border-slate-200">
          <div className="container-vortex max-w-4xl space-y-10 text-left">
            <div className="space-y-2">
              <span className="badge-vortex">FREQUENTLY ASKED QUESTIONS</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
                Questions on Workflow & Retainers
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.slice(0, 4).map((f) => (
                <div
                  key={f.id}
                  className="rounded-xl border border-slate-200 bg-slate-50/50 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === f.id ? null : f.id)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 font-display font-semibold text-sm sm:text-base text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    <span>{f.question}</span>
                    {expandedFaq === f.id ? (
                      <Minus className="w-4 h-4 text-blue-600 shrink-0" />
                    ) : (
                      <Plus className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {expandedFaq === f.id && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-200/60 font-body">
                      {f.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center pt-2">
              <Link
                to="/faq"
                className="text-xs font-mono font-bold text-blue-600 hover:underline inline-flex items-center gap-1"
              >
                <span>View Full FAQ Directory →</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 7. Conversion Banner */}
      <section className="py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white relative overflow-hidden">
        <div className="container-vortex relative z-10 text-center space-y-6 max-w-2xl mx-auto">
          <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-mono font-semibold">
            INITIATE COLLABORATION
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight leading-tight text-white">
            Have a project or digital product to build?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
            Get an instant AI-powered scope estimation, strategic pricing breakdown, and 24-hour proposal turnaround from our lead architect.
          </p>
          <div className="pt-4 flex flex-wrap justify-center items-center gap-4">
            <Link
              to="/contact"
              className="btn-primary text-sm py-3 px-8 shadow-lg shadow-blue-600/30 flex items-center gap-2"
            >
              <span>Start Your Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
