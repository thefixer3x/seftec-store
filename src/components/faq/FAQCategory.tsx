
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export interface FAQItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

interface FAQCategoryProps {
  title: string;
  items: FAQItem[];
}

const FAQCategory = ({ title, items }: FAQCategoryProps) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-seftec-navy dark:text-white border-l-4 border-seftec-gold dark:border-seftec-teal pl-4 py-2">{title}</h2>
      <Accordion type="single" collapsible className="bg-white dark:bg-seftec-darkNavy/30 rounded-lg shadow-sm">
        {items.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger className="text-lg font-medium text-seftec-navy dark:text-white px-6">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="px-6 text-gray-700 dark:text-gray-300">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQCategory;
