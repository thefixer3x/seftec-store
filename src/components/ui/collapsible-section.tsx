
import React from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

interface CollapsibleSectionProps {
  id: string;
  title: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  bgClass: string;
  children: React.ReactNode;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  id,
  title,
  isOpen,
  setIsOpen,
  bgClass,
  children
}) => (
  <section id={id} className={`py-4 ${bgClass}`}>
    <div className="container mx-auto px-6">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full mb-4"
      >
        <CollapsibleTrigger className="flex justify-between items-center w-full py-3 px-4 rounded-lg bg-white dark:bg-seftec-navy/30 shadow-sm">
          <h2 className="text-xl font-bold text-seftec-navy dark:text-white">
            {title}
          </h2>
          <ChevronDown className={`h-5 w-5 text-seftec-navy dark:text-white transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-3">
          <div className="bg-white/50 dark:bg-seftec-navy/10 rounded-lg p-4 shadow-sm">
            {children}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  </section>
);

export default CollapsibleSection;
