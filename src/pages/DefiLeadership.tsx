
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { MainNav } from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import DefiHero from "@/components/defi-leadership/DefiHero";
import DefiTabs from "@/components/defi-leadership/DefiTabs";

const DefiLeadership = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>DeFi Leadership | SEFTEC</title>
        <meta name="description" content="Discover SEFTEC's leadership in decentralized finance (DeFi). Learn about our secure enterprise DeFi access platform, ISO 20022 compliance, and strategic roadmap." />
        <meta name="keywords" content="SEFTEC, DeFi, decentralized finance, ISO 20022, blockchain, enterprise DeFi, secure access" />
        <meta property="og:title" content="DeFi Leadership | SEFTEC" />
        <meta property="og:description" content="Discover SEFTEC's leadership in decentralized finance (DeFi). Learn about our secure enterprise DeFi access platform, ISO 20022 compliance, and strategic roadmap." />
        <meta property="og:image" content="/lovable-uploads/5ebd209e-ea30-4635-8e7c-3389b373f503.png" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="flex min-h-screen flex-col">
        <MainNav items={[
          { title: "Home", href: "/" },
          { title: "DeFi Leadership", href: "/defi-leadership" },
          { title: "Shop", href: "/shop" },
          { title: "About", href: "/about" },
          { title: "Contact", href: "/contact" }
        ]} />
        
        <DefiHero />
        <main className="flex-1">
          <DefiTabs />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default DefiLeadership;
