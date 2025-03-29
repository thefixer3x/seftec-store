
import React from 'react';
import { 
  Card, 
  CardContent,
  CardTitle, 
  CardDescription, 
  CardHeader,
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';

export const ProfileSettings = () => {
  const { user, profile } = useAuth();
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Profile Settings</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Manage your personal profile information
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input 
            id="firstName" 
            defaultValue={profile?.first_name || ""} 
            placeholder="Enter your first name"
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input 
            id="lastName" 
            defaultValue={profile?.last_name || ""} 
            placeholder="Enter your last name"
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input 
            id="email" 
            type="email"
            defaultValue={user?.email || ""} 
            disabled
            className="mt-1 bg-gray-100 dark:bg-gray-800"
          />
          <small className="text-gray-500 dark:text-gray-400 mt-1 block">
            Email cannot be changed. Contact support for assistance.
          </small>
        </div>
        
        <div>
          <Label htmlFor="company">Company Name</Label>
          <Input 
            id="company" 
            defaultValue={profile?.company_name || ""} 
            placeholder="Enter your company name"
            className="mt-1"
          />
        </div>
      </div>
      
      <div className="pt-4 flex justify-end">
        <Button className="bg-seftec-gold hover:bg-seftec-gold/90 dark:bg-seftec-teal dark:hover:bg-seftec-teal/90">
          Save Changes
        </Button>
      </div>
    </div>
  );
};
