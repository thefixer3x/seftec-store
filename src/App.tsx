
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BizTools from "./pages/BizTools";
import Solutions from "./pages/Solutions";
import NotFound from "./pages/NotFound";
import AuthTest from "./pages/AuthTest";
import Products from "./pages/Products";
import AuthCallback from "./pages/AuthCallback";
import Profile from "./pages/Profile";
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
import { CartProvider } from "./context/CartContext";
import { NotificationsProvider } from "./context/NotificationsContext";
import Dashboard from "./pages/Dashboard";
import DashboardContent from "./components/dashboard/DashboardContent";
import WalletTab from "./components/dashboard/WalletTab";
import SettingsTab from "./components/dashboard/SettingsTab";
import AccountLayout from "./components/account/AccountLayout";
import ProfileSettings from "./components/account/ProfileSettings";
import PasswordSettings from "./components/account/PasswordSettings";
import NotificationSettings from "./components/account/NotificationSettings";
import PinSettings from "./components/account/PinSettings";
import BankAccountSettings from "./components/account/BankAccountSettings";
import AccountSubscription from "./components/account/AccountSubscription";

const App = () => {
  useEffect(() => {
    // Check for user's preference in localStorage or use system preference
    const isDark = localStorage.getItem('darkMode') === 'true' || 
                 (!localStorage.getItem('darkMode') && 
                  window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <CartProvider>
      <NotificationsProvider>
        <TooltipProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/biz-tools" element={<BizTools />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/auth-test" element={<AuthTest />} />
            <Route path="/products" element={<Products />} />
            <Route path="/auth-callback" element={<AuthCallback />} />
            
            {/* Profile Routes */}
            <Route path="/profile" element={<Profile />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="wallet" element={<WalletTab />} />
              <Route path="inventory" element={<DashboardContent />} />
              <Route path="bill-payment" element={<DashboardContent />} />
              <Route path="trade-finance" element={<DashboardContent />} />
              
              {/* Account settings nested routes */}
              <Route path="account" element={<AccountLayout />}>
                <Route index element={<ProfileSettings />} />
                <Route path="password" element={<PasswordSettings />} />
                <Route path="notifications" element={<NotificationSettings />} />
                <Route path="pin" element={<PinSettings />} />
                <Route path="bank" element={<BankAccountSettings />} />
                <Route path="subscription" element={<AccountSubscription />} />
              </Route>
              
              <Route path="stores" element={<DashboardContent />} />
              <Route path="marketplace" element={<DashboardContent />} />
              <Route path="invoices" element={<DashboardContent />} />
              <Route path="customers" element={<DashboardContent />} />
              <Route path="transaction" element={<DashboardContent />} />
              <Route path="settings" element={<SettingsTab />} />
              <Route index element={<Dashboard />} />
            </Route>
            
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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
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
