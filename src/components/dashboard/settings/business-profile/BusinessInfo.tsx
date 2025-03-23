
import React from 'react';
import { Building, Briefcase, Mail, Phone } from 'lucide-react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { BusinessFormValues } from './types';

interface BusinessInfoProps {
  businessForm: UseFormReturn<BusinessFormValues>;
}

const BusinessInfo: React.FC<BusinessInfoProps> = ({ businessForm }) => {
  return (
    <div className="space-y-6">
      <FormField
        control={businessForm.control}
        name="business_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2 text-gray-700">
              <Building className="h-4 w-4 text-gray-500" />
              Business Name
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
        name="business_type"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2 text-gray-700">
              <Briefcase className="h-4 w-4 text-gray-500" />
              Business Type
            </FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="sole_proprietorship">Sole Proprietorship</SelectItem>
                <SelectItem value="partnership">Partnership</SelectItem>
                <SelectItem value="limited_company">Limited Company</SelectItem>
                <SelectItem value="corporation">Corporation</SelectItem>
                <SelectItem value="non_profit">Non-Profit Organization</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={businessForm.control}
        name="business_email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2 text-gray-700">
              <Mail className="h-4 w-4 text-gray-500" />
              Business Email
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
        name="business_phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2 text-gray-700">
              <Phone className="h-4 w-4 text-gray-500" />
              Business Phone Number
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

export default BusinessInfo;
