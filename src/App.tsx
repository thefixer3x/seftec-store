
import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';

// Public pages
import Index from '@/pages/Index';
import About from '@/pages/About';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';
import Solutions from '@/pages/Solutions';
import ValuePropositions from '@/pages/ValuePropositions';
import ResetPassword from '@/pages/ResetPassword';
import BizTools from '@/pages/BizTools';
import FAQ from '@/pages/FAQ';
import ComingSoon from '@/pages/ComingSoon';
import Shop from '@/pages/Shop';
import Cart from '@/pages/Cart';
import Products from '@/pages/Products';
import Orders from '@/pages/Orders';
import BizGenie from '@/pages/BizGenie';
import EdgeFunctionTest from '@/pages/EdgeFunctionTest';
import Terms from '@/pages/Terms';
import Privacy from '@/pages/Privacy';
import Cookies from '@/pages/Cookies';
import Security from '@/pages/Security';

// Protected pages
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';

import { useAuth } from './context/AuthContext';
import { profileRoutes } from './routes/profileRoutes';

function App() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading) {
      // Define public routes that don't require authentication
      const publicRoutes = [
        '/', '/about', '/contact', '/login', '/register', '/reset-password', 
        '/solutions', '/value-propositions', '/faq', '/shop', '/products', 
        '/edge-function-test', '/terms', '/privacy', 
        '/cookies', '/security', '/social-login-test'
      ];
      
      const isPublicRoute = publicRoutes.some(route => 
        location.pathname === route || location.pathname.startsWith(`${route}/`)
      );
      
      // If user is on /defi-leadership route, redirect to home
      if (location.pathname === '/defi-leadership') {
        navigate('/', { replace: true });
        return;
      }
      
      // Handle authentication redirects
      if (user) {
        // If user is logged in and tries to access login/register, redirect to dashboard
        if (location.pathname === '/login' || location.pathname === '/register') {
          navigate('/profile/dashboard');
        }
      } else {
        // If user is not logged in and tries to access protected route, redirect to login
        if (!isPublicRoute) {
          navigate('/login', { 
            state: { from: location.pathname },
            replace: true 
          });
        }
      }
    }
  }, [user, loading, navigate, location.pathname]);

  return (
    <>
      <Routes>
        {/* ===== PUBLIC ROUTES ===== */}
        {/* Main marketing and information pages */}
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/value-propositions" element={<ValuePropositions />} />
        <Route path="/biztools" element={<BizTools />} />
        <Route path="/bizgenie" element={<BizGenie />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        
        {/* E-commerce public pages */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        
        {/* Authentication pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        {/* Legal and policy pages */}
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/security" element={<Security />} />
        
        {/* Testing and development pages */}
        <Route path="/edge-function-test" element={<EdgeFunctionTest />} />
        
        {/* ===== PROTECTED ROUTES ===== */}
        {/* Dashboard routes */}
        <Route path="/dashboard/*" element={<Dashboard />} />
        
        {/* Profile routes imported from profileRoutes.tsx */}
        {profileRoutes}
        
        {/* Fallback route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
