
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
    "SEFTEC - Leading enterprise DeFi access platform. ISO 20022 compliant solutions for secure, regulated blockchain integration.",
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
