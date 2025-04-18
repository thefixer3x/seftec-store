
import React from 'react';
import { FAQItem } from '../FAQCategory';

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
