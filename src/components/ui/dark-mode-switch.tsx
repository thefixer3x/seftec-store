
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { Label } from "@/components/ui/label";

interface DarkModeSwitchProps {
  className?: string;
  showLabel?: boolean;
}

const DarkModeSwitch: React.FC<DarkModeSwitchProps> = ({ 
  className = "", 
  showLabel = true 
}) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Ensure component doesn't render until after mounted to prevent hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    // Also update local storage for consistency with other components
    localStorage.setItem("darkMode", theme === "dark" ? "false" : "true");
  };

  if (!mounted) return null;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showLabel && (
        <Label htmlFor="dark-mode" className="text-seftec-navy/80 dark:text-white/80 cursor-pointer select-none">
          {theme === "dark" ? "Dark" : "Light"} Mode
        </Label>
      )}
      <div className="flex items-center space-x-2">
        <Sun className="h-4 w-4 text-orange-400 dark:text-white/70" />
        <Switch
          id="dark-mode"
          checked={theme === "dark"}
          onCheckedChange={toggleTheme}
        />
        <Moon className="h-4 w-4 text-seftec-navy/70 dark:text-slate-400" />
      </div>
    </div>
  );
};

export default DarkModeSwitch;
