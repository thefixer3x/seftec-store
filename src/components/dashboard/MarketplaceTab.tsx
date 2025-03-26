
import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, ShoppingBag, TrendingUp, FileCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorBoundary } from '@/components/ui/error-boundary';

// Define type-safe interfaces
interface Order {
  id: string;
  product: string;
  value: string;
  distance: string;
  timePosted: string;
  status?: 'pending' | 'complete' | 'cancelled';
}

interface MarketplaceTabProps {
  initialTab?: 'received' | 'bids' | 'offers';
}

// Mock data with improved structure
const orderData: Order[] = [
  { 
    id: "INV - 17", 
    product: "Electronics", 
    value: "$325", 
    distance: "3.2 km", 
    timePosted: "19.4 days",
    status: 'pending'
  },
  { 
    id: "INV - 13", 
    product: "Office Supplies", 
    value: "$125", 
    distance: "5.7 km", 
    timePosted: "43.9 days",
    status: 'complete'
  },
  { 
    id: "INV - 12", 
    product: "Furniture", 
    value: "$850", 
    distance: "1.5 km", 
    timePosted: "43.9 days",
    status: 'pending'
  },
  { 
    id: "INV - 11", 
    product: "American...", 
    value: "$525", 
    distance: "8.3 km", 
    timePosted: "50.5 days",
    status: 'cancelled'
  },
  { 
    id: "INV - 5", 
    product: "ACE ROOT...", 
    value: "$50", 
    distance: "4.2 km", 
    timePosted: "51.6 days",
    status: 'pending'
  },
];

// Table component with error boundary
const OrdersTable = ({ orders }: { orders: Order[] }) => {
  return (
    <ErrorBoundary fallback={<div className="p-8 text-center">Error loading order data. Please try again later.</div>}>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 dark:bg-gray-800">
            <TableHead className="font-medium">Order ID</TableHead>
            <TableHead className="font-medium">Product</TableHead>
            <TableHead className="font-medium">Value</TableHead>
            <TableHead className="font-medium">Distance</TableHead>
            <TableHead className="font-medium">Posted</TableHead>
            <TableHead className="font-medium">Status</TableHead>
            <TableHead className="font-medium">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <TableRow 
                key={index} 
                className={`
                  hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors
                  ${index % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50/50 dark:bg-gray-800/30"}
                `}
              >
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell className="font-medium text-gray-900 dark:text-gray-100">{order.value}</TableCell>
                <TableCell>{order.distance}</TableCell>
                <TableCell className="text-gray-500 dark:text-gray-400">{order.timePosted}</TableCell>
                <TableCell>
                  {order.status === 'pending' && (
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50 border-amber-200">Pending</Badge>
                  )}
                  {order.status === 'complete' && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">Complete</Badge>
                  )}
                  {order.status === 'cancelled' && (
                    <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200">Cancelled</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No orders found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </ErrorBoundary>
  );
};

// Empty state component
const EmptyState = ({ type }: { type: 'bids' | 'offers' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      {type === 'bids' ? (
        <ShoppingBag className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
      ) : (
        <TrendingUp className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
      )}
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
        No {type} found
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-6">
        {type === 'bids' 
          ? "You haven't placed any bids yet. Browse the marketplace to find products to bid on."
          : "You haven't created any offers yet. Create offers to sell your products."}
      </p>
      <Button className="bg-blue-600 hover:bg-blue-700">
        {type === 'bids' ? 'Browse Marketplace' : 'Create Offer'}
      </Button>
    </div>
  );
};

// Loading state component
const TableSkeleton = () => (
  <div className="space-y-3">
    <div className="flex space-x-4 items-center">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Skeleton key={i} className="h-8 w-24" />
      ))}
    </div>
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex space-x-4 items-center mt-4">
        {[1, 2, 3, 4, 5, 6].map((j) => (
          <Skeleton key={j} className="h-6 w-24" />
        ))}
      </div>
    ))}
  </div>
);

// Main component
const MarketplaceTab: React.FC<MarketplaceTabProps> = ({ initialTab = "received" }) => {
  const [activeTab, setActiveTab] = useState<'received' | 'bids' | 'offers'>(initialTab);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate loading
  const handleTabChange = (value: 'received' | 'bids' | 'offers') => {
    setIsLoading(true);
    setActiveTab(value);
    
    // Simulate network request
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div className="flex items-center">
          <Button variant="ghost" className="p-2 mr-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
            <ArrowLeft className="h-5 w-5" />
            <span className="ml-2">Go Back</span>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Marketplace</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Manage your orders, bids, and offers</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" className="border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-400">
            <FileCheck className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <ShoppingBag className="h-4 w-4 mr-2" />
            New Order
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden border-gray-200 dark:border-gray-700 shadow-sm">
        <Tabs 
          defaultValue="received" 
          value={activeTab} 
          onValueChange={(value) => handleTabChange(value as 'received' | 'bids' | 'offers')}
          className="w-full"
        >
          <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30 px-4">
            <TabsList className="w-full justify-start rounded-none bg-transparent p-0">
              <TabsTrigger 
                value="received" 
                className={`rounded-none px-4 py-3 data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 ${activeTab === 'received' ? 'border-blue-600 text-blue-600 font-medium' : 'border-transparent'}`}
              >
                Received Orders
              </TabsTrigger>
              <TabsTrigger 
                value="bids" 
                className={`rounded-none px-4 py-3 data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 ${activeTab === 'bids' ? 'border-blue-600 text-blue-600 font-medium' : 'border-transparent'}`}
              >
                My Bids
              </TabsTrigger>
              <TabsTrigger 
                value="offers" 
                className={`rounded-none px-4 py-3 data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 ${activeTab === 'offers' ? 'border-blue-600 text-blue-600 font-medium' : 'border-transparent'}`}
              >
                My Offers
              </TabsTrigger>
            </TabsList>
          </div>

          <CardContent className="p-0">
            <TabsContent value="received" className="m-0 p-0">
              {isLoading ? (
                <div className="p-6">
                  <TableSkeleton />
                </div>
              ) : (
                <OrdersTable orders={orderData} />
              )}
            </TabsContent>

            <TabsContent value="bids" className="m-0">
              {isLoading ? (
                <div className="p-6">
                  <TableSkeleton />
                </div>
              ) : (
                <EmptyState type="bids" />
              )}
            </TabsContent>

            <TabsContent value="offers" className="m-0">
              {isLoading ? (
                <div className="p-6">
                  <TableSkeleton />
                </div>
              ) : (
                <EmptyState type="offers" />
              )}
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default MarketplaceTab;
