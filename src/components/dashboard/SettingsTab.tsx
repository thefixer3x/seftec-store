
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Plus, Building, Upload, FileText, Calendar, User, Mail, Phone, MapPin, Key, Shield, Lock } from 'lucide-react';
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
    <div className="w-full space-y-8">
      <div className="flex items-center space-x-4">
        <h1 className="text-3xl font-bold">Settings</h1>
        {verificationStatus === 'pending' && (
          <div className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm flex items-center">
            <FileText size={14} className="mr-1" />
            Verification in progress
          </div>
        )}
        {verificationStatus === 'verified' && (
          <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center">
            <Shield size={14} className="mr-1" />
            Verified Account
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <Tabs 
              orientation="vertical" 
              defaultValue="business" 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="border rounded-lg overflow-hidden shadow-sm"
            >
              <TabsList className="flex flex-col w-full justify-start rounded-none bg-gray-50 p-0">
                <TabsTrigger 
                  value="business" 
                  className={`rounded-none px-6 py-4 justify-start text-left border-l-4 ${activeTab === 'business' ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium' : 'border-transparent'}`}
                >
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-3" />
                    Business Profile
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="personal" 
                  className={`rounded-none px-6 py-4 justify-start text-left border-l-4 ${activeTab === 'personal' ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium' : 'border-transparent'}`}
                >
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-3" />
                    Personal Profile
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="password" 
                  className={`rounded-none px-6 py-4 justify-start text-left border-l-4 ${activeTab === 'password' ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium' : 'border-transparent'}`}
                >
                  <div className="flex items-center">
                    <Lock className="h-4 w-4 mr-3" />
                    Password
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="pin" 
                  className={`rounded-none px-6 py-4 justify-start text-left border-l-4 ${activeTab === 'pin' ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium' : 'border-transparent'}`}
                >
                  <div className="flex items-center">
                    <Key className="h-4 w-4 mr-3" />
                    Pin
                  </div>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="lg:col-span-3">
          <TabsContent value="business" className="mt-0 p-0">
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
                        Shareholders Information
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
          </TabsContent>

          <TabsContent value="personal" className="mt-0 p-0">
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
          </TabsContent>

          <TabsContent value="password" className="mt-0 p-0">
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
          </TabsContent>

          <TabsContent value="pin" className="mt-0 p-0">
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
          </TabsContent>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
