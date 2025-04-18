
import React from "react";
import { Link } from "react-router-dom";
import { Icons } from "@/components/icons";
import { Tooltip } from "@/components/ui/tooltip";

const Logo = () => {
  return (
    <Tooltip content="Return to Homepage">
      <Link to="/" className="flex items-center space-x-2 z-20 transition-opacity hover:opacity-80">
        <Icons.shield className="h-6 w-6 text-seftec-gold dark:text-seftec-teal" />
        <span className="font-bold text-seftec-navy dark:text-white">
          Seftec.<span className="text-seftec-gold dark:text-seftec-teal">Store</span>
        </span>
      </Link>
    </Tooltip>
  );
};

export default Logo;
