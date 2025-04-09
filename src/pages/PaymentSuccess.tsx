
import React, { useEffect } from 'react';
import { MainNav } from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { siteConfig } from "@/config/site";
import { Toaster } from "@/components/ui/toaster";
import { Check, CreditCard, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useSearchParams } from 'react-router-dom';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  // Optional: You could fetch the session details from Stripe here
  // using another edge function if needed

  return (
    <div className="min-h-screen bg-white dark:bg-seftec-darkNavy pt-[56px]">
      <MainNav items={siteConfig.mainNav} />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4 text-seftec-navy dark:text-white">Payment Successful!</h1>
          
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Your payment has been processed successfully. 
            {sessionId && (
              <span className="block mt-2 text-sm text-gray-500 dark:text-gray-400">
                Transaction ID: {sessionId}
              </span>
            )}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/">
              <Button variant="outline" className="w-full sm:w-auto">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Return to Home
              </Button>
            </Link>
            <Link to="/shop">
              <Button className="w-full sm:w-auto">
                <CreditCard className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
      <Toaster />
    </div>
  );
};

export default PaymentSuccess;
