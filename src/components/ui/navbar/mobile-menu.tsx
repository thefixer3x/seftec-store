
import React from "react";
import { Link } from "react-router-dom";
import { Shield, ShoppingCart, ShoppingBag, ListOrdered } from "lucide-react";
import { MainNavItem } from "@/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserProfileDropdown } from "@/components/auth/UserProfileDropdown";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useCart } from "@/context/CartContext";

interface MobileMenuProps {
  items?: MainNavItem[];
  user: any;
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ items, user, isOpen, onClose }: MobileMenuProps) => {
  const { cartCount } = useCart();
  
  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 bg-white dark:bg-seftec-darkNavy z-40 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-4 overflow-y-auto">
        {/* Navigation Links */}
        {items?.length ? (
          <div className="flex flex-col items-center space-y-4 mb-6 w-full">
            {items?.map(
              (item, index) =>
                item.href && (
                  <Link
                    key={index}
                    to={item.href}
                    className={cn(
                      "text-base font-medium text-seftec-navy dark:text-white hover:text-seftec-gold dark:hover:text-seftec-gold transition-colors py-2",
                      item.disabled && "cursor-not-allowed opacity-80"
                    )}
                    onClick={() => {
                      onClose();
                      document.body.style.overflow = '';
                    }}
                  >
                    {item.title}
                  </Link>
                )
            )}
          </div>
        ) : null}
        
        {/* Shop, Cart and Orders Links */}
        <div className="flex flex-col items-center space-y-4 mb-6 w-full">
          <Link
            to="/shop"
            className="flex items-center text-base font-medium text-seftec-navy dark:text-white hover:text-seftec-gold dark:hover:text-seftec-gold transition-colors py-2"
            onClick={onClose}
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
            <span>Shop</span>
          </Link>
          
          <Link
            to="/cart"
            className="flex items-center text-base font-medium text-seftec-navy dark:text-white hover:text-seftec-gold dark:hover:text-seftec-gold transition-colors py-2"
            onClick={onClose}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="ml-2 bg-seftec-gold dark:bg-seftec-teal text-white text-xs rounded-full px-2 py-1">
                {cartCount}
              </span>
            )}
          </Link>
          
          {user && (
            <Link
              to="/orders"
              className="flex items-center text-base font-medium text-seftec-navy dark:text-white hover:text-seftec-gold dark:hover:text-seftec-gold transition-colors py-2"
              onClick={onClose}
            >
              <ListOrdered className="mr-2 h-5 w-5" />
              <span>My Orders</span>
            </Link>
          )}
        </div>
        
        {/* Secured by AI Badge (Mobile) */}
        <Link 
          to="/value-propositions/bizgenie" 
          className="flex items-center bg-gradient-to-r from-teal-400 to-purple-500 rounded-full px-3 py-1 mb-6"
          onClick={onClose}
        >
          <Shield className="h-4 w-4 mr-1 text-white" />
          <span className="text-sm text-white font-medium">Secured by AI</span>
        </Link>
        
        {/* Auth Buttons (Mobile) */}
        {!user ? (
          <div className="flex flex-col space-y-3 w-full max-w-xs">
            <Link to="/login" className="w-full" onClick={onClose}>
              <Button variant="outline" className="w-full">
                Log In
              </Button>
            </Link>
            <Link to="/register" className="w-full" onClick={onClose}>
              <Button className="bg-gradient-to-r from-seftec-gold to-seftec-gold/80 dark:from-seftec-teal dark:to-seftec-purple text-white w-full">
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
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
