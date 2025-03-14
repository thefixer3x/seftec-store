
import React, { useEffect } from "react";
import Navbar from "@/components/ui/navbar";
import HeroSection from "@/components/ui/hero-section";
import SectionHeading from "@/components/ui/section-heading";
import FeatureCard from "@/components/ui/feature-card";
import CallToAction from "@/components/ui/call-to-action";
import Footer from "@/components/ui/footer";
import { 
  ShieldCheck, 
  Handshake, 
  Rocket, 
  Globe, 
  BadgeCheck, 
  Brain, 
  LockKeyhole, 
  Wallet, 
  Languages, 
  Building, 
  CheckCircle2 
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Index = () => {
  // Add scroll reveal effect
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    
    const reveal = () => {
      revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
          el.classList.add('active');
        }
      });
    };
    
    window.addEventListener('scroll', reveal);
    reveal(); // Initial check
    
    return () => window.removeEventListener('scroll', reveal);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Navbar />
      
      <HeroSection />
      
      {/* Problems Section */}
      <section id="problems" className="py-20 bg-seftec-slate">
        <div className="container mx-auto px-6">
          <SectionHeading
            label="The Challenge"
            title="Challenges in B2B Trade"
            subtitle="Businesses face significant obstacles that limit their growth potential and efficiency in global trade."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 reveal">
            {problemsData.map((problem, index) => (
              <Card key={index} className="p-8 bg-white border border-seftec-slate hover:shadow-apple transition-all duration-500 animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-seftec-navy/10">
                    {problem.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-seftec-navy mb-2">{problem.title}</h3>
                    <p className="text-seftec-navy/70">{problem.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20">
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
      
      {/* Solutions Section */}
      <section id="solutions" className="py-20 bg-seftec-slate">
        <div className="container mx-auto px-6">
          <SectionHeading
            label="Our Solutions"
            title="Seamless Access for Every Business"
            subtitle="Use-case driven marketplace options tailored to your business needs."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 max-w-5xl mx-auto reveal">
            {solutionsData.map((solution, index) => (
              <div 
                key={index} 
                className="relative animate-fade-up" 
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-white p-8 rounded-2xl shadow-apple hover:shadow-apple-hover transition-all duration-500">
                  <div className="absolute -top-6 left-8 bg-seftec-navy text-white p-3 rounded-lg shadow-lg">
                    {solution.icon}
                  </div>
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-seftec-navy mb-3">{solution.title}</h3>
                    <p className="text-seftec-navy/70 mb-6">{solution.description}</p>
                    <Button 
                      variant="outline" 
                      className="border-seftec-navy text-seftec-navy hover:bg-seftec-navy hover:text-white transition-all duration-300 custom-btn"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Competitive Advantage */}
      <section id="advantages" className="py-20">
        <div className="container mx-auto px-6">
          <SectionHeading
            label="Why Choose Us"
            title="Competitive Advantage"
            subtitle="Our marketplace stands out with unique features designed to make B2B trade secure, efficient, and profitable."
          />
          
          <div className="max-w-4xl mx-auto reveal">
            {advantagesData.map((advantage, index) => (
              <div 
                key={index} 
                className="flex items-start gap-4 mb-8 animate-fade-up" 
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-2 bg-seftec-navy rounded-full text-white flex-shrink-0">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-seftec-navy mb-2">{advantage.title}</h3>
                  <p className="text-seftec-navy/70">{advantage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section id="cta" className="py-20 bg-seftec-slate">
        <div className="container mx-auto px-6 reveal">
          <CallToAction
            title="Join Our Trusted B2B Marketplace"
            description="Partner with us to revolutionize B2B trade & vendor payments. Start transacting securely today."
            primaryButtonText="Book a Demo"
            secondaryButtonText="Learn More"
          />
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

// Data for the problems section
const problemsData = [
  {
    title: 'Lack of Trust',
    description: 'Businesses struggle with unverified buyers and sellers, making it difficult to establish reliable trading relationships.',
    icon: <ShieldCheck className="text-seftec-navy" size={24} />
  },
  {
    title: 'Payment Uncertainty',
    description: 'Delayed or fraudulent transactions limit business growth and create unnecessary financial risks.',
    icon: <Wallet className="text-seftec-navy" size={24} />
  },
  {
    title: 'Manual Trade Processes',
    description: 'Slow onboarding, negotiation, and contract execution waste valuable time and resources.',
    icon: <Building className="text-seftec-navy" size={24} />
  },
  {
    title: 'Trade Financing Gaps',
    description: 'Lack of trade financing options for SMEs limits their ability to take on larger opportunities.',
    icon: <Wallet className="text-seftec-navy" size={24} />
  },
  {
    title: 'Cross-Border Challenges',
    description: 'SMEs face high fees & delays in international payments, hindering global expansion.',
    icon: <Globe className="text-seftec-navy" size={24} />
  },
  {
    title: 'Limited Market Access',
    description: 'Difficulty finding and connecting with relevant global trading partners.',
    icon: <Handshake className="text-seftec-navy" size={24} />
  }
];

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

// Data for the solutions section
const solutionsData = [
  {
    title: 'Self-Serve Trading Platform',
    description: 'Businesses list & negotiate deals independently with our secure transaction infrastructure.',
    icon: <Rocket size={24} />
  },
  {
    title: 'Managed Trade Services',
    description: 'AI-Matching for verified buyers & sellers with personalized support.',
    icon: <Handshake size={24} />
  },
  {
    title: 'Enterprise White-Label Solutions',
    description: 'Large businesses create branded B2B platforms leveraging our technology.',
    icon: <Building size={24} />
  },
  {
    title: 'API-Integrated Trade Finance',
    description: 'Businesses access financing on-demand through our integrated financial services.',
    icon: <Wallet size={24} />
  }
];

// Data for the advantages section
const advantagesData = [
  {
    title: 'First AI-Powered B2B Trade Hub',
    description: 'Smart analytics drive better deals and match businesses with ideal trading partners.'
  },
  {
    title: 'Escrow & Secure Payments',
    description: 'Eliminates fraud & transaction disputes with protected payment processing.'
  },
  {
    title: 'Integrated Cross-Border Payments',
    description: 'Instant vendor payouts worldwide with optimized exchange rates and low fees.'
  },
  {
    title: 'KYC/KYB Verified Network',
    description: 'Only legitimate businesses trade, creating a trusted marketplace environment.'
  },
  {
    title: 'Built-in Financing Solutions',
    description: 'Trade now, pay later with flexible financing options for growing businesses.'
  }
];

export default Index;
