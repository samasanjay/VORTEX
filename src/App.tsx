import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './admin/AuthContext';
import { RequireAuth } from './admin/RequireAuth';

// Public Components & Pages
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

import { HomePage } from './pages/HomePage';
import { WorkPage } from './pages/WorkPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { ProcessPage } from './pages/ProcessPage';
import { TechnologyPage } from './pages/TechnologyPage';
import { AboutPage } from './pages/AboutPage';
import { UIArchivePage } from './pages/UIArchivePage';
import { DesignSystemPage } from './pages/DesignSystemPage';
import { FAQPage } from './pages/FAQPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { RefundPolicyPage } from './pages/RefundPolicyPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AccountPage } from './pages/AccountPage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';
import { VerifyEmailPage } from './pages/auth/VerifyEmailPage';

// Admin Components & Pages
import { AdminLogin } from './admin/AdminLogin';
import { AdminLayout } from './admin/AdminLayout';
import { DashboardOverview } from './admin/DashboardOverview';
import { LeadsManager } from './admin/LeadsManager';
import { LeadDetailPage } from './admin/LeadDetailPage';
import { ProjectsManager } from './admin/ProjectsManager';
import { ProjectEditor } from './admin/ProjectEditor';
import { ServicesManager } from './admin/ServicesManager';
import { ServiceEditor } from './admin/ServiceEditor';
import { TestimonialsManager } from './admin/TestimonialsManager';
import { FAQManager } from './admin/FAQManager';
import { ContentManager } from './admin/ContentManager';
import { SEOManager } from './admin/SEOManager';
import { MediaManager } from './admin/MediaManager';
import { TeamManager } from './admin/TeamManager';
import { AuditLogManager } from './admin/AuditLogManager';
import { SettingsManager } from './admin/SettingsManager';

