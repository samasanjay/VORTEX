import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../admin/AuthContext';
import { api, setAuthToken } from '../../services/api';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Loader2, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck,
  X,
  Copy,
  Check,
  ExternalLink
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, isAuthenticated, user, refreshSession } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Google OAuth Setup & Simulation Modal
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [isSimulatingGoogle, setIsSimulatingGoogle] = useState(false);
  const [copiedRedirectUri, setCopiedRedirectUri] = useState(false);

  const verified = searchParams.get('verified') === '1';
  const reset = searchParams.get('reset') === '1';
  const urlError = searchParams.get('error');

  const targetRedirect = (location.state as any)?.from?.pathname || (user?.role && user.role !== 'PUBLIC_USER' ? '/admin/dashboard' : '/account');

  // If already authenticated, redirect
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role && ['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'SALES', 'TEAM_MEMBER'].includes(user.role)) {
        navigate(targetRedirect, { replace: true });
      } else {
        navigate('/account', { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate, targetRedirect]);

  useEffect(() => {
    if (urlError) {
      setError(decodeURIComponent(urlError));
    }
  }, [urlError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both your email and password.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await login({ email: email.trim(), password });
      if (res.user?.role && ['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'SALES', 'TEAM_MEMBER'].includes(res.user.role)) {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate('/account', { replace: true });
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setError(null);
    try {
      const res = await api.getGoogleAuth();
      if (res.authUrl || res.url) {
        window.location.href = (res.authUrl || res.url)!;
      } else {
        setShowGoogleModal(true);
      }
    } catch {
      setShowGoogleModal(true);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleSimulateGoogleSSO = async () => {
    setIsSimulatingGoogle(true);
    try {
      const res = await api.devSimulateGoogleAuth({
        name: 'Alex Vance (Google SSO)',
        email: 'alex.google@workvortex.studio',
      });
      if (res.token) {
        setAuthToken(res.token);
        await refreshSession();
        setShowGoogleModal(false);
        navigate('/account', { replace: true });
      }
    } catch (err: any) {
      setError(err.message || 'Failed to simulate Google OAuth.');
    } finally {
      setIsSimulatingGoogle(false);
    }
  };

  const redirectUri = typeof window !== 'undefined' ? `${window.location.origin}/api/auth/google/callback` : 'http://localhost:5173/api/auth/google/callback';

  const handleCopyUri = () => {
    navigator.clipboard.writeText(redirectUri);
    setCopiedRedirectUri(true);
    setTimeout(() => setCopiedRedirectUri(false), 2000);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] pt-24 pb-16 flex items-center justify-center px-4 sm:px-6 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        
        {/* Card Header & Brand */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 group mb-4">
            <img
              src="/assets/workvortex-logo.png"
              alt="WORKVORTEX"
              className="w-10 h-10 rounded-xl object-contain shadow-md shadow-blue-500/10 group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col text-left">
              <span className="font-display font-bold text-xl tracking-tight text-slate-900 leading-tight">
                WORK<span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">VORTEX</span>
              </span>
              <span className="text-[9.5px] font-mono tracking-wider text-slate-500 font-semibold uppercase">
                STUDIO IDENTITY & ACCESS
              </span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold font-display text-slate-900 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Sign in to access your projects, client portal, or studio dashboard.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500" />

          {/* Success Banners */}
          {verified && (
            <div className="mb-6 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Email Verified Successfully!</p>
                <p className="text-emerald-700 mt-0.5">Your email has been confirmed. You can now sign in with full access.</p>
              </div>
            </div>
          )}

          {reset && (
            <div className="mb-6 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Password Updated!</p>
                <p className="text-emerald-700 mt-0.5">Your password has been changed securely. Sign in with your new password.</p>
              </div>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold">Authentication Notice</p>
                <p className="text-rose-700 mt-0.5">{error}</p>
              </div>
            </div>
          )}

          {/* Google OAuth Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading || isLoading}
            className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold rounded-xl text-sm flex items-center justify-center gap-3 transition-all shadow-xs hover:shadow disabled:opacity-60 cursor-pointer"
          >
            {isGoogleLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                <span>Checking Google Provider...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-slate-400 font-mono font-medium">
                or sign in with email
              </span>
            </div>
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember me option */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-xs text-slate-600">Keep me signed in</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || isGoogleLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/20 disabled:opacity-60 cursor-pointer pt-3"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials Helper */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 font-semibold uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>Studio Quick Access:</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              <button
                type="button"
                onClick={() => { setEmail('admin@workvortex.com'); setPassword('VortexAdmin2026!'); }}
                className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left text-slate-700 transition-colors cursor-pointer"
              >
                <div className="font-bold text-slate-900">Admin</div>
                <div className="text-[10px] text-slate-500 truncate">admin@workvortex.com</div>
              </button>
              <button
                type="button"
                onClick={() => { setEmail('client@example.com'); setPassword('VortexClient2026!'); }}
                className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left text-slate-700 transition-colors cursor-pointer"
              >
                <div className="font-bold text-slate-900">Client Portal</div>
                <div className="text-[10px] text-slate-500 truncate">client@example.com</div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Link */}
        <div className="text-center mt-6 space-y-3">
          <p className="text-sm text-slate-600">
            Don't have an account yet?{' '}
            <Link
              to="/register"
              className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
            >
              Create an account
            </Link>
          </p>

          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            <span>256-Bit Encrypted & HTTP-Only Secure Sessions</span>
          </div>
        </div>
      </div>

      {/* Google OAuth Configuration & Dev Sandbox Modal */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full shadow-2xl p-6 sm:p-7 space-y-5 animate-in fade-in">
            
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 font-display">
                    Google OAuth Setup & Sandbox
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">
                    Client ID & Secret not yet entered in .env
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowGoogleModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Option 1: Instant Sandbox Simulation */}
            <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded bg-blue-600 text-white text-[10px] font-mono font-bold">OPTION 1</span>
                <span className="text-xs font-bold text-blue-950">1-Click Dev Google SSO Simulation</span>
              </div>
              <p className="text-xs text-blue-900 leading-relaxed">
                Test the complete Google OAuth authentication flow, database profile creation, session cookies, and account linking immediately without creating a Google Cloud project:
              </p>
              <button
                type="button"
                onClick={handleSimulateGoogleSSO}
                disabled={isSimulatingGoogle}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                {isSimulatingGoogle ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Signing in with Google Sandbox...</span>
                  </>
                ) : (
                  <>
                    <span>Sign in with Google Test User (alex.google@workvortex.studio)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>

            {/* Option 2: Real Google Cloud Credentials */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 text-white text-[10px] font-mono font-bold">OPTION 2</span>
                  <span className="text-xs font-bold text-slate-800">Production Google Cloud Setup</span>
                </div>
                <a
                  href="https://console.cloud.google.com/apis/credentials"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-blue-600 hover:underline flex items-center gap-1 font-medium"
                >
                  <span>Google Cloud Console</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <ol className="text-xs text-slate-600 space-y-1.5 list-decimal list-inside leading-relaxed">
                <li>Create an <strong>OAuth 2.0 Client ID</strong> (Web application) in Google Cloud Console.</li>
                <li>Add this exact Authorized Redirect URI:</li>
              </ol>

              <div className="flex items-center justify-between gap-2 p-2 bg-slate-100 rounded-lg border border-slate-200 text-[11px] font-mono text-slate-800">
                <span className="truncate">{redirectUri}</span>
                <button
                  type="button"
                  onClick={handleCopyUri}
                  className="p-1 rounded hover:bg-slate-200 text-slate-600 transition-colors shrink-0 cursor-pointer"
                  title="Copy Redirect URI"
                >
                  {copiedRedirectUri ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <p className="text-[11px] text-slate-500">
                Paste your <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800">GOOGLE_CLIENT_ID</code> and <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800">GOOGLE_CLIENT_SECRET</code> into <code className="text-slate-800">.env</code> and restart the server.
              </p>
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={() => setShowGoogleModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
