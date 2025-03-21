
import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, Shield, X } from "lucide-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { MainNavItem } from "@/types"
import { UserProfileDropdown } from "../auth/UserProfileDropdown"
import { useAuth } from "@/context/AuthContext"
import { useIsMobile } from "@/hooks/use-mobile"

interface MainNavProps {
  items?: MainNavItem[]
}

export function MainNav({ items }: MainNavProps) {
  const { user } = useAuth();
  const isMobile = useIsMobile();
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
  
  return (
    <div className="w-full bg-white dark:bg-seftec-darkNavy py-3 border-b border-gray-100 dark:border-gray-800 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 z-20">
          <Icons.logo className="h-6 w-6 text-seftec-gold" />
          <span className="font-bold text-seftec-navy dark:text-white">Seftec.<span className="text-seftec-gold">Store</span></span>
        </Link>
        
        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden z-20">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleMobileMenu}
            className="p-1"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
        
        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex items-center justify-center flex-1 mx-4">
          {items?.length ? (
            <div className="flex items-center space-x-8">
              {items?.map(
                (item, index) =>
                  item.href && (
                    <Link
                      key={index}
                      to={item.href}
                      className={cn(
                        "text-gray-600 hover:text-seftec-navy dark:text-white/90 dark:hover:text-white transition-colors",
                        item.disabled && "cursor-not-allowed opacity-80"
                      )}
                    >
                      {item.title}
                    </Link>
                  )
              )}
            </div>
          ) : null}
        </nav>
        
        {/* Right Side - Authentication (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Welcome message for logged in users */}
          {user && (
            <span className="hidden md:inline-block text-gray-600 dark:text-white/80">
              Welcome, {user.email?.split('@')[0] || 'Guest'}
            </span>
          )}
          
          {/* "Guest" message if no user */}
          {!user && (
            <span className="hidden md:inline-block text-gray-600 dark:text-white/80">
              Welcome, Guest
            </span>
          )}
          
          {/* Secured by AI Badge */}
          <div className="hidden md:flex items-center bg-gradient-to-r from-teal-400 to-purple-500 rounded-full px-3 py-1">
            <Shield className="h-4 w-4 mr-1 text-white" />
            <span className="text-sm text-white font-medium">Secured by AI</span>
          </div>
          
          <ModeToggle />
          
          {/* Auth Buttons */}
          {!user ? (
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Log In
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-gradient-to-r from-blue-500 to-violet-500 text-white" size="sm">
                  Get Started
                </Button>
              </Link>
            </div>
          ) : (
            <UserProfileDropdown />
          )}
        </div>
        
        {/* Mobile Menu (Full Screen Overlay) */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-white dark:bg-seftec-darkNavy z-40 flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-center p-4 overflow-y-auto">
              {/* Navigation Links */}
              {items?.length ? (
                <div className="flex flex-col items-center space-y-6 mb-8 w-full">
                  {items?.map(
                    (item, index) =>
                      item.href && (
                        <Link
                          key={index}
                          to={item.href}
                          className={cn(
                            "text-lg font-medium text-seftec-navy dark:text-white hover:text-seftec-gold dark:hover:text-seftec-gold transition-colors",
                            item.disabled && "cursor-not-allowed opacity-80"
                          )}
                          onClick={() => {
                            setMobileMenuOpen(false);
                            document.body.style.overflow = '';
                          }}
                        >
                          {item.title}
                        </Link>
                      )
                  )}
                </div>
              ) : null}
              
              {/* Secured by AI Badge (Mobile) */}
              <div className="flex items-center bg-gradient-to-r from-teal-400 to-purple-500 rounded-full px-3 py-1 mb-6">
                <Shield className="h-4 w-4 mr-1 text-white" />
                <span className="text-sm text-white font-medium">Secured by AI</span>
              </div>
              
              {/* Auth Buttons (Mobile) */}
              {!user ? (
                <div className="flex flex-col space-y-3 w-full max-w-xs">
                  <Link to="/login" className="w-full" onClick={() => {
                    setMobileMenuOpen(false);
                    document.body.style.overflow = '';
                  }}>
                    <Button variant="outline" className="w-full">
                      Log In
                    </Button>
                  </Link>
                  <Link to="/register" className="w-full" onClick={() => {
                    setMobileMenuOpen(false);
                    document.body.style.overflow = '';
                  }}>
                    <Button className="bg-gradient-to-r from-blue-500 to-violet-500 text-white w-full">
                      Get Started
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col items-center mb-6">
                  <span className="text-gray-600 dark:text-white/80 mb-4">
                    Welcome, {user.email?.split('@')[0] || 'Guest'}
                  </span>
                  <UserProfileDropdown />
                </div>
              )}
              
              {/* Dark Mode Toggle (Mobile) */}
              <div className="mt-8">
                <ModeToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
