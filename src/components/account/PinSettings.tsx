
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Key, Lock } from 'lucide-react';

const PinSettings = () => {
  return (
    <Card className="shadow-sm bg-white dark:bg-seftec-darkNavy/30">
      <CardContent className="p-8">
        <div className="border-l-4 border-green-500 pl-4 mb-6 py-2 bg-green-50 dark:bg-green-500/10 rounded-r">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Transaction PIN</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Manage your PIN for secure transactions</p>
        </div>
        
        <div className="max-w-md mx-auto">
          <div className="space-y-6">
            <div>
              <Label className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                <Lock className="h-4 w-4 text-green-500" />
                Current PIN
              </Label>
              <Input type="password" placeholder="Enter current PIN" className="mt-1 border-gray-300 dark:border-gray-700 dark:bg-gray-800/50" maxLength={4} />
            </div>
            
            <div>
              <Label className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                <Key className="h-4 w-4 text-green-500" />
                New PIN
              </Label>
              <Input type="password" placeholder="Enter new PIN" className="mt-1 border-gray-300 dark:border-gray-700 dark:bg-gray-800/50" maxLength={4} />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">PIN must be exactly 4 digits</p>
            </div>
            
            <div>
              <Label className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                <Key className="h-4 w-4 text-green-500" />
                Confirm New PIN
              </Label>
              <Input type="password" placeholder="Confirm new PIN" className="mt-1 border-gray-300 dark:border-gray-700 dark:bg-gray-800/50" maxLength={4} />
            </div>
            
            <div className="pt-4">
              <Button className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600">
                Update PIN
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PinSettings;
