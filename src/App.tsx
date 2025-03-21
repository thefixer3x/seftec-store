
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ValuePropositions from "./pages/ValuePropositions";
import NotFound from "./pages/NotFound";
import AuthTest from "./pages/AuthTest";
import Products from "./pages/Products";
import AuthCallback from "./pages/AuthCallback";

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
    <TooltipProvider>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/value-propositions" element={<ValuePropositions />} />
        <Route path="/auth-test" element={<AuthTest />} />
        <Route path="/products" element={<Products />} />
        <Route path="/auth-callback" element={<AuthCallback />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  );
};

export default App;
