
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const DefiHero = () => {
  return (
    <div className="bg-gradient-to-br from-seftec-navy to-seftec-teal/80 text-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center md:text-left">
          <Badge className="mb-4 bg-white/10 text-white border-0 backdrop-blur-sm">
            DeFi Leadership
          </Badge>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Leading the <span className="text-seftec-gold">DeFi Revolution</span> for Enterprise
          </h1>
          
          <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto md:mx-0 mb-8">
            Seftec is pioneering secure, standards-compliant enterprise DeFi access, 
            bridging traditional finance with decentralized innovation through our 
            ISO 20022-compatible platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button size="lg" className="bg-seftec-gold text-seftec-navy hover:bg-seftec-gold/90">
              Explore Our Vision
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              View Technical Solution
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefiHero;
