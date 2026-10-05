import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';
import type { User, UserRole } from '../types/api';
import { 
  Plus, 
  Shield, 
  Key, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  RefreshCw,
  UserCheck,
  UserX
} from 'lucide-react';

export const TeamManager: React.FC = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');

  // New user modal state
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roleId, setRoleId] = useState<UserRole>('EDITOR');
  const [jobTitle, setJobTitle] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const fetchUsers = () => {
    setLoading(true);
    setActionError(null);
    api
      .getUsers()
      .then((res) => setUsers(res.users))
      .catch((err) => {
        console.error(err);
        setActionError(err.message || 'Failed to fetch users list.');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    setSubmitting(true);
    setActionError(null);

    try {
      await api.createTeamMember({
        name: name.trim(),
        email: email.trim(),
        password,
        role_id: roleId,
        job_title: jobTitle.trim(),
        phone: phone.trim(),
      });
      setShowModal(false);
      setName('');
      setEmail('');
      setPassword('');
      setJobTitle('');
      setPhone('');
      fetchUsers();
    } catch (err: any) {
      setActionError(err.message || 'Failed to create user account.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    try {
      await api.updateUserRole(userId, newRole);
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole, role_id: newRole, roleId: newRole } : u))
      );
    } catch (err: any) {
      alert(`Role change error: ${err.message}`);
    }
  };

  const handleToggleStatus = async (user: User) => {
    const isCurrentlyActive = user.status === 'ACTIVE' || (user.status === undefined && user.is_active);
    const nextStatus = isCurrentlyActive ? 'DISABLED' : 'ACTIVE';
    try {
      await api.updateUserStatus(user.id, nextStatus);
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, status: nextStatus, is_active: nextStatus === 'ACTIVE' ? 1 : 0 } : u))
      );
    } catch (err: any) {
      alert(`Status update error: ${err.message}`);
    }
  };

  const handleRevokeSessions = async (userId: string) => {
    if (!confirm('Are you sure you want to invalidate all active session tokens for this user?')) return;
    try {
      await api.revokeUserSessions(userId);
      alert('All active sessions for this user have been revoked.');
    } catch (err: any) {
      alert(`Revocation error: ${err.message}`);
    }
  };

  const handleDeleteUser = async (user: User) => {
    if (user.id === currentUser?.id) {
      alert('Security policy prevents deleting your own authenticated account from this panel.');
      return;
    }
    if (!confirm(`Are you sure you want to permanently delete user "${user.name}" (${user.email})?`)) return;

    try {
      await api.deleteUser(user.id);
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
    } catch (err: any) {
      alert(`Deletion error: ${err.message}`);
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.job_title && u.job_title.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const userRole = (u.role || u.role_id || u.roleId || 'PUBLIC_USER').toUpperCase();
    const matchesRole = roleFilter === 'ALL' || userRole === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
            User Management & Access Control (RBAC)
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
            Manage authenticated accounts, grant role privileges, revoke tokens, and audit login activity.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchUsers}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-mono transition-colors cursor-pointer"
            title="Refresh Users"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Account</span>
          </button>
        </div>
      </div>

      {actionError && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{actionError}</span>
        </div>
      )}

      {/* Role explanation cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {[
          { role: 'SUPER_ADMIN', desc: 'Full root control & security' },
          { role: 'ADMIN', desc: 'CMS, leads, projects & SEO' },
          { role: 'EDITOR', desc: 'Portfolio & content editor' },
          { role: 'SALES', desc: 'Leads CRM & client pitches' },
          { role: 'TEAM_MEMBER', desc: 'Standard staff collaborator' },
          { role: 'PUBLIC_USER', desc: 'Client portal & public user' },
        ].map((r, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-1">
            <span className="text-[10px] font-mono font-bold text-blue-400 block truncate">{r.role}</span>
            <p className="text-[10px] text-slate-400 leading-tight">{r.desc}</p>
          </div>
        ))}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900 border border-slate-800 rounded-xl p-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, or title..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="text-xs font-mono text-slate-400">Role:</span>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">ALL ROLES</option>
            <option value="SUPER_ADMIN">SUPER_ADMIN</option>
            <option value="ADMIN">ADMIN</option>
            <option value="EDITOR">EDITOR</option>
            <option value="SALES">SALES</option>
            <option value="TEAM_MEMBER">TEAM_MEMBER</option>
            <option value="PUBLIC_USER">PUBLIC_USER</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-mono uppercase tracking-wider">
                <th className="py-3.5 px-4">User</th>
                <th className="py-3.5 px-4">Email & Auth</th>
                <th className="py-3.5 px-4">Role Privileges</th>
                <th className="py-3.5 px-4">Account Status</th>
                <th className="py-3.5 px-4">Last Active</th>
                <th className="py-3.5 px-4 text-right">Security Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500 font-mono">
                    Loading database accounts...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-500 font-mono">
                    No matching accounts found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  const role = (u.role || u.role_id || u.roleId || 'PUBLIC_USER') as UserRole;
                  const isActive = u.status === 'ACTIVE' || (u.status === undefined && u.is_active);
                  const isVerified = u.email_verified || u.emailVerified;
                  const isGoogle = !!(u.google_id || u.googleId);

                  return (
                    <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden">
                            {u.avatar_url || u.avatarUrl ? (
                              <img src={u.avatar_url || u.avatarUrl || undefined} alt={u.name} className="w-full h-full object-cover" />
                            ) : (
                              u.name[0]?.toUpperCase()
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-200">{u.name}</div>
                            <div className="text-[10px] text-slate-500 font-mono">{u.job_title || 'Registered User'}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="space-y-1">
                          <div className="font-mono text-slate-300">{u.email}</div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {isVerified ? (
                              <span className="inline-flex items-center gap-0.5 text-[9.5px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.2 rounded">
                                <CheckCircle2 className="w-2.5 h-2.5" />
                                <span>Verified</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-0.5 text-[9.5px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.2 rounded">
                                <span>Unverified</span>
                              </span>
                            )}
                            {isGoogle && (
                              <span className="inline-flex items-center gap-0.5 text-[9.5px] font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20 px-1.5 py-0.2 rounded">
                                <span>Google SSO</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <select
                          value={role}
                          onChange={(e) => handleRoleChange(u.id, e.target.value as UserRole)}
                          className={`px-2 py-1 rounded text-[11px] font-mono font-bold border transition-colors cursor-pointer ${
                            role === 'SUPER_ADMIN'
                              ? 'bg-purple-950 text-purple-300 border-purple-800'
                              : role === 'ADMIN'
                              ? 'bg-blue-950 text-blue-300 border-blue-800'
                              : role === 'EDITOR'
                              ? 'bg-indigo-950 text-indigo-300 border-indigo-800'
                              : role === 'SALES'
                              ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                              : 'bg-slate-950 text-slate-300 border-slate-700'
                          }`}
                        >
                          <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                          <option value="ADMIN">ADMIN</option>
                          <option value="EDITOR">EDITOR</option>
                          <option value="SALES">SALES</option>
                          <option value="TEAM_MEMBER">TEAM_MEMBER</option>
                          <option value="PUBLIC_USER">PUBLIC_USER</option>
                        </select>
                      </td>

                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => handleToggleStatus(u)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-mono font-semibold cursor-pointer border transition-colors ${
                            isActive
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                              : 'bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-rose-500/20'
                          }`}
                        >
                          {isActive ? <UserCheck className="w-3 h-3" /> : <UserX className="w-3 h-3" />}
                          <span>{isActive ? 'ACTIVE' : 'DISABLED'}</span>
                        </button>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="text-[11px] font-mono text-slate-400">
                          {u.last_login_at || u.lastLoginAt
                            ? new Date(u.last_login_at || u.lastLoginAt!).toLocaleString()
                            : 'Never logged in'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => handleRevokeSessions(u.id)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                            title="Revoke active sessions"
                          >
                            <Key className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDeleteUser(u)}
                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-colors cursor-pointer"
                            title="Delete user"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create User Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md space-y-4 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-500" />
                <span>Create User Account</span>
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Maya Lin"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="maya@workvortex.com"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Initial Password *</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Role *</label>
                  <select
                    value={roleId}
                    onChange={(e) => setRoleId(e.target.value as UserRole)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="EDITOR">EDITOR</option>
                    <option value="SALES">SALES</option>
                    <option value="TEAM_MEMBER">TEAM_MEMBER</option>
                    <option value="PUBLIC_USER">PUBLIC_USER</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Job Title</label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g. Lead Designer"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-mono cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-semibold cursor-pointer disabled:opacity-50"
                >
                  {submitting ? 'Creating...' : 'Create Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
