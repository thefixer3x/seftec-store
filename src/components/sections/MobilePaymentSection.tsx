
import React from "react";
import PaymentButton from "@/components/ui/payment-button";

interface MobilePaymentSectionProps {
  onPaymentComplete: (paymentData: any) => void;
}

const MobilePaymentSection: React.FC<MobilePaymentSectionProps> = ({ onPaymentComplete }) => {
  return (
    <div className="text-center">
      <p className="mb-6 text-seftec-navy/70 dark:text-white/70 max-w-2xl mx-auto">
        Our marketplace supports multiple payment gateways including Stripe, Flutterwave, 
        Paystack, Wise, and Payoneer, along with Apple Pay and Google Pay for seamless B2B transactions.
      </p>
      <PaymentButton 
        label="Try Payment Integration" 
        className="bg-gradient-to-r from-seftec-navy to-seftec-navy/80 dark:from-seftec-teal dark:to-seftec-purple text-white"
        apiMode="live"
        onPaymentComplete={onPaymentComplete}
      />
    </div>
  );
};

export default MobilePaymentSection;
