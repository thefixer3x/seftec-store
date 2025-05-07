
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { MainNavItem } from "@/types";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { User } from "@supabase/supabase-js";
import { UserProfileDropdown } from "@/components/auth/UserProfileDropdown";
import { AnimatePresence, motion } from "framer-motion";

interface MobileMenuProps {
  items?: MainNavItem[];
  user?: User | null;
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ items, user, isOpen, onClose }: MobileMenuProps) => {
  if (!items?.length) return null;
  
  // Filter out the DeFi Leadership link if it exists
  const filteredItems = items.filter(item => item.href !== '/defi-leadership');
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 w-3/4 max-w-sm bg-white dark:bg-seftec-darkNavy z-50 md:hidden flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-seftec-navy dark:text-white">Menu</h2>
              <button 
                onClick={onClose} 
                className="p-2 text-seftec-navy dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-auto p-6">
              <div className="flex flex-col space-y-4">
                {filteredItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.href || "#"}
                    className={cn(
                      "px-4 py-2 text-seftec-navy dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors",
                      item.disabled && "pointer-events-none opacity-60"
                    )}
                    onClick={onClose}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 dark:border-gray-800 flex flex-col">
              {user ? (
                <div className="mb-4">
                  <UserProfileDropdown 
                    user={user}
                    mobile={true}
                    onItemClick={onClose} 
                  />
                </div>
              ) : (
                <div className="flex flex-col space-y-3 mb-6">
                  <Link
                    to="/login"
                    className="bg-seftec-navy hover:bg-seftec-navy/90 text-white font-medium py-2 px-4 rounded-md text-center"
                    onClick={onClose}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="border border-seftec-navy text-seftec-navy hover:bg-seftec-navy/5 font-medium py-2 px-4 rounded-md text-center"
                    onClick={onClose}
                  >
                    Create Account
                  </Link>
                </div>
              )}
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-seftec-navy/70 dark:text-white/70">Switch Theme</span>
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
