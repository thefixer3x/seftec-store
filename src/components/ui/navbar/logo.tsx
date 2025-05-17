
import React from "react";
import { Link } from "react-router-dom";
import { Icons } from "@/components/icons";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Logo = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link to="/" className="flex items-center space-x-2 z-20 transition-opacity hover:opacity-80">
            <Icons.shield className="h-6 w-6 text-seftec-gold dark:text-seftec-teal" />
            <span className="font-bold text-seftec-navy dark:text-white">
              SeftecHub
            </span>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>Return to Homepage</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Logo;
