
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
        className="p-1"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
};

export default MobileToggle;
