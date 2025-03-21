
import React from 'react';
import PaymentButton from "@/components/ui/payment-button";
import { Badge } from "@/components/ui/badge";

interface PaymentSectionProps {
  onPaymentComplete?: (paymentData: any) => void;
  apiMode?: "sandbox" | "live";
}

const PaymentSection: React.FC<PaymentSectionProps> = ({ 
  onPaymentComplete,
  apiMode = "sandbox"
}) => {
  return (
    <section className="h-full flex flex-col justify-between bg-gray-50 dark:bg-seftec-navy/30 p-6 rounded-lg">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-seftec-navy dark:text-white">Payment Solutions</h2>
          <Badge variant="outline" className="bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-400/30">
            SECURE
          </Badge>
        </div>
        <p className="mb-8 text-seftec-navy/70 dark:text-white/70">
          Our marketplace supports multiple payment gateways including Stripe, Flutterwave, 
          Paystack, Wise, and Payoneer, along with Apple Pay and Google Pay for seamless B2B transactions.
        </p>
      </div>
      <div className="text-center mt-4">
        <PaymentButton 
          label="Try Payment Integration" 
          className="bg-gradient-to-r from-seftec-navy to-seftec-navy/80 dark:from-seftec-teal dark:to-seftec-purple text-white"
          apiMode={apiMode}
          onPaymentComplete={onPaymentComplete}
        />
      </div>
    </section>
  );
};

export default PaymentSection;
