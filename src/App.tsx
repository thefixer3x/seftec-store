import React, { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from '@/components/ui/toaster';
import { useAuth } from './context/AuthContext';
import { profileRoutes } from './routes/profileRoutes';
import { ProtectedLayout } from './components/layout/ProtectedLayout';

/* ─── Core (eager-loaded) ─────────────────────────────────────────── */
import Index from '@/pages/Index';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import NotFound from '@/pages/NotFound';
import TestPage from '@/TestPage';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';

/* ─── Lazy-loaded pages ────────────────────────────────────────────── */
const Solutions = lazy(() => import('@/pages/Solutions'));
const ValuePropositions = lazy(() => import('@/pages/ValuePropositions'));
const ResetPassword = lazy(() => import('@/pages/ResetPassword'));
const BizTools = lazy(() => import('@/pages/BizTools'));
const FAQ = lazy(() => import('@/pages/FAQ'));
const ComingSoon = lazy(() => import('@/pages/ComingSoon'));
const Shop = lazy(() => import('@/pages/Shop'));
const Cart = lazy(() => import('@/pages/Cart'));
const Products = lazy(() => import('@/pages/Products'));
const Orders = lazy(() => import('@/pages/Orders'));
const BizGenie = lazy(() => import('@/pages/BizGenie'));
const EdgeFunctionTest = lazy(() => import('@/pages/EdgeFunctionTest'));
const Terms = lazy(() => import('@/pages/Terms'));
const Privacy = lazy(() => import('@/pages/Privacy'));
const Cookies = lazy(() => import('@/pages/Cookies'));
const Security = lazy(() => import('@/pages/Security'));
const DefiLeadership = lazy(() => import('@/pages/DefiLeadership'));

/* ─── Auth / management (lazy too) ─────────────────────────────────── */
const Auth = lazy(() => import('@/pages/Auth'));
const AuthCallback = lazy(() => import('@/pages/AuthCallback'));
const SessionManagement = lazy(() => import('@/pages/SessionManagement'));
const RoleManagement = lazy(() => import('@/pages/RoleManagement'));

function App() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading) {
      const publicRoutes = [
        '/', '/about', '/contact', '/login', '/register', '/reset-password',
        '/solutions', '/value-propositions', '/faq', '/shop', '/products',
        '/terms', '/privacy', '/cookies', '/security', '/defi-leadership',
        '/coming-soon', '/edge-function-test', '/auth', '/auth-callback'
      ];

      const isPublic = publicRoutes.some(r => location.pathname === r || location.pathname.startsWith(`${r}/`));

      if (user) {
        if (location.pathname === '/login' || location.pathname === '/register') {
          navigate('/profile/dashboard', { replace: true });
        }
      } else if (!isPublic) {
        navigate('/auth', { state: { from: location.pathname }, replace: true });
      }
    }
  }, [user, loading, navigate, location.pathname]);

  return (
    <HelmetProvider>
      <Suspense fallback={
        <div className="flex h-screen items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
        </div>
      }>
        <Routes>
          {/* Debug test route */}
          <Route path="/test" element={<TestPage />} />

          {/* Public marketing */}
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/value-propositions" element={<ValuePropositions />} />
          <Route path="/biztools" element={<BizTools />} />
          <Route path="/bizgenie" element={<BizGenie />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="/defi-leadership" element={<DefiLeadership />} />

          {/* E-commerce */}
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<Products />} />

          {/* Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/auth-callback" element={<AuthCallback />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Legal */}
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/security" element={<Security />} />

          {/* Dev / test */}
          <Route path="/edge-function-test" element={<EdgeFunctionTest />} />

          {/* Protected (wrap or sub-route) */}
          <Route path="/orders" element={<ProtectedLayout><Orders /></ProtectedLayout>} />
          <Route path="/sessions" element={<ProtectedLayout><SessionManagement /></ProtectedLayout>} />
          <Route path="/roles" element={<ProtectedLayout><RoleManagement /></ProtectedLayout>} />

          <Route path="/dashboard/*" element={<ProtectedLayout><Dashboard /></ProtectedLayout>} />

          {/* Nested profile routes */}
          {profileRoutes}

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Toaster />
    </HelmetProvider>
  );
}

export default App;
