
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import PaymentSelection from "@/components/ui/payment-selection";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PaymentButtonProps {
  label?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  apiMode?: "sandbox" | "live";
  onPaymentComplete?: (paymentData: any) => void;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  label = "Make Payment",
  variant = "default",
  size = "default",
  className,
  apiMode = "sandbox",
  onPaymentComplete,
}) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const openPaymentModal = () => {
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

  const handlePaymentComplete = async (paymentData: any) => {
    try {
      setIsProcessing(true);
      
      // If using Stripe for this payment, create a Stripe checkout session
      if (paymentData.provider === "stripe") {
        const { data, error } = await supabase.functions.invoke("create-stripe-checkout", {
          body: {
            paymentType: "payment", // or "subscription"
            amount: paymentData.amount,
            currency: paymentData.currency,
            productName: "Seftec Marketplace Payment",
            successUrl: `${window.location.origin}/payment-success`,
            cancelUrl: `${window.location.origin}/payment-canceled`,
          },
        });
        
        if (error) {
          throw new Error(error.message);
        }
        
        // Redirect to Stripe checkout
        if (data && data.url) {
          window.location.href = data.url;
          return; // Stop here as we're redirecting
        }
      }
      
      // For other payment providers or as fallback
      if (onPaymentComplete) {
        onPaymentComplete(paymentData);
      }
      
      closePaymentModal();
      toast({
        title: "Payment Successfully Initiated",
        description: `${paymentData.amount} ${paymentData.currency} via ${paymentData.provider}`,
        duration: 5000,
      });
    } catch (error) {
      console.error("Payment processing error:", error);
      toast({
        title: "Payment Error",
        description: error instanceof Error ? error.message : "Failed to process payment",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={openPaymentModal}
        disabled={isProcessing}
      >
        <CreditCard className="h-4 w-4 mr-2" />
        {isProcessing ? "Processing..." : label}
      </Button>

      <PaymentSelection 
        isOpen={isPaymentModalOpen} 
        onClose={closePaymentModal}
        apiMode={apiMode}
        onPaymentComplete={handlePaymentComplete}
      />
    </>
  );
};

export default PaymentButton;
