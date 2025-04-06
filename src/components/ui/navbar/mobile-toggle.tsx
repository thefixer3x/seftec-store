
import React from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileToggleProps {
  isOpen: boolean;
  onClick: () => void;
}

const MobileToggle = ({ isOpen, onClick }: MobileToggleProps) => {
  return (
    <div className="md:hidden z-20">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onClick}
        className="p-1 focus:outline-none focus:ring-0"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? (
          <X className="h-5 w-5 text-seftec-navy dark:text-white" />
        ) : (
          <Menu className="h-5 w-5 text-seftec-navy dark:text-white" />
        )}
      </Button>
    </div>
  );
};

export default MobileToggle;
