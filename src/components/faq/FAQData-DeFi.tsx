
import React from 'react';
import { FAQItem } from './FAQCategory';

export const defiFAQs: FAQItem[] = [
  {
    id: "what-is-defi",
    question: "What is DeFi and how does it apply to enterprises?",
    answer: (
      <>
        <p className="mb-3">
          Decentralized Finance (DeFi) refers to financial services built on blockchain technology that eliminate the need for traditional intermediaries like banks or brokers.
        </p>
        <p className="mb-3">
          For enterprises, DeFi offers significant advantages in efficiency, cost reduction, transparency, and security for various financial operations including payments, trade finance, treasury management, and asset tokenization.
        </p>
        <p>
          Our enterprise DeFi solutions are ISO 20022 compliant, ensuring seamless integration with existing systems while leveraging blockchain benefits.
        </p>
      </>
    )
  },
  {
    id: "iso-20022-compliance",
    question: "What is ISO 20022 and why is it important?",
    answer: (
      <>
        <p className="mb-3">
          ISO 20022 is an international standard for electronic data interchange between financial institutions. It defines a common language for financial institutions to communicate efficiently.
        </p>
        <p className="mb-3">
          This standard is crucial because it enables rich, structured data to accompany financial transactions, improving straight-through processing rates and reducing reconciliation errors.
        </p>
        <p>
          Our platform's ISO 20022 compliance ensures interoperability between traditional banking systems and blockchain-based solutions, providing a seamless bridge between these technologies.
        </p>
      </>
    )
  },
  {
    id: "security-measures",
    question: "How does seftec ensure enterprise-grade security?",
    answer: (
      <>
        <p className="mb-3">
          We implement multiple layers of security including hardware security modules (HSMs), multi-party computation (MPC) cryptography, and enterprise-grade key management systems.
        </p>
        <p className="mb-3">
          Our platform undergoes regular security audits by leading firms, maintains ISO 27001 certification, and follows industry best practices for secure development.
        </p>
        <p>
          Additionally, we provide granular access controls, transaction limits, real-time monitoring, and fraud detection systems tailored to enterprise requirements.
        </p>
      </>
    )
  },
  {
    id: "implementation-timeline",
    question: "How long does implementation typically take?",
    answer: (
      <>
        <p className="mb-3">
          A typical enterprise implementation takes 9-12 weeks from initial assessment to full deployment, though this can vary based on complexity and integration requirements.
        </p>
        <p className="mb-3">
          Our implementation process includes:
        </p>
        <ul className="list-disc pl-5 mb-3">
          <li>Discovery & assessment (2 weeks)</li>
          <li>System integration (4-6 weeks)</li>
          <li>Testing & compliance (2-3 weeks)</li>
          <li>Deployment (1 week)</li>
        </ul>
        <p>
          We provide dedicated implementation teams and detailed project plans to ensure smooth integration with minimal disruption to your existing operations.
        </p>
      </>
    )
  },
  {
    id: "future-roadmap",
    question: "What's on seftec's DeFi roadmap for the next 12-24 months?",
    answer: (
      <>
        <p className="mb-3">
          Our strategic roadmap focuses on three key areas:
        </p>
        <ol className="list-decimal pl-5 mb-3">
          <li className="mb-2">
            <strong>Enhanced Interoperability</strong> - Expanding our ISO 20022 capabilities and protocol support with multi-chain bridging and additional financial messaging standards (Q3 2024)
          </li>
          <li className="mb-2">
            <strong>Global Expansion & Partnerships</strong> - New strategic banking partnerships and expansion into APAC with offices in Singapore and Tokyo (Q1 2025)
          </li>
          <li className="mb-2">
            <strong>Advanced DeFi Capabilities</strong> - Launch of Enterprise Tokenization Platform, advanced treasury management solutions, and a real-time cross-border payment network (Q3 2025)
          </li>
        </ol>
        <p>
          We're committed to continuous innovation that delivers increasing value to our enterprise clients while maintaining our core focus on security, compliance, and interoperability.
        </p>
      </>
    )
  }
];
