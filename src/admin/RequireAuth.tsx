import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Loader2 } from 'lucide-react';

interface RequireAuthProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, isLoading, hasRole } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        <span className="text-xs font-mono text-slate-400">Verifying security credentials...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    const targetLogin = location.pathname.startsWith('/admin') ? '/admin/login' : '/login';
    return <Navigate to={targetLogin} state={{ from: location }} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0 && !hasRole(allowedRoles)) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center space-y-3">
        <div className="p-3 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold text-sm">
          ACCESS RESTRICTED
        </div>
        <h2 className="text-xl font-bold text-white">Insufficient Role Permissions</h2>
        <p className="text-xs text-slate-400 max-w-sm">
          Your current account role does not have authorization to view this section.
        </p>
      </div>
    );
  }

  return <>{children}</>;
};
