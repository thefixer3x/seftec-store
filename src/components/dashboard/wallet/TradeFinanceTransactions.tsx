
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, FileText, Calendar, ArrowUp } from 'lucide-react';

const TradeFinanceTransactions = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" className="text-sm px-3 py-1 h-auto">
            Last 90 days ▼
          </Button>
          <Card className="border p-4 bg-gray-50">
            <div className="flex items-center">
              <Briefcase className="h-5 w-5 mr-2 text-blue-700" />
              <div>
                <p className="text-blue-700 font-medium">Active Trade Finance</p>
                <p className="text-2xl font-bold">₦120,000.00</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-6">
          <Card className="bg-blue-50 border shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start">
                <div className="mr-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <FileText className="h-6 w-6 text-blue-700" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">Letter of Credit #LC928375</h3>
                      <p className="text-sm text-gray-600">International Import - Agricultural Products</p>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">Active</span>
                  </div>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <p className="text-xs text-gray-500">Amount</p>
                      <p className="font-medium">₦75,000.00</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Beneficiary</p>
                      <p className="font-medium">Global Suppliers Ltd</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Expiry Date</p>
                      <div className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1 text-gray-500" />
                        <p className="font-medium">2025-06-15</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Button variant="outline" size="sm" className="text-blue-700 border-blue-700">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-amber-50 border shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start">
                <div className="mr-4">
                  <div className="bg-amber-100 p-2 rounded-full">
                    <FileText className="h-6 w-6 text-amber-700" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">Trade Guarantee #TG564738</h3>
                      <p className="text-sm text-gray-600">Local Supply - Manufacturing Equipment</p>
                    </div>
                    <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded">Pending</span>
                  </div>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <p className="text-xs text-gray-500">Amount</p>
                      <p className="font-medium">₦45,000.00</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Beneficiary</p>
                      <p className="font-medium">Tech Industries Co.</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Expiry Date</p>
                      <div className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1 text-gray-500" />
                        <p className="font-medium">2025-07-30</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Button variant="outline" size="sm" className="text-amber-700 border-amber-700">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center py-4">
            <Button className="bg-blue-700 hover:bg-blue-800">
              Apply for Trade Finance
              <ArrowUp className="h-4 w-4 ml-2 rotate-45" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TradeFinanceTransactions;
