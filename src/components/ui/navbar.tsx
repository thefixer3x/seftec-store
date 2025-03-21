
import React from "react"
import { Link } from "react-router-dom"
import { Shield } from "lucide-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { MainNavItem } from "@/types"
import { UserProfileDropdown } from "../auth/UserProfileDropdown"
import { useAuth } from "@/context/AuthContext"

interface MainNavProps {
  items?: MainNavItem[]
}

export function MainNav({ items }: MainNavProps) {
  const { user } = useAuth();
  
  return (
    <div className="w-full bg-white dark:bg-seftec-darkNavy py-3 border-b border-gray-100 dark:border-gray-800">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <Icons.logo className="h-6 w-6 text-seftec-gold" />
          <span className="font-bold text-seftec-navy dark:text-white">Seftec.<span className="text-seftec-gold">Store</span></span>
        </Link>
        
        {/* Navigation Links - Center aligned */}
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
        
        {/* Right Side - Authentication */}
        <div className="flex items-center space-x-4">
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
      </div>
    </div>
  )
}
