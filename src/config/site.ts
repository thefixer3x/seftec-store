
import { MainNavItem } from "@/types";

export type SiteConfig = {
  name: string;
  description: string;
  mainNav: MainNavItem[];
  links: {
    twitter: string;
    github: string;
    docs: string;
  };
};

export const siteConfig: SiteConfig = {
  name: "SEFTEC",
  description:
    "SEFTEC - Transform your business with innovative marketplace solutions, secure payments, and cutting-edge technology.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Solutions",
      href: "/solutions",
    },
    {
      title: "Enterprise DeFi",
      href: "/defi-leadership",
    },
    {
      title: "About Us",
      href: "/about",
    },
  ],
  links: {
    twitter: "https://twitter.com/seftecs",
    github: "https://github.com/seftec",
    docs: "https://docs.seftec.tech",
  },
};
