
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const PersonalProfileTab = () => {
  const { profile } = useAuth();
  
  return (
    <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-seftec-darkNavy/80 shadow-sm">
      <CardContent className="p-6">
        <div className="border-l-4 border-blue-500 dark:border-blue-400 pl-4 mb-6 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-r">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Personal Profile</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Manage your personal information</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                <User className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                First Name
              </Label>
              <Input defaultValue={profile?.first_name || "John"} className="mt-1" />
            </div>
            <div>
              <Label className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                <Mail className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                Email Address
              </Label>
              <Input defaultValue="john.doe@example.com" className="mt-1" />
            </div>
            <div>
              <Label className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                <Phone className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                Phone Number
              </Label>
              <Input defaultValue="+1234567890" className="mt-1" />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                <User className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                Last Name
              </Label>
              <Input defaultValue={profile?.last_name || "Doe"} className="mt-1" />
            </div>
            <div>
              <Label className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                <MapPin className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                Address
              </Label>
              <Input defaultValue="123 Main St, City" className="mt-1" />
            </div>
            <div>
              <Label className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                <Globe className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                Country
              </Label>
              <Input defaultValue="United States" className="mt-1" />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end mt-8 pt-4 border-t border-gray-100 dark:border-gray-700">
          <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white">
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalProfileTab;
