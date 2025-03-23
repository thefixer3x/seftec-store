
import React from 'react';
import { ArrowRight, AlertTriangle, Plus, StoreIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Mock data for stores
const storeData = [{
  name: "Nimmy's store",
  stockValue: "₦820,800.00",
  stockCount: "213.92",
  lowStock: 0
}, {
  name: "ELLA STORE",
  stockValue: "₦32,025.00",
  stockCount: "25",
  lowStock: 0
}];
const MyStores = () => {
  return (
    <Card className="w-full border border-seftec-navy/10 dark:border-white/10 bg-white/90 dark:bg-white/5 shadow-md rounded-xl overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2 bg-gradient-to-r from-seftec-slate/50 to-white/50 dark:from-seftec-darkNavy/70 dark:to-seftec-navy/50 border-b border-seftec-navy/10 dark:border-white/10">
        <div className="flex items-center">
          <StoreIcon className="h-5 w-5 mr-2 text-seftec-gold dark:text-seftec-teal" />
          <CardTitle className="text-xl font-bold text-seftec-navy dark:text-white">My Branches (2)</CardTitle>
        </div>
        <Button className="bg-gradient-to-r from-seftec-gold to-seftec-gold/80 hover:from-seftec-gold/90 hover:to-seftec-gold/70 dark:from-seftec-teal dark:to-seftec-purple dark:hover:from-seftec-teal/90 dark:hover:to-seftec-purple/90 text-white transition-all shadow-sm">
          <Plus className="h-4 w-4 mr-2" />
          Create Branch
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-seftec-slate/30 dark:bg-white/5">
            <TableRow>
              <TableHead className="text-seftec-navy font-semibold dark:text-white">Branch Name</TableHead>
              <TableHead className="text-seftec-navy font-semibold dark:text-white">Stock Value</TableHead>
              <TableHead className="text-seftec-navy font-semibold dark:text-white">Stock Count</TableHead>
              <TableHead className="text-seftec-navy font-semibold dark:text-white">Low Stock</TableHead>
              <TableHead className="text-seftec-navy font-semibold dark:text-white">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {storeData.map((store, index) => (
              <TableRow 
                key={index} 
                className="hover:bg-seftec-slate/20 dark:hover:bg-white/5 transition-colors border-b border-seftec-navy/5 dark:border-white/5 last:border-0"
              >
                <TableCell className="font-medium text-seftec-navy dark:text-white py-4">{store.name}</TableCell>
                <TableCell className="text-seftec-navy/80 dark:text-white/80">{store.stockValue}</TableCell>
                <TableCell className="text-seftec-navy/80 dark:text-white/80">{store.stockCount}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <AlertTriangle className="h-4 w-4 text-seftec-gold dark:text-seftec-teal mr-1" />
                    <span className="text-seftec-navy/80 dark:text-white/80">{store.lowStock}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full hover:bg-seftec-gold/10 dark:hover:bg-seftec-teal/10 transition-all"
                  >
                    <ArrowRight className="h-4 w-4 text-seftec-navy dark:text-white" />
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
