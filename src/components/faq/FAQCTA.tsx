
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQCTA = () => {
  return (
    <div className="max-w-4xl mx-auto mt-16">
      <Card className="bg-gradient-to-r from-seftec-navy/95 to-seftec-navy dark:from-seftec-darkNavy/95 dark:to-seftec-darkNavy/90 border-0 shadow-lg">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Still have questions?</h3>
              <p className="text-white/80 mb-6">Our support team is ready to assist you with any additional questions about our platform.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-white hover:bg-gray-100 text-seftec-navy">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Contact Support
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Schedule Demo
                </Button>
              </div>
            </div>
            <div className="hidden md:block border-l border-white/20 pl-8">
              <h4 className="text-xl font-semibold text-white mb-4">Additional Resources</h4>
              <ul className="space-y-3 text-white/80">
                <li>
                  <Link to="/resources/guides" className="flex items-center hover:text-white transition-colors">
                    <span className="mr-2">→</span> Implementation Guides
                  </Link>
                </li>
                <li>
                  <Link to="/resources/webinars" className="flex items-center hover:text-white transition-colors">
                    <span className="mr-2">→</span> Webinar Recordings
                  </Link>
                </li>
                <li>
                  <Link to="/resources/case-studies" className="flex items-center hover:text-white transition-colors">
                    <span className="mr-2">→</span> Customer Success Stories
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="flex items-center hover:text-white transition-colors">
                    <span className="mr-2">→</span> B2B Marketing Blog
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FAQCTA;
