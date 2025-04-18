
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What is Seftec.Store's B2B marketplace?",
    answer: "Seftec.Store is a secure enterprise DeFi access platform that enables businesses to connect and trade with verified partners worldwide. We provide ISO 20022 compliant solutions for seamless integration with traditional banking systems."
  },
  {
    question: "How does the platform ensure security?",
    answer: "We implement multiple layers of security including hardware security modules, MPC cryptography, and comprehensive compliance frameworks to protect all transactions and data."
  },
  {
    question: "What makes Seftec different from other platforms?",
    answer: "Our unique combination of ISO 20022 compliance, enterprise-grade security, and AI-powered business tools creates an unparalleled B2B marketplace experience focused on trust and efficiency."
  },
  {
    question: "How can I get started?",
    answer: "Simply register for an account, complete our streamlined verification process, and start connecting with verified business partners. Our AI assistant will guide you through the onboarding process."
  }
];

export function HomeFAQSection({ className }: { className?: string }) {
  return (
    <section className={cn("py-12 bg-white dark:bg-seftec-darkNavy", className)}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-seftec-navy dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-seftec-navy/70 dark:text-white/70 max-w-2xl mx-auto">
            Find quick answers to common questions about our platform
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-seftec-navy dark:text-white">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-seftec-navy/70 dark:text-white/70">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
