import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import type { Service } from '../types/api';
import { SEO } from '../components/SEO';
import {
  Layers,
  ArrowUpRight,
  CheckCircle2
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getServices()
      .then((res) => setServices(res.services))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-0 font-body">
      <SEO
        title="Services & Capabilities — WORKVORTEX Digital Studio"
        description="Comprehensive web engineering, custom website development, SaaS platforms, UI/UX design systems, and business automation solutions."
        canonical="/services"
      />

      {/* Header */}
      <section className="pt-32 sm:pt-40 pb-16 bg-radial-gradient border-b border-slate-200/80">
        <div className="container-vortex text-left space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-mono text-slate-700 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span className="font-bold text-blue-600">CAPABILITIES</span>
            <span className="text-slate-300">/</span>
            <span>END-TO-END ENGINEERING</span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-slate-900 tracking-tight leading-tight">
            Services Built for High-Performance Digital Scale.
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
            From bespoke corporate flagships to multi-tenant cloud architectures, every solution is custom-coded in React 19, TypeScript, and modern CSS with transparent pricing and fast turnaround times.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="container-vortex space-y-16">
          {loading ? (
            <div className="text-center py-20 text-slate-500 font-mono text-xs">
              Loading studio services...
            </div>
          ) : (
            services.map((srv, idx) => (
              <div
                key={srv.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start p-8 rounded-2xl border border-slate-200/80 bg-slate-50/40 hover:bg-white hover:border-slate-300 hover:shadow-card transition-all"
              >
                {/* Left Overview */}
                <div className="lg:col-span-6 space-y-5 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                      <Layers className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-slate-500">Service 0{idx + 1}</span>
                      <h2 className="font-display font-bold text-2xl text-slate-900">
                        {srv.name}
                      </h2>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {srv.full_description || srv.short_description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-2 text-xs font-mono">
                    <div className="p-3 bg-white rounded-lg border border-slate-200/70">
                      <span className="text-slate-500 block text-[11px]">Starting Price:</span>
                      <span className="font-bold text-slate-900 text-sm">{srv.starting_price_inr}</span>
                      <span className="text-slate-500 block text-[10.5px]">({srv.starting_price_usd})</span>
                    </div>

                    <div className="p-3 bg-white rounded-lg border border-slate-200/70">
                      <span className="text-slate-500 block text-[11px]">Delivery Timeline:</span>
                      <span className="font-bold text-slate-900 text-sm">{srv.timeline}</span>
                      <span className="text-slate-500 block text-[10.5px]">Milestone-Based</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <Link
                      to={`/services/${srv.slug}`}
                      className="btn-primary text-xs py-2.5 px-5 font-semibold flex items-center gap-1.5"
                    >
                      <span>Explore Deliverables & Specs</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      to="/contact"
                      className="btn-secondary text-xs py-2.5 px-4 font-semibold"
                    >
                      <span>Inquire Now</span>
                    </Link>
                  </div>
                </div>

                {/* Right: Deliverables & Features */}
                <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-slate-200/80 space-y-5 text-left">
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-wider text-slate-900 font-bold mb-3">
                      Included Deliverables
                    </h3>
                    <ul className="space-y-2">
                      {srv.deliverables?.map((del, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 font-body">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {srv.features && srv.features.length > 0 && (
                    <div className="pt-4 border-t border-slate-100">
                      <h3 className="text-xs font-mono uppercase tracking-wider text-slate-900 font-bold mb-3">
                        Technical Highlights
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {srv.features.map((feat, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-mono"
                          >
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Conversion Section */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="container-vortex text-center space-y-6 max-w-xl mx-auto">
          <h2 className="font-display font-bold text-3xl text-slate-900">
            Need a custom architectural engagement?
          </h2>
          <p className="text-sm text-slate-600">
            Tell us about your requirements and our engineering squad will draft a customized proposal within 24 hours.
          </p>
          <Link
            to="/contact"
            className="btn-primary text-xs py-3 px-6 inline-flex items-center gap-2"
          >
            <span>Request Custom Scope</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};
