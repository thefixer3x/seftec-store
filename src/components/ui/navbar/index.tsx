
import React, { useState } from "react";
import { MainNavItem } from "@/types";
import { useAuth } from "@/context/AuthContext";
import Logo from "./logo";
import MobileToggle from "./mobile-toggle";
import DesktopNav from "./desktop-nav";
import AuthSection from "./auth-section";
import MobileMenu from "./mobile-menu";

interface MainNavProps {
  items?: MainNavItem[];
}

export function MainNav({ items }: MainNavProps) {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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
        <AuthSection user={user} />
        <MobileMenu 
          items={items} 
          user={user} 
          isOpen={mobileMenuOpen} 
          onClose={closeMobileMenu} 
        />
      </div>
    </div>
  );
}
