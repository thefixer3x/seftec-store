
import React from 'react';
import { FAQItem } from '../FAQCategory';

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
