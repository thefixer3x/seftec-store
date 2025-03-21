
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const PersonalProfileTab = () => {
  return (
    <Card className="shadow-sm bg-white">
      <CardContent className="p-8">
        <div className="border-l-4 border-blue-500 pl-4 mb-6 py-2 bg-blue-50 rounded-r">
          <h2 className="text-2xl font-bold text-gray-800">Personal Profile</h2>
          <p className="text-gray-600 mt-1">Manage your personal information</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label className="text-gray-700">First Name</Label>
              <Input defaultValue="John" className="mt-1 border-gray-300" />
            </div>
            <div>
              <Label className="text-gray-700">Email Address</Label>
              <Input defaultValue="john.doe@example.com" className="mt-1 border-gray-300" />
            </div>
            <div>
              <Label className="text-gray-700">Phone Number</Label>
              <Input defaultValue="+1234567890" className="mt-1 border-gray-300" />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label className="text-gray-700">Last Name</Label>
              <Input defaultValue="Doe" className="mt-1 border-gray-300" />
            </div>
            <div>
              <Label className="text-gray-700">Address</Label>
              <Input defaultValue="123 Main St, City" className="mt-1 border-gray-300" />
            </div>
            <div>
              <Label className="text-gray-700">Country</Label>
              <Input defaultValue="United States" className="mt-1 border-gray-300" />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end mt-8 pt-4 border-t border-gray-100">
          <Button className="bg-blue-600 hover:bg-blue-700">
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalProfileTab;
