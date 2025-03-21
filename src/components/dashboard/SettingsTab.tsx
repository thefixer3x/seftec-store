
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';

const SettingsTab = () => {
  const [activeTab, setActiveTab] = useState("business");

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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="business-name">Business Name</Label>
                    <Input 
                      id="business-name" 
                      defaultValue="Nimmys Double A Global Enterprise" 
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="business-phone">Business Phone Number</Label>
                    <Input 
                      id="business-phone" 
                      defaultValue="08136664520" 
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="memo">Memo</Label>
                    <div className="mt-1">
                      <Button variant="outline" className="w-full justify-start text-gray-500">
                        Choose File
                        <span className="ml-2 text-gray-400">no file selected</span>
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="rc-number">RC Number</Label>
                    <Input 
                      id="rc-number" 
                      defaultValue="7417489" 
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="business-email">Business Email</Label>
                    <Input 
                      id="business-email" 
                      defaultValue="abiodunadewusi87@yahoo.com" 
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="business-address">Business Address</Label>
                    <Input 
                      id="business-address" 
                      defaultValue="21 Shop, Olowofela road, Magboro, Ogun State" 
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="date">Date of Incorporation</Label>
                    <Input 
                      id="date" 
                      type="text"
                      defaultValue="19/03/2025" 
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Label>Add shareholders</Label>
                <Button variant="outline" className="w-full mt-2 justify-start border-dashed">
                  <Plus className="h-4 w-4 mr-2" />
                  Add new shareholder
                </Button>
              </div>
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
