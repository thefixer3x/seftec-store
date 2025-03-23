
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Building, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

const BankAccountInfo = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Account number copied",
      description: "The account number has been copied to your clipboard",
    });
  };

  return (
    <Card className="bg-white/70 shadow-sm border border-seftec-navy/10 dark:bg-white/5 dark:border-white/10">
      <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
        <div className="flex items-center mb-4">
          <CreditCard className="h-5 w-5 text-seftec-gold dark:text-seftec-teal mr-2" />
          <h3 className="font-medium text-seftec-navy dark:text-white">Connected Account</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <div className="text-sm text-seftec-navy/70 dark:text-white/70">Account Number</div>
            <div className="flex items-center">
              <div className="font-mono text-sm bg-seftec-slate/70 dark:bg-seftec-darkNavy/80 px-3 py-1.5 rounded text-seftec-navy dark:text-white">9876543210</div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => copyToClipboard('9876543210')}
                className="h-8 w-8 ml-1 text-seftec-navy/70 hover:text-seftec-gold dark:text-white/70 dark:hover:text-seftec-teal"
              >
                <Copy className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-seftec-navy/70 dark:text-white/70">Bank Name</div>
            <div className="text-sm font-medium text-seftec-navy dark:text-white">Universal Bank</div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-seftec-navy/70 dark:text-white/70">Account Name</div>
            <div className="text-sm font-medium text-seftec-navy dark:text-white">ACME CORPORATION</div>
          </div>
          
          <div className="pt-3 mt-2 border-t border-seftec-navy/10 dark:border-white/10">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full text-seftec-navy border-seftec-navy/20 hover:bg-seftec-navy/10 dark:text-seftec-teal dark:border-seftec-teal/20 dark:hover:bg-seftec-teal/10"
            >
              <Building className="h-3.5 w-3.5 mr-2" />
              Manage Bank Accounts
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BankAccountInfo;
