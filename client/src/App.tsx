import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { SettingsProvider } from './context/SettingsContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { TrackEnquiryModal } from './components/TrackEnquiryModal';
import { QuoteModal } from './components/ui/QuoteModal';

// Public Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProductsPage } from './pages/ProductsPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { ContactPage } from './pages/ContactPage';

// Admin Pages
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminEnquiriesPage } from './pages/admin/AdminEnquiriesPage';
import { AdminAppointmentsPage } from './pages/admin/AdminAppointmentsPage';
import { AdminReviewsPage } from './pages/admin/AdminReviewsPage';
import { AdminProductsPage } from './pages/admin/AdminProductsPage';
import { AdminServicesPage } from './pages/admin/AdminServicesPage';
import { AdminProjectsPage } from './pages/admin/AdminProjectsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

// Scroll to top on navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Protected Route for Admin
const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-ink-900 flex items-center justify-center text-champagne-500 text-xs font-mono">
        Verifying administrative credentials...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

// Main Public Layout (100% Full Width, Edge-to-Edge)
const PublicLayout: React.FC = () => {
  const [trackModalOpen, setTrackModalOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-ink-900 text-ivory-100 overflow-x-hidden">
      <Navbar
        onOpenTrackModal={() => setTrackModalOpen(true)}
        onOpenQuoteModal={() => setQuoteModalOpen(true)}
      />
      <main className="flex-grow w-full overflow-x-hidden">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/systems" element={<ProductsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/engineering" element={<ServicesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/gallery" element={<ProjectsPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <TrackEnquiryModal
        isOpen={trackModalOpen}
        onClose={() => setTrackModalOpen(false)}
      />
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <SettingsProvider>
        <AuthProvider>
          <Routes>
            {/* Admin Login Route */}
            <Route path="/admin/login" element={<AdminLoginPage />} />

            {/* Protected Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedAdminRoute>
                  <AdminLayout />
                </ProtectedAdminRoute>
              }
            >
              <Route index element={<AdminDashboardPage />} />
              <Route path="enquiries" element={<AdminEnquiriesPage />} />
              <Route path="appointments" element={<AdminAppointmentsPage />} />
              <Route path="reviews" element={<AdminReviewsPage />} />
              <Route path="products" element={<AdminProductsPage />} />
              <Route path="services" element={<AdminServicesPage />} />
              <Route path="projects" element={<AdminProjectsPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
            </Route>

            {/* Public Layout Routes */}
            <Route path="/*" element={<PublicLayout />} />
          </Routes>
        </AuthProvider>
      </SettingsProvider>
    </BrowserRouter>
  );
}
