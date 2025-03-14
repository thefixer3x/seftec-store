
import React from "react";
import CallToAction from "@/components/ui/call-to-action";

const CTASection: React.FC = () => {
  return (
    <section id="cta" className="py-20 bg-seftec-slate dark:bg-seftec-darkNavy/50">
      <div className="container mx-auto px-6 reveal">
        <CallToAction
          title="Join Our Trusted B2B Marketplace"
          description="Partner with us to revolutionize B2B trade & vendor payments. Start transacting securely today."
          primaryButtonText="Book a Demo"
          secondaryButtonText="Learn More"
        />
      </div>
    </section>
  );
};

export default CTASection;
