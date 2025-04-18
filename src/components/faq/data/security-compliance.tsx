
import React from 'react';
import { FAQItem } from '../FAQCategory';

export const securityComplianceFAQs: FAQItem[] = [
  {
    id: "how-is-my-data-protected",
    question: "How is my data protected?",
    answer: (
      <>
        <p className="mb-3">We take the security of your data very seriously. We use a variety of security measures to protect your data, including encryption, firewalls, and intrusion detection systems.</p>
        <p>We also comply with all applicable data privacy regulations.</p>
      </>
    )
  },
  {
    id: "what-compliance-standards-do-you-meet",
    question: "What compliance standards do you meet?",
    answer: (
      <>
        <p className="mb-3">We meet a variety of compliance standards, including PCI DSS, GDPR, and CCPA.</p>
        <p>We are committed to providing a secure and compliant platform for our users.</p>
      </>
    )
  },
  {
    id: "how-do-i-report-a-security-vulnerability",
    question: "How do I report a security vulnerability?",
    answer: (
      <>
        <p className="mb-3">If you believe you have found a security vulnerability, please contact our security team immediately.</p>
        <p>We appreciate your help in keeping our platform secure.</p>
      </>
    )
  }
];
