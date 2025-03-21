
import React from "react";
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { UserProfileDropdown } from "@/components/auth/UserProfileDropdown";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AuthSectionProps {
  user: any;
}

const AuthSection = ({ user }: AuthSectionProps) => {
  return (
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
      <Link to="/value-propositions/bizgenie" className="group relative overflow-hidden">
        <div className="hidden md:flex items-center bg-gradient-to-r from-teal-400 to-purple-500 rounded-full px-3 py-1 relative z-10">
          <Shield className="h-4 w-4 mr-1 text-white" />
          <span className="text-sm text-white font-medium">Secured by AI</span>
        </div>
        <span className="absolute inset-0 opacity-0 group-hover:opacity-20 group-hover:animate-shimmer bg-white"></span>
      </Link>
      
      <ModeToggle />
      
      {/* Auth Buttons */}
      {!user ? (
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-violet-500 text-white" size="sm">
                Get Started
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/login" className="w-full cursor-pointer">
                  Log In
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/register" className="w-full cursor-pointer">
                  Sign Up
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <UserProfileDropdown />
      )}
    </div>
  );
};

export default AuthSection;
