
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

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={cn(
        "w-9 h-9 rounded-full border-2 transition-all duration-300",
        theme === "dark" 
          ? "bg-seftec-darkNavy border-seftec-teal" 
          : "bg-white border-seftec-gold",
        className
      )}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-seftec-teal/90 hover:text-seftec-teal" />
      ) : (
        <Moon className="h-5 w-5 text-seftec-gold/90 hover:text-seftec-gold" />
      )}
    </Button>
  );
}
