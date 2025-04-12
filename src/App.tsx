
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Index from '@/pages/Index';
import About from '@/pages/About';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';
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
import DefiLeadership from '@/pages/DefiLeadership';
import EdgeFunctionTest from '@/pages/EdgeFunctionTest';
import Terms from '@/pages/Terms';
import Privacy from '@/pages/Privacy';
import Cookies from '@/pages/Cookies';
import Security from '@/pages/Security';
import { useAuth } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';

function App() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (user) {
        // Redirect to dashboard if user is logged in
        if (window.location.pathname === '/login' || window.location.pathname === '/register') {
          navigate('/dashboard');
        }
      } else {
        // Allow access to specific public routes
        const publicRoutes = ['/', '/about', '/contact', '/login', '/register', '/reset-password', '/solutions', 
          '/value-propositions', '/faq', '/shop', '/products', '/defi-leadership', '/edge-function-test',
          '/terms', '/privacy', '/cookies', '/security'];
        if (!publicRoutes.includes(window.location.pathname)) {
          navigate('/login');
        }
      }
    }
  }, [user, loading, navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/profile/*" element={<Profile />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/value-propositions" element={<ValuePropositions />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/biztools" element={<BizTools />} />
        <Route path="/bizgenie" element={<BizGenie />} />
        <Route path="/defi-leadership" element={<DefiLeadership />} />
        <Route path="/edge-function-test" element={<EdgeFunctionTest />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/security" element={<Security />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
