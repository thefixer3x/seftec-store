
import React from "react";
import { Badge } from "@/components/ui/badge";
import BusinessCounter from "@/components/ui/business-counter";
import PaymentButton from "@/components/ui/payment-button";

interface PaymentBusinessSectionProps {
  onPaymentComplete: (paymentData: any) => void;
}

const PaymentBusinessSection: React.FC<PaymentBusinessSectionProps> = ({ onPaymentComplete }) => {
  return (
    <section className="py-12 bg-gray-50 dark:bg-seftec-navy/20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 gap-8">
          {/* Business Counter Section - Desktop */}
          <div className="bg-seftec-slate dark:bg-seftec-navy/30 rounded-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-seftec-navy dark:text-white">Business Metrics</h2>
              <Badge variant="outline" className="bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-400/30">
                LIVE
              </Badge>
            </div>
            <BusinessCounter className="py-0" />
          </div>
          
          {/* Payment Integration Demo Section - Desktop */}
          <div className="bg-white dark:bg-seftec-navy/30 rounded-xl p-8 text-center flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-8 text-seftec-navy dark:text-white">
                Integrated Payment Solutions
              </h2>
              <p className="mb-8 text-seftec-navy/70 dark:text-white/70 max-w-2xl mx-auto">
                Our marketplace supports multiple payment gateways including Stripe, Flutterwave, 
                Paystack, Wise, and Payoneer, along with Apple Pay and Google Pay for seamless B2B transactions.
              </p>
            </div>
            <PaymentButton 
              label="Try Payment Integration" 
              className="bg-gradient-to-r from-seftec-navy to-seftec-navy/80 dark:from-seftec-teal dark:to-seftec-purple text-white"
              apiMode="live"
              onPaymentComplete={onPaymentComplete}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentBusinessSection;
