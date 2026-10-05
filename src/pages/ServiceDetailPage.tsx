import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import type { Service } from '../types/api';
import { SEO } from '../components/SEO';
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2
} from 'lucide-react';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    api
      .getService(slug)
      .then((res) => setService(res.service))
      .catch((err) => {
        console.error('Service load error:', err);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-40 pb-20 container-vortex space-y-6">
        <div className="h-8 w-48 bg-slate-200 rounded animate-pulse" />
        <div className="h-64 bg-slate-100 rounded-2xl animate-pulse" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="pt-40 pb-20 container-vortex text-center space-y-4">
        <h1 className="text-2xl font-bold text-slate-900">Service Not Found</h1>
        <p className="text-sm text-slate-600">The requested capability could not be found.</p>
        <Link to="/services" className="text-blue-600 font-mono text-xs hover:underline">
          ← Back to Services Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-0 font-body">
      <SEO
        title={`${service.name} — WORKVORTEX Capabilities`}
        description={service.short_description}
        canonical={`/services/${service.slug}`}
      />

      {/* Hero */}
      <section className="pt-32 sm:pt-40 pb-16 bg-radial-gradient border-b border-slate-200/80">
        <div className="container-vortex text-left space-y-5 max-w-4xl">
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Services</span>
          </Link>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-slate-900 tracking-tight leading-tight">
            {service.name}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
            {service.full_description}
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-mono">
            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
              <span className="text-slate-500 block text-[11px]">Published Starting Pricing</span>
              <span className="font-bold text-slate-900 text-sm">{service.starting_price_inr}</span>
              <span className="text-slate-500 block text-[10.5px]">({service.starting_price_usd})</span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
              <span className="text-slate-500 block text-[11px]">Sprint Timeline</span>
              <span className="font-bold text-slate-900 text-sm">{service.timeline}</span>
              <span className="text-slate-500 block text-[10.5px]">Dedicated Engineer Delivery</span>
            </div>

            <Link
              to="/contact"
              className="btn-primary text-xs py-3.5 px-6 font-semibold flex items-center gap-2 shadow-sm"
            >
              <span>Inquire About This Service</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Process & Methodology */}
      {service.process_steps && service.process_steps.length > 0 && (
        <section className="py-20 bg-white border-b border-slate-200">
          <div className="container-vortex space-y-12 text-left">
            <div className="space-y-2">
              <span className="badge-vortex">DELIVERY PHASES</span>
              <h2 className="font-display font-bold text-3xl text-slate-900">
                How We Deliver {service.name}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.process_steps.map((step, idx) => (
                <div key={idx} className="p-6 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-3">
                  <span className="font-mono font-bold text-blue-600 text-lg">{step.step}</span>
                  <h3 className="font-display font-bold text-base text-slate-900">{step.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-body">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Deliverables Grid */}
      <section className="py-20 bg-[#F8FAFC] border-b border-slate-200">
        <div className="container-vortex grid grid-cols-1 lg:grid-cols-12 gap-12 text-left items-start">
          <div className="lg:col-span-6 space-y-4">
            <span className="badge-vortex">SPECIFICATIONS</span>
            <h2 className="font-display font-bold text-3xl text-slate-900">
              Contract Deliverables & Ownership
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every deliverable includes full intellectual property transfer, version-controlled git repositories, documentation, and cloud deployment pipelines.
            </p>
          </div>

          <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-card space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-900 font-bold">
              Included in Contract
            </h3>
            <ul className="space-y-3">
              {service.deliverables?.map((del, i) => (
                <li key={i} className="flex items-start gap-3 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{del}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Conversion Banner */}
      <section className="py-20 bg-slate-950 text-white text-center">
        <div className="container-vortex space-y-6 max-w-xl mx-auto">
          <h2 className="font-display font-bold text-3xl text-white">
            {service.cta_heading || `Ready to begin with ${service.name}?`}
          </h2>
          <p className="text-sm text-slate-400">
            {service.cta_subtext || 'Get an estimated proposal and timeline within 24 hours.'}
          </p>
          <Link
            to="/contact"
            className="btn-primary text-xs py-3 px-6 inline-flex items-center gap-2"
          >
            <span>Start Project Inquiry</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};
