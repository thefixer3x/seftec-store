import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Bank, CreditCard, Plus, Trash2 } from 'lucide-react';

const BankAccountSettings = () => {
  return (
    <Card className="shadow-sm bg-white dark:bg-seftec-darkNavy/30">
      <CardContent className="p-8">
        <div className="border-l-4 border-blue-500 pl-4 mb-6 py-2 bg-blue-50 dark:bg-blue-500/10 rounded-r">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Bank Accounts</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Manage your connected bank accounts</p>
        </div>

        {/* Existing Bank Account */}
        <div className="mb-8 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                <Bank className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white">ABC Bank</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Account ending in 1234</p>
                <div className="flex items-center mt-1">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400">
                    Primary
                  </span>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800/50 dark:hover:bg-red-900/20">
              <Trash2 className="h-4 w-4 mr-1" />
              Remove
            </Button>
          </div>
        </div>

        {/* Add New Bank Account Form */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4 flex items-center">
            <Plus className="h-5 w-5 mr-2 text-blue-500" />
            Add New Bank Account
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-gray-700 dark:text-gray-300">Bank Name</Label>
              <Input placeholder="Enter bank name" className="mt-1 border-gray-300 dark:border-gray-700 dark:bg-gray-800/50" />
            </div>
            <div>
              <Label className="text-gray-700 dark:text-gray-300">Account Type</Label>
              <Input placeholder="Checking, Savings, etc." className="mt-1 border-gray-300 dark:border-gray-700 dark:bg-gray-800/50" />
            </div>
            <div>
              <Label className="text-gray-700 dark:text-gray-300">Account Number</Label>
              <Input placeholder="Enter account number" className="mt-1 border-gray-300 dark:border-gray-700 dark:bg-gray-800/50" />
            </div>
            <div>
              <Label className="text-gray-700 dark:text-gray-300">Routing Number</Label>
              <Input placeholder="Enter routing number" className="mt-1 border-gray-300 dark:border-gray-700 dark:bg-gray-800/50" />
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
              <CreditCard className="h-4 w-4 mr-2" />
              Add Bank Account
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BankAccountSettings;
