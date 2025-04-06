
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import { profileRoutes } from "./routes/profileRoutes";
import Index from "./pages/Index";
import BizTools from "./pages/BizTools";
import Solutions from "./pages/Solutions";
import NotFound from "./pages/NotFound";
import AuthTest from "./pages/AuthTest";
import Products from "./pages/Products";
import AuthCallback from "./pages/AuthCallback";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import ResetPassword from "./pages/ResetPassword";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ValuePropositions from "./pages/ValuePropositions";
import BizGenie from "./pages/BizGenie";
import ComingSoon from "./pages/ComingSoon";
import { CartProvider } from "./context/CartContext";
import { NotificationsProvider } from "./context/NotificationsContext";

// Helper function to determine if we should show Coming Soon page
const shouldShowComingSoon = () => {
  const hostname = window.location.hostname;
  
  // Check if we're on a subdomain
  const parts = hostname.split('.');
  if (parts.length > 2) {
    const subdomain = parts[0];
    
    // app.seftec.store should show coming soon during phased deployment
    if (subdomain === 'app') {
      return true;
    }
    
    // api.seftec.store should normally redirect to API docs, but during dev might show coming soon
    if (subdomain === 'api' && process.env.NODE_ENV === 'development') {
      return true;
    }
  }
  
  return false;
};

const App = () => {
  // For the phased deployment, show coming soon on certain subdomains
  if (shouldShowComingSoon()) {
    return (
      <TooltipProvider>
        <Routes>
          <Route path="*" element={<ComingSoon />} />
        </Routes>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    );
  }
  
  return (
    <CartProvider>
      <NotificationsProvider>
        <TooltipProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/biz-tools" element={<BizTools />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/auth-test" element={<AuthTest />} />
            <Route path="/products" element={<Products />} />
            <Route path="/auth-callback" element={<AuthCallback />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/value-propositions" element={<ValuePropositions />} />
            <Route path="/value-propositions/bizgenie" element={<BizGenie />} />
            
            {/* Include both account and profile routes */}
            {profileRoutes}
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </NotificationsProvider>
    </CartProvider>
  );
};

export default App;
