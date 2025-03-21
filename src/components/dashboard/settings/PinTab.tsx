
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const PinTab = () => {
  return (
    <Card className="shadow-sm bg-white">
      <CardContent className="p-8">
        <div className="border-l-4 border-green-500 pl-4 mb-6 py-2 bg-green-50 rounded-r">
          <h2 className="text-2xl font-bold text-gray-800">Transaction PIN</h2>
          <p className="text-gray-600 mt-1">Manage your PIN for secure transactions</p>
        </div>
        
        <div className="max-w-md mx-auto">
          <div className="space-y-6">
            <div>
              <Label className="text-gray-700">Current PIN</Label>
              <Input type="password" placeholder="Enter current PIN" className="mt-1 border-gray-300" maxLength={4} />
            </div>
            
            <div>
              <Label className="text-gray-700">New PIN</Label>
              <Input type="password" placeholder="Enter new PIN" className="mt-1 border-gray-300" maxLength={4} />
              <p className="text-xs text-gray-500 mt-1">PIN must be exactly 4 digits</p>
            </div>
            
            <div>
              <Label className="text-gray-700">Confirm New PIN</Label>
              <Input type="password" placeholder="Confirm new PIN" className="mt-1 border-gray-300" maxLength={4} />
            </div>
            
            <div className="pt-4">
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Update PIN
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PinTab;
