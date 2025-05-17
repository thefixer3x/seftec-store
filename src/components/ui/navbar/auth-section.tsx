import React from "react";
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { UserProfileDropdown } from "@/components/auth/UserProfileDropdown";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
interface AuthSectionProps {
  user: any;
}
const AuthSection = ({
  user
}: AuthSectionProps) => {
  const {
    profile
  } = useAuth();
  const isMobile = useIsMobile();
  return <div className="hidden md:flex items-center space-x-2 sm:space-x-4">
      {/* Welcome message for logged in users */}
      {user && <span className="hidden md:inline-block text-sm text-seftec-navy/80 dark:text-white/80">Welcome</span>}
      
      {/* "Guest" message if no user */}
      {!user && <span className="hidden md:inline-block text-sm text-seftec-navy/80 dark:text-white/80">
          Welcome, Guest
        </span>}
      
      {/* Secured by AI Badge */}
      <Link to="/bizgenie" className="group relative overflow-hidden hidden md:flex">
        <div className="hidden md:flex items-center bg-gradient-to-r from-seftec-teal to-seftec-purple rounded-full px-2 sm:px-3 py-1 relative z-10">
          <Shield className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-white" />
          <span className="text-xs sm:text-sm text-white font-medium">Secured by AI</span>
        </div>
        <span className="absolute inset-0 opacity-0 group-hover:opacity-20 group-hover:animate-shimmer bg-white"></span>
      </Link>
      
      {/* Auth Buttons */}
      {!user ? <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="text-xs sm:text-sm bg-gradient-to-r from-seftec-gold to-seftec-gold/80 dark:from-seftec-teal dark:to-seftec-purple text-white" size="sm">
                Get Started
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="z-50 bg-white dark:bg-seftec-darkNavy/90 border-gray-200 dark:border-gray-700">
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
        </div> : <UserProfileDropdown />}
    </div>;
};
export default AuthSection;