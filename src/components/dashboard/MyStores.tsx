import React from 'react';
import { ArrowRight, AlertTriangle, Plus } from 'lucide-react';
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
  return <Card className="w-full border border-seftec-navy/10 dark:border-white/10 bg-white/70 dark:bg-white/5 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold text-seftec-navy dark:text-white">My Branches (2)</CardTitle>
        <Button className="bg-seftec-gold hover:bg-seftec-gold/90 dark:bg-seftec-teal dark:hover:bg-seftec-teal/90 text-white transition-all">
          <Plus className="h-4 w-4 mr-2" />
          Create Store
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader className="bg-seftec-slate/50 dark:bg-white/5">
            <TableRow>
              <TableHead className="text-seftec-navy dark:text-white">Shop Name</TableHead>
              <TableHead className="text-seftec-navy dark:text-white">Stock Value</TableHead>
              <TableHead className="text-seftec-navy dark:text-white">Stock Count</TableHead>
              <TableHead className="text-seftec-navy dark:text-white">Low Stock</TableHead>
              <TableHead className="text-seftec-navy dark:text-white">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {storeData.map((store, index) => <TableRow key={index} className="hover:bg-seftec-slate/30 dark:hover:bg-white/5 transition-colors">
                <TableCell className="font-medium text-seftec-navy dark:text-white">{store.name}</TableCell>
                <TableCell className="text-seftec-navy/80 dark:text-white/80">{store.stockValue}</TableCell>
                <TableCell className="text-seftec-navy/80 dark:text-white/80">{store.stockCount}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <AlertTriangle className="h-4 w-4 text-seftec-gold dark:text-seftec-teal mr-1" />
                    <span className="text-seftec-navy/80 dark:text-white/80">{store.lowStock}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-seftec-gold/10 dark:hover:bg-seftec-teal/10">
                    <ArrowRight className="h-4 w-4 text-seftec-navy dark:text-white" />
                  </Button>
                </TableCell>
              </TableRow>)}
          </TableBody>
        </Table>
      </CardContent>
    </Card>;
};
export default MyStores;