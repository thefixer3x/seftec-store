
import React from 'react';
import { ArrowRight, AlertTriangle, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Mock data for stores
const storeData = [
  { 
    name: "Nimmy's store", 
    stockValue: "₦820,800.00", 
    stockCount: "213.92", 
    lowStock: 0 
  },
  { 
    name: "ELLA STORE", 
    stockValue: "₦32,025.00", 
    stockCount: "25", 
    lowStock: 0 
  },
];

const MyStores = () => {
  return (
    <Card className="w-full shadow-sm border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">My Stores (2)</CardTitle>
        <Button className="bg-amber-500 hover:bg-amber-600">
          <Plus className="h-4 w-4 mr-2" />
          Create Store
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Shop Name</TableHead>
              <TableHead>Stock Value</TableHead>
              <TableHead>Stock Count</TableHead>
              <TableHead>Low Stock</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {storeData.map((store, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{store.name}</TableCell>
                <TableCell>{store.stockValue}</TableCell>
                <TableCell>{store.stockCount}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <AlertTriangle className="h-4 w-4 text-amber-500 mr-1" />
                    <span>{store.lowStock}</span>
                  </div>
                </TableCell>
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
  );
};

export default MyStores;
