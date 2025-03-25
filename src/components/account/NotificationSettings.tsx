
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Bell, Mail, MessageSquare, DollarSign, AlertTriangle, Info } from 'lucide-react';

const NotificationSettings = () => {
  return (
    <Card className="shadow-sm bg-white dark:bg-seftec-darkNavy/30">
      <CardContent className="p-8">
        <div className="border-l-4 border-indigo-500 pl-4 mb-6 py-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-r">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Notification Preferences</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Customize how you receive notifications</p>
        </div>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4 flex items-center">
              <Mail className="h-5 w-5 mr-2 text-indigo-500" />
              Email Notifications
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="marketing-emails" className="text-gray-700 dark:text-gray-300 cursor-pointer">
                  Marketing emails
                </Label>
                <Switch id="marketing-emails" defaultChecked={true} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="transaction-emails" className="text-gray-700 dark:text-gray-300 cursor-pointer">
                  Transaction confirmations
                </Label>
                <Switch id="transaction-emails" defaultChecked={true} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="security-emails" className="text-gray-700 dark:text-gray-300 cursor-pointer">
                  Security alerts
                </Label>
                <Switch id="security-emails" defaultChecked={true} />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4 flex items-center">
              <Bell className="h-5 w-5 mr-2 text-indigo-500" />
              Push Notifications
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="new-features" className="text-gray-700 dark:text-gray-300 cursor-pointer">
                  New features and updates
                </Label>
                <Switch id="new-features" defaultChecked={true} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="account-activity" className="text-gray-700 dark:text-gray-300 cursor-pointer">
                  Account activity
                </Label>
                <Switch id="account-activity" defaultChecked={true} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="payment-reminders" className="text-gray-700 dark:text-gray-300 cursor-pointer">
                  Payment reminders
                </Label>
                <Switch id="payment-reminders" defaultChecked={true} />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600">
              Save Preferences
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