// Public Layout Wrapper
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white relative font-body antialiased">
    <ScrollToTop />
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ================================================================
              1. PUBLIC CLIENT ROUTES
              ================================================================ */}
          <Route
            path="/"
            element={
              <PublicLayout>
                <HomePage />
              </PublicLayout>
            }
          />
          <Route
            path="/work"
            element={
              <PublicLayout>
                <WorkPage />
              </PublicLayout>
            }
          />
          <Route
            path="/work/:slug"
            element={
              <PublicLayout>
                <ProjectDetailPage />
              </PublicLayout>
            }
          />
          <Route
            path="/services"
            element={
              <PublicLayout>
                <ServicesPage />
              </PublicLayout>
            }
          />
          <Route
            path="/services/:slug"
            element={
              <PublicLayout>
                <ServiceDetailPage />
              </PublicLayout>
            }
          />
          <Route
            path="/process"
            element={
              <PublicLayout>
                <ProcessPage />
              </PublicLayout>
            }
          />
          <Route
            path="/technology"
            element={
              <PublicLayout>
                <TechnologyPage />
              </PublicLayout>
            }
          />
          <Route
            path="/about"
            element={
              <PublicLayout>
                <AboutPage />
              </PublicLayout>
            }
          />
          <Route
            path="/ui-archive"
            element={
              <PublicLayout>
                <UIArchivePage />
              </PublicLayout>
            }
          />
          <Route
            path="/design-system"
            element={
              <PublicLayout>
                <DesignSystemPage />
              </PublicLayout>
            }
          />
          <Route
            path="/faq"
            element={
              <PublicLayout>
                <FAQPage />
              </PublicLayout>
            }
          />
          <Route
            path="/privacy-policy"
            element={
              <PublicLayout>
                <PrivacyPage />
              </PublicLayout>
            }
          />
          <Route
            path="/privacy"
            element={<Navigate to="/privacy-policy" replace />}
          />
          <Route
            path="/terms"
            element={
              <PublicLayout>
                <TermsPage />
              </PublicLayout>
            }
          />
          <Route
            path="/refund-policy"
            element={
              <PublicLayout>
                <RefundPolicyPage />
              </PublicLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <PublicLayout>
                <ContactPage />
              </PublicLayout>
            }
          />

          {/* ================================================================
              2. PUBLIC AUTHENTICATION & USER PORTAL ROUTES
              ================================================================ */}
          <Route
            path="/login"
            element={
              <PublicLayout>
                <LoginPage />
              </PublicLayout>
            }
          />
          <Route
            path="/register"
            element={
              <PublicLayout>
                <RegisterPage />
              </PublicLayout>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicLayout>
                <ForgotPasswordPage />
              </PublicLayout>
            }
          />
          <Route
            path="/reset-password"
            element={
              <PublicLayout>
                <ResetPasswordPage />
              </PublicLayout>
            }
          />
          <Route
            path="/verify-email"
            element={
              <PublicLayout>
                <VerifyEmailPage />
              </PublicLayout>
            }
          />
          <Route
            path="/account"
            element={
              <RequireAuth>
                <PublicLayout>
                  <AccountPage />
                </PublicLayout>
              </RequireAuth>
            }
          />

          {/* ================================================================
              3. ADMIN AUTHENTICATION
              ================================================================ */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* ================================================================
              4. PROTECTED ADMIN OPERATIONS PORTAL
              ================================================================ */}
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <AdminLayout />
              </RequireAuth>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardOverview />} />
            
            {/* CRM */}
            <Route
              path="leads"
              element={
                <RequireAuth allowedRoles={['SUPER_ADMIN', 'ADMIN', 'SALES', 'VIEWER']}>
                  <LeadsManager />
                </RequireAuth>
              }
            />
            <Route
              path="leads/:id"
              element={
                <RequireAuth allowedRoles={['SUPER_ADMIN', 'ADMIN', 'SALES', 'VIEWER']}>
                  <LeadDetailPage />
                </RequireAuth>
              }
            />

            {/* Case Studies CMS */}
            <Route
              path="projects"
              element={
                <RequireAuth allowedRoles={['SUPER_ADMIN', 'ADMIN', 'EDITOR']}>
                  <ProjectsManager />
                </RequireAuth>
              }
            />
            <Route
              path="projects/new"
              element={
                <RequireAuth allowedRoles={['SUPER_ADMIN', 'ADMIN', 'EDITOR']}>
                  <ProjectEditor />
                </RequireAuth>
              }
            />
            <Route
              path="projects/:id/edit"
              element={
                <RequireAuth allowedRoles={['SUPER_ADMIN', 'ADMIN', 'EDITOR']}>
                  <ProjectEditor />
                </RequireAuth>
              }
            />

            {/* Services CMS */}
            <Route
              path="services"
              element={
                <RequireAuth allowedRoles={['SUPER_ADMIN', 'ADMIN', 'EDITOR']}>
                  <ServicesManager />
                </RequireAuth>
              }
            />
            <Route
              path="services/new"
              element={
                <RequireAuth allowedRoles={['SUPER_ADMIN', 'ADMIN', 'EDITOR']}>
                  <ServiceEditor />
                </RequireAuth>
              }
            />
            <Route
              path="services/:id/edit"
              element={
                <RequireAuth allowedRoles={['SUPER_ADMIN', 'ADMIN', 'EDITOR']}>
                  <ServiceEditor />
                </RequireAuth>
              }
            />

            {/* Testimonials & FAQs */}
            <Route
              path="testimonials"
              element={
                <RequireAuth allowedRoles={['SUPER_ADMIN', 'ADMIN', 'EDITOR']}>
                  <TestimonialsManager />
                </RequireAuth>
              }
            />
            <Route
              path="faq"
              element={
                <RequireAuth allowedRoles={['SUPER_ADMIN', 'ADMIN', 'EDITOR']}>
                  <FAQManager />
                </RequireAuth>
              }
            />

            {/* Website Content Blocks & SEO */}
            <Route
              path="content"
              element={
                <RequireAuth allowedRoles={['SUPER_ADMIN', 'ADMIN', 'EDITOR']}>
                  <ContentManager />
                </RequireAuth>
              }
            />
            <Route
              path="seo"
              element={
                <RequireAuth allowedRoles={['SUPER_ADMIN', 'ADMIN', 'EDITOR']}>
                  <SEOManager />
                </RequireAuth>
              }
            />

            {/* Media & Assets */}
            <Route
              path="media"
              element={
                <RequireAuth allowedRoles={['SUPER_ADMIN', 'ADMIN', 'EDITOR']}>
                  <MediaManager />
                </RequireAuth>
              }
            />

            {/* Operations & Security */}
            <Route
              path="team"
              element={
                <RequireAuth allowedRoles={['SUPER_ADMIN', 'ADMIN']}>
                  <TeamManager />
                </RequireAuth>
              }
            />
            <Route
              path="audit-logs"
              element={
                <RequireAuth allowedRoles={['SUPER_ADMIN', 'ADMIN']}>
                  <AuditLogManager />
                </RequireAuth>
              }
            />
            <Route
              path="settings"
              element={
                <RequireAuth allowedRoles={['SUPER_ADMIN']}>
                  <SettingsManager />
                </RequireAuth>
              }
            />
          </Route>

          {/* ================================================================
              4. 404 CATCH-ALL
              ================================================================ */}
          <Route
            path="*"
            element={
              <PublicLayout>
                <NotFoundPage />
              </PublicLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
