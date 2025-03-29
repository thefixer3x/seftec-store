
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
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:text-primary hover:bg-primary/5"
      )}
    >
      <span className={cn("mr-2 h-4 w-4", isActive ? "text-primary" : "")}>{icon}</span>
      {children}
    </Link>
  );
};

export default function AccountSettingsNavigation() {
  return (
    <nav className="space-y-1">
      <NavLink href="/account/profile" icon={<User size={16} />}>
        Profile
      </NavLink>
      <NavLink href="/account/password" icon={<Lock size={16} />}>
        Password
      </NavLink>
      <NavLink href="/account/notifications" icon={<BellRing size={16} />}>
        Notifications
      </NavLink>
      <NavLink href="/account/business" icon={<Building2 size={16} />}>
        Business Details
      </NavLink>
      <NavLink href="/account/banking" icon={<CreditCard size={16} />}>
        Banking Details
      </NavLink>
      <NavLink href="/account/pin" icon={<Fingerprint size={16} />}>
        PIN Settings
      </NavLink>
      <NavLink href="/account/preferences" icon={<Settings size={16} />}>
        Personalization
      </NavLink>
    </nav>
  );
}
