import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import type { Service } from '../types/api';
import {
  Layers,
  Plus,
  Edit,
  Trash2,
  ExternalLink
} from 'lucide-react';

export const ServicesManager: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = () => {
    setLoading(true);
    api
      .getServices()
      .then((res) => setServices(res.services))
      .catch((err) => console.error('Failed to load services:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete service "${name}"?`)) {
      return;
    }

    try {
      await api.deleteService(id);
      setServices((prev) => prev.filter((s) => s.id !== id));
    } catch (err: any) {
      alert(`Delete error: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
            Services & Capabilities CMS
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
            Configure studio offerings, deliverables, pricing tiers, and process flows.
          </p>
        </div>
        <Link
          to="/admin/services/new"
          className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Service</span>
        </Link>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-2 text-center py-12 text-slate-500 font-mono text-xs">
            Loading services...
          </div>
        ) : services.length === 0 ? (
          <div className="col-span-2 text-center py-12 text-slate-500 font-mono text-xs">
            No services created yet.
          </div>
        ) : (
          services.map((srv) => (
            <div
              key={srv.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 hover:border-slate-700 transition-colors flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-base text-white">
                        {srv.name}
                      </h3>
                      <span className="text-[11px] font-mono text-slate-400">
                        /{srv.slug}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      srv.is_published
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {srv.is_published ? 'LIVE' : 'DRAFT'}
                  </span>
                </div>

                <p className="text-xs text-slate-300 font-body leading-relaxed line-clamp-2">
                  {srv.short_description}
                </p>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-xs font-mono">
                  <div>
                    <span className="text-slate-500 text-[10.5px] block">Starting Tier:</span>
                    <span className="font-bold text-emerald-400">
                      {srv.starting_price_inr}
                    </span>
                    <span className="text-slate-500 text-[10.5px] block">
                      ({srv.starting_price_usd})
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10.5px] block">Typical Timeline:</span>
                    <span className="font-semibold text-slate-200">{srv.timeline}</span>
                    <span className="text-slate-500 text-[10.5px] block">
                      {srv.deliverables?.length || 0} Deliverables
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                <Link
                  to={`/services/${srv.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  <span>Public Page</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/admin/services/${srv.id}/edit`}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-semibold transition-colors flex items-center gap-1"
                  >
                    <Edit className="w-3 h-3" />
                    <span>Edit</span>
                  </Link>
                  <button
                    onClick={() => handleDelete(srv.id, srv.name)}
                    className="p-1 rounded text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                    title="Delete Service"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
