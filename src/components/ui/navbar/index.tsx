
import React, { useState, useEffect } from "react";
import { MainNavItem } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import Logo from "./logo";
import MobileToggle from "./mobile-toggle";
import { DesktopNav } from "./desktop-nav";
import AuthSection from "./auth-section";
import MobileMenu from "./mobile-menu";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useIsMobile } from "@/hooks/use-mobile";
import { ShoppingCart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface MainNavProps {
  items?: MainNavItem[];
}

export function MainNav({ items }: MainNavProps) {
  const { user } = useAuth();
  const { cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    
    // Prevent body scrolling when menu is open
    if (!mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };
  
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = '';
  };
  
  // Check if current path is a profile page
  const [isProfilePage, setIsProfilePage] = useState(false);
  
  useEffect(() => {
    const checkPathAndUpdateState = () => {
      setIsProfilePage(location.pathname.includes('/profile'));
    };
    
    // Check on initial load and when location changes
    checkPathAndUpdateState();
  }, [location.pathname]);
  
  return (
    <div className="w-full bg-white dark:bg-seftec-darkNavy py-3 border-b border-gray-100 dark:border-gray-800 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Logo />
        <MobileToggle isOpen={mobileMenuOpen} onClick={toggleMobileMenu} />
        <DesktopNav />
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative">
            <ShoppingCart className="h-5 w-5 text-gray-600 dark:text-white/90 hover:text-seftec-navy dark:hover:text-white transition-colors" />
            {cartCount > 0 && (
              <Badge className="absolute -top-2 -right-2 px-1.5 h-5 min-w-5 flex items-center justify-center bg-seftec-gold dark:bg-seftec-teal text-white text-xs rounded-full">
                {cartCount > 99 ? '99+' : cartCount}
              </Badge>
            )}
          </Link>
          <ThemeToggle className="static bottom-auto right-auto" />
          <AuthSection user={user} />
        </div>
        <MobileMenu 
          items={items} 
          user={user} 
          isOpen={mobileMenuOpen} 
          onClose={closeMobileMenu} 
        />
      </div>
      
      {/* Add floating theme toggle for profile pages only when not in mobile view */}
      {isProfilePage && !isMobile && (
        <ThemeToggle floating={true} />
      )}
    </div>
  );
}
