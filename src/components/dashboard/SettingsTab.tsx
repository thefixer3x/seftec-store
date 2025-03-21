
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Plus, Building, Upload, FileText, Calendar, User, Mail, Phone, MapPin, Key } from 'lucide-react';
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

const SettingsTab = () => {
  const [activeTab, setActiveTab] = useState("business");
  const [shareholders, setShareholders] = useState<{name: string, ownership: string}[]>([]);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verified' | 'unverified'>('unverified');

  const businessForm = useForm<BusinessFormValues>({
    resolver: zodResolver(businessFormSchema),
    defaultValues: {
      business_name: "Nimmys Double A Global Enterprise",
      business_email: "abiodunadewusi87@yahoo.com",
      business_phone: "08136664520",
      business_address: "21 Shop, Olowofela road, Magboro, Ogun State",
      date_of_incorporation: "19/03/2025",
      rc_number: "7417489"
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
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <Tabs defaultValue="business" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="border-b w-full justify-start rounded-none bg-transparent p-0 mb-6">
          <TabsTrigger 
            value="business" 
            className={`rounded-none px-6 py-3 data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 ${activeTab === 'business' ? 'border-blue-600 text-blue-600 font-medium' : 'border-transparent'}`}
          >
            Business Profile
          </TabsTrigger>
          <TabsTrigger 
            value="personal" 
            className={`rounded-none px-6 py-3 data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 ${activeTab === 'personal' ? 'border-blue-600 text-blue-600 font-medium' : 'border-transparent'}`}
          >
            Personal Profile
          </TabsTrigger>
          <TabsTrigger 
            value="password" 
            className={`rounded-none px-6 py-3 data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 ${activeTab === 'password' ? 'border-blue-600 text-blue-600 font-medium' : 'border-transparent'}`}
          >
            Password
          </TabsTrigger>
          <TabsTrigger 
            value="pin" 
            className={`rounded-none px-6 py-3 data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 ${activeTab === 'pin' ? 'border-blue-600 text-blue-600 font-medium' : 'border-transparent'}`}
          >
            Pin
          </TabsTrigger>
        </TabsList>

        <TabsContent value="business" className="mt-0 p-0">
          <Card className="border shadow-sm">
            <CardContent className="p-8">
              <div className="border-l-4 border-amber-500 pl-4 mb-8">
                <h2 className="text-2xl font-bold">Create your Business Profile</h2>
                {verificationStatus === 'pending' && (
                  <div className="mt-2 bg-amber-50 p-3 rounded border border-amber-200 text-amber-800">
                    <p className="text-sm flex items-center gap-2">
                      <FileText size={16} />
                      Your business verification is in progress. We'll notify you once it's complete.
                    </p>
                  </div>
                )}
                {verificationStatus === 'verified' && (
                  <div className="mt-2 bg-green-50 p-3 rounded border border-green-200 text-green-800">
                    <p className="text-sm flex items-center gap-2">
                      <FileText size={16} />
                      Your business is verified. You now have access to all business features.
                    </p>
                  </div>
                )}
              </div>

              <Form {...businessForm}>
                <form onSubmit={businessForm.handleSubmit(onSubmitBusiness)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <FormField
                        control={businessForm.control}
                        name="business_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Building className="h-4 w-4" />
                              Business Name
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
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
                            <FormLabel className="flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              Business Phone Number
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div>
                        <Label htmlFor="memo" className="flex items-center gap-2">
                          <Upload className="h-4 w-4" />
                          Memo
                        </Label>
                        <div className="mt-1">
                          <Button variant="outline" className="w-full justify-start text-gray-500">
                            Choose File
                            <span className="ml-2 text-gray-400">no file selected</span>
                          </Button>
                        </div>
                      </div>
                      
                      <FormField
                        control={businessForm.control}
                        name="rc_number"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Key className="h-4 w-4" />
                              RC Number
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <FormField
                        control={businessForm.control}
                        name="business_email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              Business Email
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={businessForm.control}
                        name="business_address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              Business Address
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
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
                            <FormLabel className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              Date of Incorporation
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <Label className="flex items-center gap-2 mb-2">
                      <User className="h-4 w-4" />
                      Add shareholders
                    </Label>
                    
                    {shareholders.length > 0 && (
                      <div className="space-y-3 mb-3">
                        {shareholders.map((shareholder, index) => (
                          <div key={index} className="flex gap-3 items-center">
                            <Input 
                              placeholder="Shareholder name" 
                              value={shareholder.name}
                              onChange={(e) => updateShareholder(index, 'name', e.target.value)}
                              className="flex-1"
                            />
                            <Input 
                              placeholder="Ownership %" 
                              value={shareholder.ownership}
                              onChange={(e) => updateShareholder(index, 'ownership', e.target.value)}
                              className="w-32"
                            />
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="sm" 
                              onClick={() => removeShareholder(index)}
                              className="text-red-500"
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
                      className="w-full mt-2 justify-start border-dashed"
                      onClick={addShareholder}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add new shareholder
                    </Button>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" className="bg-amber-500 hover:bg-amber-600">
                      Submit for Verification
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="personal" className="mt-0 p-0">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Personal Profile</h2>
              <p>Manage your personal information here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="password" className="mt-0 p-0">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Password Settings</h2>
              <p>Update your password and security settings.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pin" className="mt-0 p-0">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">PIN Settings</h2>
              <p>Manage your transaction PIN.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsTab;
