
import React from "react";
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { UserProfileDropdown } from "@/components/auth/UserProfileDropdown";

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
  );
};

export default AuthSection;
