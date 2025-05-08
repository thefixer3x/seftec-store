
import React from 'react';
import BusinessCounterSection from './BusinessCounterSection';
import PaymentSection from './PaymentSection';
import { useIsMobile } from '@/hooks/use-mobile';

const PaymentCounterSection = () => {
  const isMobile = useIsMobile();

  return (
    <div className="py-12">
      <div className="container mx-auto px-6">
        {isMobile ? (
          <>
            <BusinessCounterSection />
            <div className="mt-12">
              <PaymentSection 
                apiMode="sandbox"
              />
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <BusinessCounterSection />
            <PaymentSection 
              apiMode="live"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentCounterSection;
