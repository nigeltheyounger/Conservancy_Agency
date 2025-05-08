import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Public pages
import HomePage from './pages/public/Home';
import AboutPage from './pages/public/About';
import WildlifePage from './pages/public/WildlifePage';
import NewsPage from './pages/public/NewsPage';
import GalleryPage from './pages/public/Gallery';
import VisitPage from './pages/public/VisitPage';
import ContactPage from './pages/public/ContactPage';
import DonatePage from './pages/public/DonatePage';
import SinglePostPage from './pages/public/SinglePostPage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';
import UnauthorizedPage from './pages/public/UnauthorizedPage';

// Shareholder pages
import ShareholderDashboard from './pages/shareholder/Dashboard';
import ShareholderPayments from './pages/shareholder/Payments';
import ShareholderShares from './pages/shareholder/Shares';
import ShareholderNotifications from './pages/shareholder/Notifications';
import ShareholderMessages from './pages/shareholder/Messages';
import ShareholderProfile from './pages/shareholder/Profile';
import ShareholderReports from './pages/shareholder/Reports';

// Admin pages
import AdminContentManager from './pages/admin/ContentManager';
import AdminDashboard from './pages/admin/Dashboard';
import AdminShareholders from './pages/admin/Shareholders';
import AdminPayments from './pages/admin/Payments';

// Layouts
import PublicLayout from './components/layout/PublicLayout';
import ShareholderLayout from './components/layout/ShareholderLayout';
import AdminLayout from './components/layout/AdminLayout';

// Context providers
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/shared/PrivateRoute';

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="wildlife" element={<WildlifePage />} />
              <Route path="news" element={<NewsPage />} />
              <Route path="news/:slug" element={<SinglePostPage />} />
              <Route path="gallery" element={<GalleryPage />} />
              <Route path="visit" element={<VisitPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="donate" element={<DonatePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="unauthorized" element={<UnauthorizedPage />} />
            </Route>

            {/* Shareholder routes */}
            <Route
              path="/shareholder"
              element={
                <PrivateRoute allowedRoles={['user', 'shareholder', 'admin']}>
                  <ShareholderLayout />
                </PrivateRoute>
              }
            >
              <Route index element={<Navigate to="/shareholder/dashboard" replace />} />
              <Route path="dashboard" element={<ShareholderDashboard />} />
              <Route path="payments" element={<ShareholderPayments />} />
              <Route path="shares" element={<ShareholderShares />} />
              <Route path="notifications" element={<ShareholderNotifications />} />
              <Route path="messages" element={<ShareholderMessages />} />
              <Route path="profile" element={<ShareholderProfile />} />
              <Route path="reports" element={<ShareholderReports />} />
            </Route>

            {/* Admin routes */}
            <Route
              path="/admin"
              element={
                <PrivateRoute allowedRoles={['admin']}>
                  <AdminLayout />
                </PrivateRoute>
              }
            >
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="shareholders" element={<AdminShareholders />} />
              <Route path="payments" element={<AdminPayments />} />
              <Route path="content" element={<AdminContentManager />} />
            </Route>

            {/* 404 route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          
          <Toaster position="top-right" />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
