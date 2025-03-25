
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, CreditCard, DollarSign, Package } from 'lucide-react';

const AccountSubscription = () => {
  return (
    <Card className="shadow-sm bg-white dark:bg-seftec-darkNavy/30">
      <CardContent className="p-8">
        <div className="border-l-4 border-amber-500 pl-4 mb-6 py-2 bg-amber-50 dark:bg-amber-500/10 rounded-r">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Subscription</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Manage your subscription plan and billing</p>
        </div>
        
        {/* Current Plan */}
        <div className="mb-8 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-medium text-gray-800 dark:text-white">Current Plan</h3>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full mr-4">
                  <Package className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-white">Business Pro</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">$49.99/month, billed monthly</p>
                </div>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400">
                Active
              </span>
            </div>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm text-gray-600 dark:text-gray-300">Unlimited transactions</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm text-gray-600 dark:text-gray-300">Premium support</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm text-gray-600 dark:text-gray-300">Advanced analytics</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm text-gray-600 dark:text-gray-300">10 team members</span>
              </div>
            </div>
            
            <div className="mt-6 flex items-center space-x-3">
              <Button variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-50 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-800">
                Cancel Subscription
              </Button>
              <Button variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-800/50 dark:hover:bg-blue-900/20">
                Change Plan
              </Button>
            </div>
          </div>
        </div>
        
        {/* Payment Method */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-medium text-gray-800 dark:text-white">Payment Method</h3>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg mr-4">
                  <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-white">Visa ending in 4242</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Expires 12/2025</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="text-gray-700 border-gray-300 hover:bg-gray-50 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-800">
                Update
              </Button>
            </div>
            
            <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
              <h4 className="font-medium text-gray-800 dark:text-white mb-2">Billing History</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">June 1, 2023</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Invoice #INV-2023-001</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-800 dark:text-white">$49.99</p>
                    <p className="text-xs text-green-600 dark:text-green-400">Paid</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">May 1, 2023</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Invoice #INV-2023-000</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-800 dark:text-white">$49.99</p>
                    <p className="text-xs text-green-600 dark:text-green-400">Paid</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="link" className="text-blue-600 dark:text-blue-400 p-0 h-auto">
                  View all invoices
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountSubscription;
