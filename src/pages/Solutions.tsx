
import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import BusinessCounter from "@/components/ui/business-counter";
import { useDocumentTitle } from '@/hooks/use-document-title';
import { ShieldCheck, CreditCard, FileSignature, Calculator, Globe, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const solutionsData = [
  {
    id: "verified-marketplace",
    title: "Verified B2B Marketplace",
    tagline: "Trade with confidence on a trusted network",
    icon: <ShieldCheck size={32} />,
    description: "Connect with pre-verified businesses, access company profiles, and build trust through transparent ratings and reviews.",
    features: [
      "KYC-verified business profiles with document validation",
      "Transparent ratings and review system from real transactions",
      "Company background checks and trade history verification",
      "Dispute resolution and arbitration support",
    ],
    benefits: [
      "Reduce counterparty risk by up to 80%",
      "Faster onboarding with pre-verified partners",
      "Build lasting trade relationships with confidence",
    ],
  },
  {
    id: "secure-payments",
    title: "Secure Payment Solutions",
    tagline: "Move money safely across borders",
    icon: <CreditCard size={32} />,
    description: "Multi-currency transactions with escrow protection, instant settlements, and fraud prevention.",
    features: [
      "Escrow-protected transactions for buyer and seller safety",
      "Multi-currency support with competitive FX rates",
      "Instant settlement options for urgent payments",
      "AI-driven fraud detection and prevention",
    ],
    benefits: [
      "Zero chargebacks with escrow protection",
      "Save up to 60% on cross-border transaction fees",
      "24/7 automated fraud monitoring",
    ],
  },
  {
    id: "smart-contracts",
    title: "Smart Contract Automation",
    tagline: "Automate agreements with blockchain security",
    icon: <FileSignature size={32} />,
    description: "Automated workflows for orders, invoices, and agreements with blockchain-backed security.",
    features: [
      "Self-executing contracts triggered by delivery confirmations",
      "Automated invoice generation and reconciliation",
      "Immutable audit trail on distributed ledger",
      "Customizable workflow templates for common trade scenarios",
    ],
    benefits: [
      "Eliminate manual contract management overhead",
      "Reduce settlement disputes by 90%",
      "Full transparency and auditability for compliance",
    ],
  },
  {
    id: "trade-finance",
    title: "Integrated Trade Finance",
    tagline: "Unlock working capital for growth",
    icon: <Calculator size={32} />,
    description: "Access working capital, invoice factoring, and supply chain financing tailored for SMEs.",
    features: [
      "Invoice factoring with same-day funding",
      "Purchase order financing for large orders",
      "Supply chain financing to extend payment terms",
      "Credit assessment powered by transaction data",
    ],
    benefits: [
      "Access capital without traditional collateral requirements",
      "Improve cash flow by up to 45 days",
      "Competitive rates based on your trade performance",
    ],
  },
  {
    id: "global-payments",
    title: "Global Payment Network",
    tagline: "Send and receive payments worldwide",
    icon: <Globe size={32} />,
    description: "Low-cost international transfers with real-time FX rates and multi-currency wallets.",
    features: [
      "Real-time foreign exchange rates with transparent markups",
      "Multi-currency wallets for holding and managing funds",
      "Local payment rail integration across 40+ countries",
      "Scheduled and recurring payment capabilities",
    ],
    benefits: [
      "Save up to 70% compared to traditional bank wires",
      "Receive payments in local currency, anywhere",
      "Instant FX conversion with no hidden fees",
    ],
  },
  {
    id: "ai-matching",
    title: "AI-Powered Matching",
    tagline: "Find ideal trading partners intelligently",
    icon: <Users size={32} />,
    description: "Find ideal trading partners with intelligent recommendations based on your business needs.",
    features: [
      "ML-driven partner recommendations based on trade patterns",
      "Product and service matching across verified suppliers",
      "Market intelligence and demand forecasting",
      "Personalized opportunity alerts and notifications",
    ],
    benefits: [
      "Discover partners 5x faster than manual sourcing",
      "Higher match quality with data-driven recommendations",
      "Stay ahead with predictive market insights",
    ],
  },
];

const Solutions = () => {
  useDocumentTitle('Enterprise Solutions | SEFTEC');
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <MainLayout>
      {/* Hero */}
      <div className="py-16 bg-seftec-navy dark:bg-seftec-darkNavy text-white">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Solutions</h1>
          <p className="text-lg text-white/70 max-w-2xl">
            Enterprise-grade tools designed for modern B2B commerce. Each solution works independently or as part of an integrated platform.
          </p>
        </div>
      </div>

      {/* Solution detail sections */}
      <div className="container mx-auto px-6 py-12 space-y-24">
        {solutionsData.map((solution, index) => (
          <section
            key={solution.id}
            id={solution.id}
            className="scroll-mt-24 grid md:grid-cols-2 gap-10 items-start"
          >
            {/* Info */}
            <div className={index % 2 === 1 ? "md:order-2" : ""}>
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-4">
                {solution.icon}
              </div>
              <h2 className="text-3xl font-bold mb-2">{solution.title}</h2>
              <p className="text-lg text-muted-foreground mb-4">{solution.tagline}</p>
              <p className="mb-6">{solution.description}</p>

              <div className="space-y-2 mb-6">
                <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Key Benefits</h3>
                {solution.benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              <Link to="/auth">
                <Button size="lg">Get Started</Button>
              </Link>
            </div>

            {/* Features card */}
            <div className={`rounded-2xl border bg-card p-8 ${index % 2 === 1 ? "md:order-1" : ""}`}>
              <h3 className="font-semibold mb-4 text-lg">Features</h3>
              <ul className="space-y-4">
                {solution.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      {/* Business Counter */}
      <section className="py-12 bg-seftec-slate dark:bg-seftec-navy/20">
        <div className="container mx-auto px-6">
          <BusinessCounter />
        </div>
      </section>

      {/* CTA */}
      <div className="bg-seftec-navy dark:bg-seftec-darkNavy text-white py-16 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">Ready to transform your B2B operations?</h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Join thousands of businesses already using SEFTEC to streamline trade, payments, and growth.
          </p>
          <Link to="/auth">
            <Button size="lg" variant="secondary">Create Free Account</Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default Solutions;
