
import React, { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for orders
const orderData = [
  { 
    id: "INV - 17", 
    product: "", 
    value: "", 
    distance: "", 
    timePosted: "19.4 days" 
  },
  { 
    id: "INV - 13", 
    product: "", 
    value: "", 
    distance: "", 
    timePosted: "43.9 days" 
  },
  { 
    id: "INV - 12", 
    product: "", 
    value: "", 
    distance: "", 
    timePosted: "43.9 days" 
  },
  { 
    id: "INV - 11", 
    product: "American...", 
    value: "525", 
    distance: "", 
    timePosted: "50.5 days" 
  },
  { 
    id: "INV - 5", 
    product: "ACE ROOT...", 
    value: "50", 
    distance: "", 
    timePosted: "51.6 days" 
  },
];

const MarketplaceTab = () => {
  const [activeTab, setActiveTab] = useState("received");

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Button variant="ghost" className="p-0 mr-4">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Go Back
          </Button>
          <h1 className="text-2xl font-bold">Marketplace</h1>
        </div>
      </div>

      <Tabs defaultValue="received" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="border-b w-full justify-start rounded-none bg-transparent p-0 mb-6">
          <TabsTrigger 
            value="received" 
            className={`rounded-none px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 ${activeTab === 'received' ? 'border-blue-600 text-blue-600 font-medium' : 'border-transparent'}`}
          >
            Received Orders
          </TabsTrigger>
          <TabsTrigger 
            value="bids" 
            className={`rounded-none px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 ${activeTab === 'bids' ? 'border-blue-600 text-blue-600 font-medium' : 'border-transparent'}`}
          >
            My Bids
          </TabsTrigger>
          <TabsTrigger 
            value="offers" 
            className={`rounded-none px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 ${activeTab === 'offers' ? 'border-blue-600 text-blue-600 font-medium' : 'border-transparent'}`}
          >
            My Offers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="received" className="mt-0 p-0">
          <Card className="border shadow-sm">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Product requested</TableHead>
                    <TableHead>Order Value</TableHead>
                    <TableHead>Distance from you</TableHead>
                    <TableHead>Time Posted</TableHead>
                    <TableHead>View</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderData.map((order, index) => (
                    <TableRow key={index} className={index % 2 === 0 ? "bg-red-50" : ""}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.product}</TableCell>
                      <TableCell>{order.value}</TableCell>
                      <TableCell>{order.distance}</TableCell>
                      <TableCell>{order.timePosted}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bids" className="mt-0 p-0">
          <Card>
            <CardContent className="pt-6">
              <p>No bids found.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="offers" className="mt-0 p-0">
          <Card>
            <CardContent className="pt-6">
              <p>No offers found.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketplaceTab;
