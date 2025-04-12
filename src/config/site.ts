
export type SiteConfig = {
  name: string;
  description: string;
  mainNav: { title: string; href: string }[];
  links: {
    twitter: string;
    github: string;
    docs: string;
  };
};

export const siteConfig: SiteConfig = {
  name: "Seftec",
  description: "Secure Enterprise DeFi Access Platform",
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
      title: "BizTools",
      href: "/biztools",
    },
    {
      title: "BizGenie",
      href: "/bizgenie",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ],
  links: {
    twitter: "https://twitter.com/seftec",
    github: "https://github.com/seftec",
    docs: "https://docs.seftec.com",
  },
};
