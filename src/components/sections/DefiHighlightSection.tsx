
import React from 'react';
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const DefiHighlightSection = () => {
  return (
    <div className="bg-gradient-to-r from-seftec-navy/5 to-seftec-navy/0 dark:from-seftec-purple/10 dark:to-seftec-teal/0 py-4">
      <div className="container mx-auto px-4 sm:px-6">
        <Card className="bg-white/80 dark:bg-white/5 border-seftec-navy/10 dark:border-white/10">
          <div className="p-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-r from-seftec-gold to-seftec-gold/80 dark:from-seftec-teal dark:to-seftec-purple p-3 rounded-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-seftec-navy dark:text-white text-lg font-bold mb-1">
                    Leading Enterprise DeFi Solutions
                  </h2>
                  <p className="text-seftec-navy/70 dark:text-white/70 text-sm">
                    Seftec is pioneering ISO 20022 compliant decentralized finance solutions for enterprises worldwide.
                    Explore our comprehensive roadmap and strategic vision.
                  </p>
                </div>
              </div>
              <Link to="/defi-leadership">
                <Button className="flex items-center gap-1 bg-seftec-navy hover:bg-seftec-navy/90 dark:bg-seftec-teal dark:hover:bg-seftec-teal/90">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DefiHighlightSection;
