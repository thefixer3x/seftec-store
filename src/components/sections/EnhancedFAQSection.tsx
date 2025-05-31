
import React, { useState } from 'react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Building2, Shield, FileText, Coins, Brain, CreditCard, Store, DollarSign, Code } from 'lucide-react';
import { cn } from "@/lib/utils";
import { faqCategories } from '@/data/faqData';

const iconMap = {
  Building2,
  Shield,
  FileText,
  Coins,
  Brain,
  CreditCard,
  Store,
  DollarSign,
  Code
};

interface EnhancedFAQSectionProps {
  className?: string;
}

export function EnhancedFAQSection({ className }: EnhancedFAQSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })).filter(category => category.items.length > 0);

  const allItems = faqCategories.flatMap(category => 
    category.items.map(item => ({ ...item, categoryTitle: category.title }))
  ).filter(item => 
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <section className={cn("py-16 bg-white dark:bg-seftec-darkNavy", className)}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-seftec-navy dark:text-white mb-4">
            Comprehensive FAQ
          </h2>
          <p className="text-lg text-seftec-navy/70 dark:text-white/70 max-w-3xl mx-auto mb-8">
            Find detailed answers to questions about SEFTEC's enterprise DeFi platform, 
            B2B marketplace, trade finance, business registration, and AI-powered services.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10 mb-8">
            <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
            {faqCategories.map((category, index) => {
              const IconComponent = iconMap[category.icon as keyof typeof iconMap];
              return (
                <TabsTrigger 
                  key={index} 
                  value={category.title.toLowerCase().replace(/\s+/g, '-')}
                  className="text-xs"
                >
                  <IconComponent className="h-3 w-3 mr-1" />
                  <span className="hidden sm:inline">{category.title}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          <TabsContent value="all">
            {searchTerm ? (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-seftec-navy dark:text-white mb-4">
                  Search Results ({allItems.length})
                </h3>
                <Accordion type="single" collapsible className="w-full">
                  {allItems.map((item, index) => (
                    <AccordionItem key={index} value={`search-${index}`}>
                      <AccordionTrigger className="text-left">
                        <div className="flex flex-col items-start">
                          <span className="text-seftec-navy dark:text-white">{item.question}</span>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {item.categoryTitle}
                          </Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-seftec-navy/70 dark:text-white/70">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {faqCategories.map((category, index) => {
                  const IconComponent = iconMap[category.icon as keyof typeof iconMap];
                  return (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-lg bg-seftec-gold/10 dark:bg-seftec-teal/10 flex items-center justify-center">
                            <IconComponent className="h-5 w-5 text-seftec-gold dark:text-seftec-teal" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{category.title}</CardTitle>
                            <Badge variant="secondary">{category.items.length} FAQs</Badge>
                          </div>
                        </div>
                        <CardDescription>{category.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <button
                          onClick={() => setSelectedCategory(category.title.toLowerCase().replace(/\s+/g, '-'))}
                          className="text-seftec-gold dark:text-seftec-teal hover:underline text-sm font-medium"
                        >
                          View all questions →
                        </button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          {faqCategories.map((category, categoryIndex) => {
            const IconComponent = iconMap[category.icon as keyof typeof iconMap];
            const categoryKey = category.title.toLowerCase().replace(/\s+/g, '-');
            const categoryItems = searchTerm ? 
              category.items.filter(item => 
                item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
              ) : category.items;

            return (
              <TabsContent key={categoryIndex} value={categoryKey}>
                <div className="mb-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-seftec-gold/10 dark:bg-seftec-teal/10 flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-seftec-gold dark:text-seftec-teal" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-seftec-navy dark:text-white">{category.title}</h3>
                      <p className="text-seftec-navy/70 dark:text-white/70">{category.description}</p>
                    </div>
                  </div>
                </div>

                <Accordion type="single" collapsible className="w-full space-y-2">
                  {categoryItems.map((item, itemIndex) => (
                    <AccordionItem 
                      key={itemIndex} 
                      value={`${categoryKey}-${itemIndex}`}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left hover:no-underline">
                        <div className="flex flex-col items-start">
                          <span className="text-seftec-navy dark:text-white font-medium">
                            {item.question}
                          </span>
                          {item.tags && (
                            <div className="flex gap-1 mt-2">
                              {item.tags.slice(0, 3).map((tag, tagIndex) => (
                                <Badge key={tagIndex} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-seftec-navy/70 dark:text-white/70 leading-relaxed">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                {categoryItems.length === 0 && searchTerm && (
                  <div className="text-center py-8">
                    <p className="text-seftec-navy/70 dark:text-white/70">
                      No results found for "{searchTerm}" in {category.title}
                    </p>
                  </div>
                )}
              </TabsContent>
            );
          })}
        </Tabs>

        {/* Contact Support Section */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-seftec-navy to-blue-800 text-white">
            <CardHeader>
              <CardTitle className="text-xl">Still have questions?</CardTitle>
              <CardDescription className="text-blue-100">
                Our support team is here to help with any additional questions about SEFTEC's platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contact" 
                  className="inline-flex items-center justify-center px-6 py-2 bg-seftec-gold hover:bg-seftec-gold/90 text-seftec-navy rounded-md font-medium transition-colors"
                >
                  Contact Support
                </a>
                <a 
                  href="mailto:support@seftec.store" 
                  className="inline-flex items-center justify-center px-6 py-2 border border-blue-300 hover:bg-blue-700 rounded-md font-medium transition-colors"
                >
                  Email Us
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
