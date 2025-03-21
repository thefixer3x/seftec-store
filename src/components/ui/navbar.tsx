
import React from "react"
import { Link } from "react-router-dom"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { MainNavItem } from "@/types"
import { UserProfileDropdown } from "../auth/UserProfileDropdown"
import NotificationsPopover from "@/components/notifications/NotificationsPopover";
import { useAuth } from "@/context/AuthContext";

interface MainNavProps {
  items?: MainNavItem[]
}

export function MainNav({ items }: MainNavProps) {
  const { user } = useAuth();
  return (
    <div className="flex gap-6 md:gap-10">
      <Link to="/" className="flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">{siteConfig.name}</span>
      </Link>
      {items?.length ? (
        <nav className="flex gap-6">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  to={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium transition-colors hover:text-foreground sm:text-base",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
      <div className="flex items-center gap-2">
        {user && <NotificationsPopover />}
        <ModeToggle />
        <UserProfileDropdown />
      </div>
    </div>
  )
}
