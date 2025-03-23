
import React from 'react';
import { MapPin, Calendar, Key, Hash } from 'lucide-react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { BusinessFormValues } from './types';

interface RegistrationInfoProps {
  businessForm: UseFormReturn<BusinessFormValues>;
}

const RegistrationInfo: React.FC<RegistrationInfoProps> = ({ businessForm }) => {
  return (
    <div className="space-y-6">
      <FormField
        control={businessForm.control}
        name="business_address"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2 text-gray-700">
              <MapPin className="h-4 w-4 text-gray-500" />
              Business Address
            </FormLabel>
            <FormControl>
              <Input {...field} className="border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={businessForm.control}
        name="date_of_incorporation"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2 text-gray-700">
              <Calendar className="h-4 w-4 text-gray-500" />
              Date of Incorporation
            </FormLabel>
            <FormControl>
              <Input {...field} className="border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={businessForm.control}
        name="rc_number"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2 text-gray-700">
              <Key className="h-4 w-4 text-gray-500" />
              RC Number
            </FormLabel>
            <FormControl>
              <Input {...field} className="border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={businessForm.control}
        name="tax_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2 text-gray-700">
              <Hash className="h-4 w-4 text-gray-500" />
              Tax Identification Number (TIN)
            </FormLabel>
            <FormControl>
              <Input {...field} className="border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default RegistrationInfo;
