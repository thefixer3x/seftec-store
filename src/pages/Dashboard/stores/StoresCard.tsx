
import React from 'react';
import { AlertTriangle, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const StoresCard = () => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>My Stores (2)</CardTitle>
          <Button>
            Create Store
          </Button>
        </div>
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
            <TableRow>
              <TableCell className="font-medium">Nimmy's store</TableCell>
              <TableCell>₦820,800.00</TableCell>
              <TableCell>213.92</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <AlertTriangle className="w-4 h-4 text-yellow-500 mr-1" />
                  <span>0</span>
                </div>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">ELLA STORE</TableCell>
              <TableCell>₦32,025.00</TableCell>
              <TableCell>25</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <AlertTriangle className="w-4 h-4 text-yellow-500 mr-1" />
                  <span>0</span>
                </div>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default StoresCard;
