import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../admin/AuthContext';
import { 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ArrowRight, 
  ShieldCheck,
  Mail
} from 'lucide-react';

export const VerifyEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { refreshSession, isAuthenticated } = useAuth();
  const token = searchParams.get('token') || '';

  const [status, setStatus] = useState<'VERIFYING' | 'SUCCESS' | 'ERROR'>('VERIFYING');
  const [message, setMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    const performVerification = async () => {
      if (!token) {
        setStatus('ERROR');
        setMessage('Missing or invalid email verification token.');
        return;
      }

      try {
        const res = await api.verifyEmail({ token });
        if (isMounted) {
          setStatus('SUCCESS');
          setMessage(res.message || 'Your email address has been verified successfully!');
          if (isAuthenticated) {
            await refreshSession();
          }
        }
      } catch (err: any) {
        if (isMounted) {
          setStatus('ERROR');
          setMessage(err.message || 'Email verification failed. The link may have expired or already been used.');
        }
      }
    };

    performVerification();

    return () => {
      isMounted = false;
    };
  }, [token, isAuthenticated, refreshSession]);

  return (
    <div className="min-h-[calc(100vh-80px)] pt-24 pb-16 flex items-center justify-center px-4 sm:px-6 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        
        {/* Brand Header */}
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
                SECURITY VERIFICATION
              </span>
            </div>
          </Link>
        </div>

        {/* Card Container */}
        <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500" />

          {/* 1. Verifying State */}
          {status === 'VERIFYING' && (
            <div className="space-y-4 py-8 text-center animate-in fade-in">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin mx-auto" />
              <h2 className="text-lg font-bold text-slate-900 font-display">
                Verifying Email Token...
              </h2>
              <p className="text-xs text-slate-600">
                Checking cryptographic signature against server registry.
              </p>
            </div>
          )}

          {/* 2. Success State */}
          {status === 'SUCCESS' && (
            <div className="space-y-6 py-4 text-center animate-in fade-in">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-bold text-slate-900 font-display">
                  Email Verified!
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {message}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-2 text-left">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Your account now has full verified access to all studio capabilities.</span>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                {isAuthenticated ? (
                  <button
                    onClick={() => navigate('/account')}
                    className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Go to My Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <Link
                    to="/login?verified=1"
                    className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Sign In Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* 3. Error State */}
          {status === 'ERROR' && (
            <div className="space-y-6 py-4 text-center animate-in fade-in">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto shadow-inner">
                <AlertCircle className="w-7 h-7" />
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-bold text-slate-900 font-display">
                  Verification Failed
                </h2>
                <p className="text-xs text-rose-700 leading-relaxed">
                  {message}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-2 text-left">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Verification links expire after 24 hours. You can sign in to request a fresh link if needed.</span>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <Link
                  to="/login"
                  className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <span>Return to Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
