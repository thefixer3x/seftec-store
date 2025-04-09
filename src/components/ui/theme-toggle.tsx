
import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  floating?: boolean;
}

export function ThemeToggle({ className, floating = false }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait for component to mount to access window
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9"></div>; // Placeholder to prevent layout shift
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "w-9 h-9 rounded-full border-2 shadow-lg transition-all duration-300",
        isDark 
          ? "bg-white border-seftec-teal hover:bg-gray-100" 
          : "bg-seftec-darkNavy border-seftec-gold hover:bg-seftec-darkNavy/80",
        floating ? "fixed bottom-4 right-4 z-50" : "",
        className
      )}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Moon className="h-5 w-5 text-seftec-darkNavy hover:text-seftec-navy" />
      ) : (
        <Sun className="h-5 w-5 text-seftec-gold hover:text-seftec-gold/90 animate-pulse" />
      )}
    </Button>
  );
}
