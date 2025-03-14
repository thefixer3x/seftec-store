
import React from "react";
import SectionHeading from "@/components/ui/section-heading";
import FeatureCard from "@/components/ui/feature-card";
import { BadgeCheck, Brain, LockKeyhole, Wallet } from "lucide-react";

// Data for the features section
const featuresData = [
  {
    title: 'Verified Buyer & Seller Profiles',
    description: 'All businesses MUST pass KYC/KYB verification before trading on the platform. AI-driven reputation scoring based on transaction history.',
    icon: BadgeCheck
  },
  {
    title: 'Smart Matching & AI Insights',
    description: 'AI-powered buyer-seller matchmaking to drive relevant deals. Predictive pricing insights for better negotiation.',
    icon: Brain
  },
  {
    title: 'Secure Escrow & Trade Financing',
    description: 'Payments released only after compliance checks & buyer satisfaction. Embedded BNPL & working capital financing options for buyers.',
    icon: LockKeyhole
  },
  {
    title: 'Multi-Currency & Cross-Border Payments',
    description: 'Instant settlements through our global payment partnership and cross-border integration. Dynamic FX rates optimization to lower costs.',
    icon: Wallet
  }
];

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-20 dark:bg-seftec-darkNavy">
      <div className="container mx-auto px-6">
        <SectionHeading
          label="Key Features"
          title="AI-Driven B2B Marketplace"
          subtitle="We provide a secure, AI-driven B2B marketplace that enables businesses to connect and transact with confidence."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 reveal">
          {featuresData.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
