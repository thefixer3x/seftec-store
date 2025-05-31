
import React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileToggleProps {
  isOpen: boolean;
  onClick: () => void;
}

const MobileToggle = ({ isOpen, onClick }: MobileToggleProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className="md:hidden text-seftec-navy dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <Menu className="h-5 w-5" />
    </Button>
  );
};

export default MobileToggle;
