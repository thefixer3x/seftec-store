
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, Filter, Building, ArrowUp, Check } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const WalletTab = () => {
  const [transactionTab, setTransactionTab] = useState("payment");

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bank Account Info */}
        <Card className="bg-white shadow-sm border">
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="font-mono text-sm bg-gray-100 px-3 py-2 rounded">1234567890</div>
            <div className="text-sm">Example Bank</div>
            <div className="text-sm font-medium">JOHN DOE</div>
            <Button variant="ghost" size="icon" className="ml-auto">
              <Building className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Empty Card for Layout */}
        <div></div>

        {/* Active Loan Card */}
        <Card className="bg-blue-400 text-white shadow-sm border">
          <CardContent className="p-6">
            <p className="text-blue-100 mb-2">Active loan</p>
            <h2 className="text-4xl font-bold">NGN5,000</h2>
          </CardContent>
        </Card>

        {/* Loan Limit Card */}
        <Card className="bg-blue-700 text-white shadow-sm border relative overflow-hidden">
          <CardContent className="p-6">
            <div className="relative z-10">
              <p className="text-xl mb-2">Your Loan Limit is</p>
              <h2 className="text-5xl font-bold text-amber-400">50.0K</h2>
              <ul className="mt-4 space-y-1">
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-white" />
                  <span className="text-sm">Disbursement within 24hrs</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-white" />
                  <span className="text-sm">Pay small small</span>
                </li>
              </ul>
              <Button className="mt-4 bg-amber-400 hover:bg-amber-500 text-blue-900 font-medium">
                Request loan
                <ArrowUp className="h-4 w-4 ml-2 rotate-45" />
              </Button>
            </div>
            {/* Abstract shapes */}
            <div className="absolute right-0 bottom-0 w-1/2 h-full bg-blue-600 rounded-full -translate-x-1/4 translate-y-1/4 opacity-30"></div>
            <div className="absolute left-0 top-0 w-24 h-24 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-30"></div>
          </CardContent>
        </Card>

        {/* Wallet Balance Card */}
        <Card className="bg-green-100 shadow-sm border">
          <CardContent className="p-6">
            <p className="text-green-800 mb-2">Wallet balance</p>
            <h2 className="text-4xl font-bold">NGN12,500.00</h2>
            <div className="flex mt-4 space-x-4">
              <Button className="bg-blue-700 hover:bg-blue-800">
                Send Money
                <ArrowUp className="h-4 w-4 ml-2" />
              </Button>
              <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
                Fund Wallet
                <ArrowUp className="h-4 w-4 ml-2 rotate-45" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Section */}
      <div className="mt-8">
        <Tabs defaultValue="payment" value={transactionTab} onValueChange={setTransactionTab}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <TabsList className="bg-gray-100 p-1 rounded-md">
              <TabsTrigger 
                value="payment" 
                className={`rounded-md ${transactionTab === 'payment' ? 'bg-white shadow-sm' : ''}`}
              >
                Payment Transactions
              </TabsTrigger>
              <TabsTrigger 
                value="loan" 
                className={`rounded-md ${transactionTab === 'loan' ? 'bg-white shadow-sm' : ''}`}
              >
                Loan Transactions
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  placeholder="Search References" 
                  className="pl-10 w-full sm:w-64" 
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="payment" className="mt-0 p-0">
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
                      <div className="font-medium">From Example Bank/John Smith</div>
                      <div className="text-sm text-gray-500">TRX12345678901234</div>
                      <div className="text-sm text-gray-500">REF987654321</div>
                    </div>
                    <div className="text-green-600 font-bold">+ 5,000</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="loan" className="mt-0 p-0">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <Button variant="outline" className="text-sm px-3 py-1 h-auto">
                    Last 30 days ▼
                  </Button>
                  <Card className="border p-4 bg-gray-50">
                    <div className="flex items-center">
                      <Building className="h-5 w-5 mr-2 text-blue-700" />
                      <div>
                        <p className="text-blue-700 font-medium">Total Loan Amount</p>
                        <p className="text-2xl font-bold">₦5,000.00</p>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Building className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-500 text-sm">2025-03-10T14:45:00.000+00:00</div>
                      <div className="font-medium">Loan Disbursement</div>
                      <div className="text-sm text-gray-500">LOAN98765432100</div>
                      <div className="text-sm text-gray-500">Due Date: 2025-04-10</div>
                    </div>
                    <div className="text-blue-600 font-bold">+ 5,000</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WalletTab;
