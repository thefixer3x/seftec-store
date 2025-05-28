
import React from "react";
import SectionHeading from "@/components/ui/section-heading";
import FeatureCard from "@/components/ui/feature-card";
import { BadgeCheck, Brain, LockKeyhole, Wallet, FileText, Building, TrendingUp, Shield } from "lucide-react";

// Data for the features section
const featuresData = [
  {
    title: 'Verified Buyer & Seller Profiles',
    description: 'All businesses MUST pass KYC/KYB verification before trading on the platform. AI-driven reputation scoring based on transaction history with instant settlement for verified businesses.',
    icon: BadgeCheck
  },
  {
    title: 'Smart Matching & AI Insights',
    description: 'AI-powered buyer-seller matchmaking with global business practices awareness. Predictive pricing insights, risk analytics, and compliance monitoring for better decision-making.',
    icon: Brain
  },
  {
    title: 'Secure Escrow & Trade Financing',
    description: 'Payments released only after compliance checks & buyer satisfaction. Multiple vendor trade finance offers with competitive rates (4-6%) and embedded BNPL solutions.',
    icon: LockKeyhole
  },
  {
    title: 'Multi-Currency & DeFi Payments',
    description: 'Instant settlements through global payment partnerships and DeFi integration. Dynamic FX rates optimization with open banking solutions to lower costs.',
    icon: Wallet
  },
  {
    title: 'Business Strategy & Planning',
    description: 'AI-powered business plan review, drafting, and strategic planning services. In-depth cashflow management and working capital optimization tools.',
    icon: FileText
  },
  {
    title: 'Global Business Registration',
    description: 'Multi-country business incorporation support for US, UK & EU markets. Complete regulatory alignment and compliance assistance for Pro users.',
    icon: Building
  },
  {
    title: 'Advanced Financial Analytics',
    description: 'Comprehensive financial dashboard with real-time insights, market trends analysis, and performance metrics to drive business growth.',
    icon: TrendingUp
  },
  {
    title: 'Enterprise-Grade Security',
    description: 'Global standard compliance with advanced risk analytics. Context-aware AI monitoring for fraud prevention and regulatory adherence.',
    icon: Shield
  }
];

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-20 dark:bg-seftec-darkNavy">
      <div className="container mx-auto px-6">
        <SectionHeading
          label="Key Features"
          title="AI-Driven B2B Marketplace"
          subtitle="We provide a comprehensive, AI-driven B2B marketplace that enables businesses to connect, transact, and grow with confidence across global markets."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 reveal">
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
        
        <div className="mt-12 text-center">
          <p className="text-lg text-seftec-navy/80 dark:text-white/80 font-medium mb-2">
            Powered by Advanced Technology
          </p>
          <p className="text-sm text-seftec-navy/60 dark:text-white/60">
            Decentralized Finance (DeFi) • Open Banking • ISO 20022 Compliance • Global Standards • Enterprise Security
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
