
import React, { useState } from "react";
import { MainNavItem } from "@/types";
import { useAuth } from "@/context/AuthContext";
import Logo from "./logo";
import MobileToggle from "./mobile-toggle";
import DesktopNav from "./desktop-nav";
import AuthSection from "./auth-section";
import MobileMenu from "./mobile-menu";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useIsMobile } from "@/hooks/use-mobile";

interface MainNavProps {
  items?: MainNavItem[];
}

export function MainNav({ items }: MainNavProps) {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
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
  
  return (
    <div className="w-full bg-white dark:bg-seftec-darkNavy py-3 border-b border-gray-100 dark:border-gray-800 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Logo />
        <MobileToggle isOpen={mobileMenuOpen} onClick={toggleMobileMenu} />
        <DesktopNav items={items} />
        <div className="flex items-center gap-4">
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
      
      {/* Add floating theme toggle for profile pages only */}
      {window.location.pathname.includes('/profile') && (
        <ThemeToggle floating={true} />
      )}
    </div>
  );
}
