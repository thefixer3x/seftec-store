
import React from 'react';
import { FAQItem } from '../FAQCategory';

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
