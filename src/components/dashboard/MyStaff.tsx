
import React from 'react';
import { ArrowRight, Plus, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Mock data for staff
const staffData = [
  { 
    name: "Hello Abim", 
    initials: "HA",
    storeAccess: "Nimmy's store", 
    totalSales: "0", 
    activity: "Yet to Login" 
  },
  { 
    name: "Attendant 2 Abba", 
    initials: "AA",
    storeAccess: "Nimmy's store", 
    totalSales: "₦1,500.00", 
    activity: "Yet to Login" 
  },
];

const MyStaff = () => {
  return (
    <Card className="w-full shadow-sm border mt-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">My Staff (2)</CardTitle>
        <Button className="bg-amber-500 hover:bg-amber-600">
          <Plus className="h-4 w-4 mr-2" />
          Add Shop Attendant
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Store Access</TableHead>
              <TableHead>Total Sales</TableHead>
              <TableHead>Activity</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staffData.map((staff, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2 bg-blue-700">
                      <AvatarFallback>{staff.initials}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{staff.name}</span>
                  </div>
                </TableCell>
                <TableCell>{staff.storeAccess}</TableCell>
                <TableCell>{staff.totalSales}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-gray-200 rounded-full text-sm">
                    {staff.activity}
                  </span>
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

export default MyStaff;
