import { FAQItem } from './FAQCategory';
import { defiFAQs } from './FAQData-DeFi';

// Platform Overview FAQs
export const platformOverviewFAQs: FAQItem[] = [
  {
    id: "what-is-seftec",
    question: "What is Seftec?",
    answer: (
      <>
        <p className="mb-3">Seftec is a B2B marketplace platform that provides a comprehensive suite of digital and fintech solutions designed for business and personal financial management.</p>
        <p>Our platform offers a wide range of tools and services to help businesses streamline their operations, improve their financial performance, and connect with new customers and partners.</p>
      </>
    )
  },
  {
    id: "who-is-seftec-for",
    question: "Who is Seftec for?",
    answer: (
      <>
        <p className="mb-3">Seftec is designed for businesses of all sizes, from startups to large enterprises. Our platform is particularly well-suited for businesses in the following industries:</p>
        <ul className="list-disc pl-6 mb-3 space-y-2">
          <li>Financial services</li>
          <li>Technology</li>
          <li>Retail</li>
          <li>Healthcare</li>
          <li>Manufacturing</li>
        </ul>
        <p>However, our platform is flexible and customizable enough to meet the needs of businesses in any industry.</p>
      </>
    )
  },
  {
    id: "what-problems-does-seftec-solve",
    question: "What problems does Seftec solve?",
    answer: (
      <>
        <p className="mb-3">Seftec solves a wide range of problems for businesses, including:</p>
        <ul className="list-disc pl-6 mb-3 space-y-2">
          <li>Difficulty finding and connecting with new customers and partners</li>
          <li>Inefficient and time-consuming financial processes</li>
          <li>Lack of access to the latest digital and fintech solutions</li>
          <li>Difficulty managing and tracking financial performance</li>
          <li>High costs associated with traditional financial services</li>
        </ul>
        <p>By providing a comprehensive suite of digital and fintech solutions, Seftec helps businesses overcome these challenges and achieve their financial goals.</p>
      </>
    )
  }
];

// Account Management FAQs
export const accountManagementFAQs: FAQItem[] = [
  {
    id: "how-do-i-create-an-account",
    question: "How do I create an account?",
    answer: (
      <>
        <p className="mb-3">To create an account, simply click on the "Sign Up" button in the top right corner of the page and follow the instructions.</p>
        <p>You will need to provide your name, email address, and a password. Once you have created an account, you will be able to access all of the features of the Seftec platform.</p>
      </>
    )
  },
  {
    id: "how-do-i-reset-my-password",
    question: "How do I reset my password?",
    answer: (
      <>
        <p className="mb-3">To reset your password, click on the "Forgot Password" link on the login page and follow the instructions.</p>
        <p>You will need to provide your email address. Once you have submitted your email address, you will receive an email with instructions on how to reset your password.</p>
      </>
    )
  },
  {
    id: "how-do-i-update-my-account-information",
    question: "How do I update my account information?",
    answer: (
      <>
        <p className="mb-3">To update your account information, log in to your account and click on the "Profile" link in the top right corner of the page.</p>
        <p>From there, you will be able to update your name, email address, password, and other account information.</p>
      </>
    )
  }
];

// Transactions & Payments FAQs
export const transactionsPaymentsFAQs: FAQItem[] = [
  {
    id: "what-payment-methods-are-accepted",
    question: "What payment methods are accepted?",
    answer: (
      <>
        <p className="mb-3">We accept a variety of payment methods, including credit cards, debit cards, and PayPal.</p>
        <p>You can select your preferred payment method during the checkout process.</p>
      </>
    )
  },
  {
    id: "how-do-i-request-a-refund",
    question: "How do I request a refund?",
    answer: (
      <>
        <p className="mb-3">To request a refund, please contact our support team and provide them with your order number and a brief explanation of why you are requesting a refund.</p>
        <p>We will review your request and process your refund as soon as possible.</p>
      </>
    )
  },
  {
    id: "how-do-i-view-my-transaction-history",
    question: "How do I view my transaction history?",
    answer: (
      <>
        <p className="mb-3">To view your transaction history, log in to your account and click on the "Orders" link in the top right corner of the page.</p>
        <p>From there, you will be able to view all of your past transactions.</p>
      </>
    )
  }
];

// Security & Compliance FAQs
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

// Support & Integration FAQs
export const supportIntegrationFAQs: FAQItem[] = [
  {
    id: "how-do-i-contact-support",
    question: "How do I contact support?",
    answer: (
      <>
        <p className="mb-3">You can contact our support team by clicking on the "Contact" link in the top right corner of the page.</p>
        <p>We are available 24/7 to answer your questions and help you resolve any issues.</p>
      </>
    )
  },
  {
    id: "do-you-offer-api-integrations",
    question: "Do you offer API integrations?",
    answer: (
      <>
        <p className="mb-3">Yes, we offer API integrations for a variety of our solutions.</p>
        <p>Please contact our sales team to learn more about our API integrations.</p>
      </>
    )
  },
  {
    id: "do-you-offer-custom-development-services",
    question: "Do you offer custom development services?",
    answer: (
      <>
        <p className="mb-3">Yes, we offer custom development services to help you build the perfect solution for your business.</p>
        <p>Please contact our sales team to learn more about our custom development services.</p>
      </>
    )
  }
];

// Export the DeFi FAQs
export { defiFAQs };
