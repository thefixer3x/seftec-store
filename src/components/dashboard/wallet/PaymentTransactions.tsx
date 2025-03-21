
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building } from 'lucide-react';

const PaymentTransactions = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" className="text-sm px-3 py-1 h-auto">
            Last 7 days ▼
          </Button>
          <Card className="border p-4 bg-gray-50">
            <div className="flex items-center">
              <Building className="h-5 w-5 mr-2 text-blue-700" />
              <div>
                <p className="text-blue-700 font-medium">Total Transaction Value</p>
                <p className="text-2xl font-bold">₦25,750.00</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-start space-x-4">
            <div className="bg-green-100 p-2 rounded-full">
              <Building className="h-6 w-6 text-green-600" />
            </div>
            <div className="flex-1">
              <div className="text-gray-500 text-sm">2025-03-15T09:30:00.000+00:00</div>
              <div className="font-medium">From Example Bank/Supplier ABC</div>
              <div className="text-sm text-gray-500">TRX12345678901234</div>
              <div className="text-sm text-gray-500">REF987654321</div>
            </div>
            <div className="text-green-600 font-bold">+ 5,000</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentTransactions;
