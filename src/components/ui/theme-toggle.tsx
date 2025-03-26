
import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait for component to mount to access window
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9"></div>; // Placeholder to prevent layout shift
  }

  const isDark = theme === "dark";

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "w-9 h-9 rounded-full border-2 fixed bottom-4 right-4 z-50 shadow-lg transition-all duration-300",
        isDark 
          ? "bg-seftec-darkNavy border-seftec-teal hover:bg-seftec-darkNavy/80" 
          : "bg-white border-seftec-gold hover:bg-gray-100",
        className
      )}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-seftec-teal hover:text-seftec-teal animate-pulse" />
      ) : (
        <Moon className="h-5 w-5 text-seftec-gold hover:text-seftec-gold" />
      )}
    </Button>
  );
}
