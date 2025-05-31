
import React from "react";
import { Link } from "react-router-dom";
import { Shield, ShoppingCart, ShoppingBag, ListOrdered, X } from "lucide-react";
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
    <div className="md:hidden fixed inset-0 bg-white dark:bg-seftec-darkNavy z-50 flex flex-col">
      {/* Header with close button */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-seftec-navy dark:text-white">Menu</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-seftec-navy dark:text-white"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-1">
          {/* Navigation Links */}
          {items?.length ? (
            <div className="space-y-1 mb-6">
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-3">
                Navigation
              </div>
              {items?.map(
                (item, index) =>
                  item.href && (
                    <Link
                      key={index}
                      to={item.href}
                      className={cn(
                        "mobile-menu-item flex items-center px-3 py-3 text-base font-medium text-seftec-navy dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors",
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
          <div className="space-y-1 mb-6">
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-3">
              Shopping
            </div>
            <Link
              to="/shop"
              className="mobile-menu-item flex items-center px-3 py-3 text-base font-medium text-seftec-navy dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors"
              onClick={onClose}
            >
              <ShoppingBag className="mr-3 h-5 w-5" />
              <span>Shop</span>
            </Link>
            
            <Link
              to="/cart"
              className="mobile-menu-item flex items-center px-3 py-3 text-base font-medium text-seftec-navy dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors"
              onClick={onClose}
            >
              <ShoppingCart className="mr-3 h-5 w-5" />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="ml-auto bg-seftec-gold dark:bg-seftec-teal text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {user && (
              <Link
                to="/orders"
                className="mobile-menu-item flex items-center px-3 py-3 text-base font-medium text-seftec-navy dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors"
                onClick={onClose}
              >
                <ListOrdered className="mr-3 h-5 w-5" />
                <span>My Orders</span>
              </Link>
            )}
          </div>
          
          {/* Secured by AI Badge */}
          <div className="mb-6 px-3">
            <Link 
              to="/value-propositions/bizgenie" 
              className="flex items-center justify-center bg-gradient-to-r from-teal-400 to-purple-500 rounded-lg px-4 py-3 w-full"
              onClick={onClose}
            >
              <Shield className="h-4 w-4 mr-2 text-white" />
              <span className="text-sm text-white font-medium">Secured by AI</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer with auth and theme toggle */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-4">
        {/* Auth Section */}
        {!user ? (
          <div className="space-y-3">
            <Link to="/login" className="w-full block" onClick={onClose}>
              <Button variant="outline" className="w-full">
                Log In
              </Button>
            </Link>
            <Link to="/register" className="w-full block" onClick={onClose}>
              <Button className="bg-gradient-to-r from-seftec-gold to-seftec-gold/80 dark:from-seftec-teal dark:to-seftec-purple text-white w-full">
                Get Started
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-center">
              <span className="text-sm text-gray-600 dark:text-white/80 block mb-2">
                Welcome, {user.email?.split('@')[0] || 'Guest'}
              </span>
              <UserProfileDropdown />
            </div>
          </div>
        )}
        
        {/* Theme Toggle */}
        <div className="flex justify-center pt-2">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
