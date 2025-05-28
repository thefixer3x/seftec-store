
import React from "react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { SeftecHub } from "@/components/ui/seftec-hub";

const Logo = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <SeftecHub className="z-20" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Return to Homepage</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Logo;
