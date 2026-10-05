import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User, LoginPayload, RegisterPayload, UserRole } from '../types/api';
import { api, getAuthToken, setAuthToken } from '../services/api';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  role: UserRole | null;
  isEmailVerified: boolean;
  login: (credentials: LoginPayload) => Promise<{ user: User; token: string }>;
  register: (data: RegisterPayload) => Promise<{ user: User; token: string; verificationUrl?: string; dev_verification_token?: string; dev_verify_url?: string }>;
  logout: () => void;
  refreshSession: () => Promise<User | null>;
  hasRole: (roles: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshSession = useCallback(async (): Promise<User | null> => {
    try {
      const res = await api.getMe();
      const resolvedUser: User = {
        ...res.user,
        role: (res.user.role || res.user.roleId || res.user.role_id || 'PUBLIC_USER') as UserRole,
      };
      setUser(resolvedUser);
      return resolvedUser;
    } catch {
      setAuthToken(null);
      setUser(null);
      return null;
    }
  }, []);

  useEffect(() => {
    // 1. Check if token returned from Google OAuth in URL hash
    if (typeof window !== 'undefined' && window.location.hash.includes('token=')) {
      const hashParams = new URLSearchParams(window.location.hash.replace('#', ''));
      const token = hashParams.get('token');
      if (token) {
        setAuthToken(token);
        // Clean URL hash
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }

    const token = getAuthToken();
    if (!token) {
      // Still try getMe in case HTTP-only cookie exists
      api
        .getMe()
        .then((res) => {
          const resolvedUser: User = {
            ...res.user,
            role: (res.user.role || res.user.roleId || res.user.role_id || 'PUBLIC_USER') as UserRole,
          };
          setUser(resolvedUser);
        })
        .catch(() => {
          setUser(null);
        })
        .finally(() => {
          setIsLoading(false);
        });
      return;
    }

    refreshSession().finally(() => {
      setIsLoading(false);
    });
  }, [refreshSession]);

  const login = async (credentials: LoginPayload): Promise<{ user: User; token: string }> => {
    const res = await api.login(credentials);
    setAuthToken(res.token);
    const resolvedUser: User = {
      ...res.user,
      role: (res.user.role || res.user.roleId || res.user.role_id || 'PUBLIC_USER') as UserRole,
    };
    setUser(resolvedUser);
    return { user: resolvedUser, token: res.token };
  };

  const register = async (
    data: RegisterPayload
  ): Promise<{ user: User; token: string; verificationUrl?: string; dev_verification_token?: string; dev_verify_url?: string }> => {
    const res = await api.register(data);
    setAuthToken(res.token);
    const resolvedUser: User = {
      ...res.user,
      role: (res.user.role || res.user.roleId || res.user.role_id || 'PUBLIC_USER') as UserRole,
    };
    setUser(resolvedUser);
    return {
      user: resolvedUser,
      token: res.token,
      verificationUrl: res.verificationUrl,
      dev_verification_token: res.dev_verification_token,
      dev_verify_url: res.dev_verify_url,
    };
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    api.logout().catch(() => {});
  };

  const hasRole = (roles: string[]): boolean => {
    if (!user) return false;
    const currentRole = user.role || user.roleId || user.role_id;
    if (currentRole === 'SUPER_ADMIN') return true;
    return roles.includes(currentRole || '');
  };

  const roleValue = user ? ((user.role || user.roleId || user.role_id || 'PUBLIC_USER') as UserRole) : null;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        role: roleValue,
        isEmailVerified: Boolean(user?.email_verified || user?.emailVerified),
        login,
        register,
        logout,
        refreshSession,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
