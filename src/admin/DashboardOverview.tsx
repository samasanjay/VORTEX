import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import type { DashboardMetrics, Lead, AuditLog } from '../types/api';
import {
  Users,
  Flame,
  FolderGit2,
  Layers,
  ArrowUpRight,
  Clock,
  Plus,
  ArrowRight
} from 'lucide-react';

export const DashboardOverview: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [recentAudit, setRecentAudit] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getDashboardStats()
      .then((data) => {
        setMetrics(data.metrics);
        setRecentLeads(data.recentLeads);
        setRecentAudit(data.recentAudit);
      })
      .catch((err) => console.error('Dashboard load error:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-slate-800 rounded animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-slate-900 border border-slate-800 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
            Operations & Growth Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
            Real-time telemetry on incoming inquiries, portfolio CMS, and system activities.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/admin/projects/new"
            className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Case Study</span>
          </Link>
          <Link
            to="/admin/leads"
            className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors"
          >
            <span>View All Leads</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Inquiries */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Total Inquiries
            </span>
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-display font-extrabold text-white">
              {metrics?.totalLeads ?? 0}
            </span>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
              {metrics?.newLeads ?? 0} New
            </span>
          </div>
          <div className="text-[11px] text-slate-400 flex items-center gap-2">
            <span>Captured via AI pipeline</span>
          </div>
        </div>

        {/* Hot Leads */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Hot Qualified Leads
            </span>
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-display font-extrabold text-white">
              {metrics?.hotLeads ?? 0}
            </span>
            <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
              {metrics?.warmLeads ?? 0} Warm
            </span>
          </div>
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
            <span>Priority for sales follow-up</span>
          </div>
        </div>

        {/* Published Projects */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Published Case Studies
            </span>
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              <FolderGit2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-display font-extrabold text-white">
              {metrics?.publishedProjects ?? 0}
            </span>
            <span className="text-xs font-mono text-slate-400">
              / {metrics?.totalProjects ?? 0} Total
            </span>
          </div>
          <div className="text-[11px] text-slate-400">
            <span>Active on public website</span>
          </div>
        </div>

        {/* Live Services */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Active Offerings
            </span>
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-display font-extrabold text-white">
              {metrics?.totalServices ?? 0}
            </span>
            <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
              CMS Managed
            </span>
          </div>
          <div className="text-[11px] text-slate-400">
            <span>Website development & SaaS</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Leads & Audit Trail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recent Inquiries CRM Table */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h2 className="font-display font-bold text-lg text-white">
                Recent Inquiries & AI Pipeline
              </h2>
              <p className="text-xs font-mono text-slate-400">
                Latest client requests evaluated with automatic score & budget tier.
              </p>
            </div>
            <Link
              to="/admin/leads"
              className="text-xs font-mono text-blue-400 hover:text-blue-300 flex items-center gap-1 font-semibold"
            >
              <span>CRM Table</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase tracking-wider">
                  <th className="py-2.5 px-3">Client</th>
                  <th className="py-2.5 px-3">Project / Service</th>
                  <th className="py-2.5 px-3">Score & Tier</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {recentLeads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500 font-mono">
                      No inquiries submitted yet.
                    </td>
                  </tr>
                ) : (
                  recentLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-3">
                        <div className="font-semibold text-slate-200">{lead.name}</div>
                        <div className="text-[11px] font-mono text-slate-500 truncate max-w-[140px]">
                          {lead.company || lead.email}
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="text-slate-300 font-medium">{lead.project_type}</div>
                        <div className="text-[11px] font-mono text-slate-500">{lead.budget_range}</div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                              lead.quality === 'HOT'
                                ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                                : lead.quality === 'WARM'
                                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                : 'bg-slate-700/50 text-slate-400 border border-slate-700'
                            }`}
                          >
                            {lead.quality} ({lead.score})
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          {lead.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <Link
                          to={`/admin/leads/${lead.id}`}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-mono font-semibold transition-colors"
                        >
                          Review →
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Audit Activity Log */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <h2 className="font-display font-bold text-base text-white">
                Live Audit Activity
              </h2>
            </div>
            <Link to="/admin/audit-logs" className="text-xs font-mono text-slate-400 hover:text-white">
              All logs
            </Link>
          </div>

          <div className="space-y-3.5">
            {recentAudit.length === 0 ? (
              <p className="text-xs font-mono text-slate-500 text-center py-6">No audit records yet.</p>
            ) : (
              recentAudit.map((log) => (
                <div key={log.id} className="text-xs space-y-1 pb-3 border-b border-slate-800/40 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-blue-400 text-[11px]">
                      {log.action}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11.5px] leading-relaxed">
                    {log.details || `Modified ${log.resource}`}
                  </p>
                  <div className="text-[10px] font-mono text-slate-500">
                    By: {log.user_name || 'System'}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
