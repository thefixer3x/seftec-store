import { MainNavItem } from "@/types";

export type SiteConfig = {
  name: string;
  description: string;
  mainNav: MainNavItem[];
};

export const siteConfig = {
  name: "Seftec",
  description: "Disrupting B2B Commerce",
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
      title: "DeFi Leadership",
      href: "/defi-leadership",
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ],
};
