
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Building, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BankAccountInfo = () => {
  const { toast } = useToast();
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Account number copied",
      description: "The account number has been copied to your clipboard",
    });
  };

  return (
    <Card className="bg-white shadow-sm border">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <CreditCard className="h-5 w-5 text-blue-600 mr-2" />
          <h3 className="font-medium text-gray-800">Connected Account</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">Account Number</div>
            <div className="flex items-center">
              <div className="font-mono text-sm bg-gray-100 px-3 py-1.5 rounded">1234567890</div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => copyToClipboard('1234567890')}
                className="h-8 w-8 ml-1 text-gray-500 hover:text-blue-600"
              >
                <Copy className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">Bank Name</div>
            <div className="text-sm font-medium">Example Bank</div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">Account Name</div>
            <div className="text-sm font-medium">COMPANY XYZ</div>
          </div>
          
          <div className="pt-4 mt-2 border-t border-gray-100">
            <Button variant="outline" size="sm" className="w-full text-blue-600 border-blue-200 hover:bg-blue-50">
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
