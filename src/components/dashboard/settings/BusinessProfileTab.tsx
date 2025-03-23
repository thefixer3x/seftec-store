import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Building, Upload, FileText, Calendar, User, Mail, Phone, MapPin, Key, Shield } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const businessFormSchema = z.object({
  business_name: z.string().min(1, 'Business name is required'),
  business_email: z.string().email('Invalid email address'),
  business_phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  business_address: z.string().min(1, 'Business address is required'),
  date_of_incorporation: z.string().min(1, 'Date of incorporation is required'),
  rc_number: z.string().min(1, 'RC Number is required'),
});

type BusinessFormValues = z.infer<typeof businessFormSchema>;

interface BusinessProfileTabProps {
  verificationStatus: 'pending' | 'verified' | 'unverified';
  setVerificationStatus: (status: 'pending' | 'verified' | 'unverified') => void;
}

const BusinessProfileTab = ({ verificationStatus, setVerificationStatus }: BusinessProfileTabProps) => {
  const [shareholders, setShareholders] = useState<{name: string, ownership: string}[]>([]);

  const businessForm = useForm<BusinessFormValues>({
    resolver: zodResolver(businessFormSchema),
    defaultValues: {
      business_name: "Example Business Ltd",
      business_email: "contact@examplebusiness.com",
      business_phone: "1234567890",
      business_address: "123 Business Street, City, Country",
      date_of_incorporation: "01/01/2023",
      rc_number: "RC123456"
    }
  });

  const addShareholder = () => {
    setShareholders([...shareholders, {name: '', ownership: ''}]);
  };

  const updateShareholder = (index: number, field: 'name' | 'ownership', value: string) => {
    const updatedShareholders = [...shareholders];
    updatedShareholders[index][field] = value;
    setShareholders(updatedShareholders);
  };

  const removeShareholder = (index: number) => {
    const updatedShareholders = [...shareholders];
    updatedShareholders.splice(index, 1);
    setShareholders(updatedShareholders);
  };

  const onSubmitBusiness = (data: BusinessFormValues) => {
    console.log("Business data submitted:", data);
    console.log("Shareholders:", shareholders);
    setVerificationStatus('pending');
    // In a real app, you would submit this data to your backend
  };

  return (
    <Card className="border shadow-sm bg-white">
      <CardContent className="p-8">
        <div className="border-l-4 border-amber-500 pl-4 mb-8 py-2 bg-amber-50 rounded-r">
          <h2 className="text-2xl font-bold text-gray-800">Business Profile</h2>
          <p className="text-gray-600 mt-1">Complete your business information for verification</p>
          
          {verificationStatus === 'pending' && (
            <div className="mt-3 flex items-start gap-2 text-amber-800">
              <FileText size={16} className="mt-0.5 flex-shrink-0" />
              <p className="text-sm">
                Your business verification is in progress. We'll notify you once it's complete.
              </p>
            </div>
          )}
          {verificationStatus === 'verified' && (
            <div className="mt-3 flex items-start gap-2 text-green-800">
              <Shield size={16} className="mt-0.5 flex-shrink-0" />
              <p className="text-sm">
                Your business is verified. You now have access to all business features.
              </p>
            </div>
          )}
        </div>

        <Form {...businessForm}>
          <form onSubmit={businessForm.handleSubmit(onSubmitBusiness)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 mt-8">
              <Label className="flex items-center gap-2 mb-4 text-gray-800 font-medium">
                <User className="h-4 w-4" />
                Directors/Shareholders Information
              </Label>
              
              {shareholders.length > 0 && (
                <div className="space-y-4 mb-4">
                  {shareholders.map((shareholder, index) => (
                    <div key={index} className="flex gap-3 items-center bg-white p-3 rounded-md border border-gray-200">
                      <Input 
                        placeholder="Shareholder name" 
                        value={shareholder.name}
                        onChange={(e) => updateShareholder(index, 'name', e.target.value)}
                        className="flex-1 border-gray-300"
                      />
                      <Input 
                        placeholder="Ownership %" 
                        value={shareholder.ownership}
                        onChange={(e) => updateShareholder(index, 'ownership', e.target.value)}
                        className="w-32 border-gray-300"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        onClick={() => removeShareholder(index)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              
              <Button 
                type="button" 
                variant="outline" 
                className="w-full justify-start border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50"
                onClick={addShareholder}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add new shareholder
              </Button>
            </div>
            
            <div>
              <Label htmlFor="memo" className="flex items-center gap-2 text-gray-700 mb-2">
                <Upload className="h-4 w-4 text-gray-500" />
                Business Registration Document
              </Label>
              <div className="mt-1">
                <Button variant="outline" className="w-full justify-start text-gray-500 border-gray-300 hover:bg-gray-50">
                  Choose File
                  <span className="ml-2 text-gray-400">no file selected</span>
                </Button>
                <p className="text-xs text-gray-500 mt-1">Upload your business registration certificate (PDF format)</p>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Submit for Verification
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default BusinessProfileTab;
