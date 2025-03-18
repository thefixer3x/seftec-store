
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import PaymentSelection from "@/components/ui/payment-selection";

interface PaymentButtonProps {
  label?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  label = "Make Payment",
  variant = "default",
  size = "default",
  className,
}) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const openPaymentModal = () => {
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={openPaymentModal}
      >
        <CreditCard className="h-4 w-4 mr-2" />
        {label}
      </Button>

      <PaymentSelection 
        isOpen={isPaymentModalOpen} 
        onClose={closePaymentModal} 
      />
    </>
  );
};

export default PaymentButton;
