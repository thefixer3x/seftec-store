
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { MainNavItem } from "@/types";

interface DesktopNavProps {
  items?: MainNavItem[];
}

const DesktopNav = ({ items }: DesktopNavProps) => {
  const location = useLocation();
  
  if (!items?.length) return null;
  
  return (
    <nav className="hidden md:flex items-center justify-center flex-1 mx-4">
      <div className="flex items-center space-x-8">
        {items.map(
          (item, index) =>
            item.href && (
              <Link
                key={index}
                to={item.href}
                className={cn(
                  "text-gray-600 hover:text-seftec-navy dark:text-white/90 dark:hover:text-white transition-colors",
                  location.pathname === item.href && "font-medium text-seftec-navy dark:text-white",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                {item.title}
              </Link>
            )
        )}
        <Link
          to="/defi-leadership"
          className={cn(
            "text-gray-600 hover:text-seftec-navy dark:text-white/90 dark:hover:text-white transition-colors",
            location.pathname === "/defi-leadership" && "font-medium text-seftec-navy dark:text-white"
          )}
        >
          DeFi Leadership
        </Link>
      </div>
    </nav>
  );
};

export default DesktopNav;
