
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  User, 
  Lock, 
  BellRing, 
  Building2, 
  CreditCard, 
  Fingerprint,
  Settings
} from "lucide-react";

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const NavLink = ({ href, icon, children }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === href;
  
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center px-3 py-2 mb-1 rounded-md text-sm font-medium transition-colors",
        isActive
          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800/30 dark:hover:text-gray-200"
      )}
    >
      <span className={cn("mr-2 h-4 w-4", isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400")}>{icon}</span>
      {children}
    </Link>
  );
};

export default function AccountSettingsNavigation() {
  return (
    <nav className="space-y-1">
      <NavLink href="/profile/account" icon={<User size={16} />}>
        Profile
      </NavLink>
      <NavLink href="/profile/account/password" icon={<Lock size={16} />}>
        Password
      </NavLink>
      <NavLink href="/profile/account/notifications" icon={<BellRing size={16} />}>
        Notifications
      </NavLink>
      <NavLink href="/profile/account/business" icon={<Building2 size={16} />}>
        Business Details
      </NavLink>
      <NavLink href="/profile/account/banking" icon={<CreditCard size={16} />}>
        Banking Details
      </NavLink>
      <NavLink href="/profile/account/pin" icon={<Fingerprint size={16} />}>
        PIN Settings
      </NavLink>
      <NavLink href="/profile/account/preferences" icon={<Settings size={16} />}>
        Personalization
      </NavLink>
    </nav>
  );
}
