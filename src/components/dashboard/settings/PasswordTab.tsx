
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const PasswordTab = () => {
  return (
    <Card className="shadow-sm bg-white">
      <CardContent className="p-8">
        <div className="border-l-4 border-purple-500 pl-4 mb-6 py-2 bg-purple-50 rounded-r">
          <h2 className="text-2xl font-bold text-gray-800">Password Settings</h2>
          <p className="text-gray-600 mt-1">Update your password and security settings</p>
        </div>
        
        <div className="max-w-md mx-auto">
          <div className="space-y-6">
            <div>
              <Label className="text-gray-700">Current Password</Label>
              <Input type="password" placeholder="Enter current password" className="mt-1 border-gray-300" />
            </div>
            
            <div>
              <Label className="text-gray-700">New Password</Label>
              <Input type="password" placeholder="Enter new password" className="mt-1 border-gray-300" />
              <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters long</p>
            </div>
            
            <div>
              <Label className="text-gray-700">Confirm New Password</Label>
              <Input type="password" placeholder="Confirm new password" className="mt-1 border-gray-300" />
            </div>
            
            <div className="pt-4">
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Update Password
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PasswordTab;
