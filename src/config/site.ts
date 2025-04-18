
import { MainNavItem } from "@/types";

export type SiteConfig = {
  name: string;
  description: string;
  mainNav: MainNavItem[];
};

export const siteConfig: SiteConfig = {
  name: "SEFTEC",
  description: "Leading enterprise DeFi access platform with ISO 20022 compliant solutions for secure, regulated blockchain integration.",
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
