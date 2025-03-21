
import React, { useState } from 'react';
import PaymentButton from "@/components/ui/payment-button";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PaymentSectionProps {
  onPaymentComplete?: (paymentData: any) => void;
  apiMode?: "sandbox" | "live";
}

const PaymentSection: React.FC<PaymentSectionProps> = ({ 
  onPaymentComplete,
  apiMode = "sandbox"
}) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastPayment, setLastPayment] = useState<any>(null);

  const handlePaymentComplete = (paymentData: any) => {
    setLastPayment(paymentData);
    setIsProcessing(false);
    
    if (onPaymentComplete) {
      onPaymentComplete(paymentData);
    }
    
    toast({
      title: "Payment Successfully Processed",
      description: `${paymentData.amount} ${paymentData.currency} via ${paymentData.provider}`,
      duration: 5000,
    });
  };

  return (
    <section className="h-full flex flex-col justify-between bg-gray-50 dark:bg-seftec-navy/30 p-6 rounded-lg">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-seftec-navy dark:text-white">Payment Solutions</h2>
          <Badge variant="outline" className="bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-400/30">
            {apiMode === "live" ? "LIVE" : "SANDBOX"}
          </Badge>
        </div>
        <p className="mb-8 text-seftec-navy/70 dark:text-white/70">
          Our marketplace supports multiple payment gateways including Stripe, Flutterwave, 
          Paystack, Wise, and Payoneer, along with Apple Pay and Google Pay for seamless B2B transactions.
        </p>
        
        {lastPayment && (
          <div className="mb-6 p-3 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-md">
            <p className="text-sm text-green-800 dark:text-green-300">
              Last transaction: {lastPayment.amount} {lastPayment.currency} via {lastPayment.provider}
            </p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
              Transaction ID: {lastPayment.transactionId}
            </p>
          </div>
        )}
      </div>
      <div className="text-center mt-4">
        <PaymentButton 
          label={isProcessing ? "Processing..." : "Try Payment Integration"} 
          className={`relative bg-gradient-to-r from-seftec-navy to-seftec-navy/80 dark:from-seftec-teal dark:to-seftec-purple text-white ${isProcessing ? 'opacity-70' : ''}`}
          apiMode={apiMode}
          onPaymentComplete={handlePaymentComplete}
        />
      </div>
    </section>
  );
};

export default PaymentSection;
