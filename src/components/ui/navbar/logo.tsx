
import React from "react";
import { Link } from "react-router-dom";
import { Icons } from "@/components/icons";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2 z-20">
      <Icons.logo className="h-6 w-6 text-seftec-gold" />
      <span className="font-bold text-seftec-navy dark:text-white">
        Seftec.<span className="text-seftec-gold">Store</span>
      </span>
    </Link>
  );
};

export default Logo;
