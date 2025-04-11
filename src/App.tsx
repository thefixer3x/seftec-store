
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import { profileRoutes } from "./routes/profileRoutes";
import { FeatureFlagProvider } from "@/components/ui/feature-flags/FeatureFlagProvider";
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
import FAQ from "./pages/FAQ";
import ComingSoon from "./components/ui/coming-soon";
import { NotificationsProvider } from "./context/NotificationsContext";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCanceled from "./pages/PaymentCanceled";

interface ComingSoonConfig {
  title: string;
  message: string;
  showNotifyForm?: boolean;
}

const shouldShowComingSoon = () => {
  const hostname = window.location.hostname;
  
  const parts = hostname.split('.');
  if (parts.length > 2) {
    const subdomain = parts[0];
    
    return ['app', 'api', 'dashboard', 'admin'].includes(subdomain);
  }
  
  return false;
};

const getComingSoonConfig = (): ComingSoonConfig => {
  const hostname = window.location.hostname;
  const subdomain = hostname.split('.')[0];
  
  const configs: Record<string, ComingSoonConfig> = {
    app: {
      title: "App Coming Soon",
      message: "Our secure B2B marketplace app is under development and will be launching soon. Sign up to be notified when we go live!",
    },
    api: {
      title: "API Coming Soon",
      message: "Our developer API is under development. Subscribe for updates on documentation and launch dates.",
    },
    dashboard: {
      title: "Dashboard Coming Soon",
      message: "The business dashboard is in final testing and will be available soon.",
    },
    admin: {
      title: "Admin Portal Coming Soon",
      message: "The admin portal is currently under development.",
      showNotifyForm: false,
    }
  };
  
  return configs[subdomain] || {
    title: "Coming Soon",
    message: "This section is under development and will be available shortly.",
    showNotifyForm: true
  };
};

const App = () => {
  if (shouldShowComingSoon()) {
    const comingSoonConfig = getComingSoonConfig();
    
    return (
      <TooltipProvider>
        <ComingSoon 
          title={comingSoonConfig.title}
          message={comingSoonConfig.message}
          showNotifyForm={comingSoonConfig.showNotifyForm !== false}
        />
        <Toaster />
        <Sonner />
      </TooltipProvider>
    );
  }
  
  return (
    <NotificationsProvider>
      <TooltipProvider>
        <Routes>
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
          <Route path="/faq" element={<FAQ />} />
          <Route path="/value-propositions" element={<ValuePropositions />} />
          <Route path="/value-propositions/bizgenie" element={<BizGenie />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-canceled" element={<PaymentCanceled />} />
          
          {profileRoutes}
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </NotificationsProvider>
  );
};

export default App;
