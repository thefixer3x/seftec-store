
import React from 'react';
import { FAQItem } from '../FAQCategory';

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
