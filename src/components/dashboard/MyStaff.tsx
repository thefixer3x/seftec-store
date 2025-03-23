
import React from 'react';
import { ArrowRight, Plus, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Mock data for staff
const staffData = [{
  name: "Hello Abim",
  initials: "HA",
  storeAccess: "Nimmy's store",
  totalSales: "0",
  activity: "Yet to Login"
}, {
  name: "Attendant 2 Abba",
  initials: "AA",
  storeAccess: "Nimmy's store",
  totalSales: "₦1,500.00",
  activity: "Yet to Login"
}];
const MyStaff = () => {
  return <Card className="w-full border border-seftec-navy/10 dark:border-white/10 bg-white/70 dark:bg-white/5 shadow-sm mt-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold text-seftec-navy dark:text-white">Branch Service Managers</CardTitle>
        <Button className="bg-seftec-gold hover:bg-seftec-gold/90 dark:bg-seftec-teal dark:hover:bg-seftec-teal/90 text-white transition-all">
          <Plus className="h-4 w-4 mr-2" />
          Add Branch Manager
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader className="bg-seftec-slate/50 dark:bg-white/5">
            <TableRow>
              <TableHead className="text-seftec-navy dark:text-white">Name</TableHead>
              <TableHead className="text-seftec-navy dark:text-white">Branch Access</TableHead>
              <TableHead className="text-seftec-navy dark:text-white">Total Sales</TableHead>
              <TableHead className="text-seftec-navy dark:text-white">Activity</TableHead>
              <TableHead className="text-seftec-navy dark:text-white">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staffData.map((staff, index) => <TableRow key={index} className="hover:bg-seftec-slate/30 dark:hover:bg-white/5 transition-colors">
                <TableCell>
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2 bg-seftec-gold dark:bg-seftec-teal text-white">
                      <AvatarFallback>{staff.initials}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-seftec-navy dark:text-white">{staff.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-seftec-navy/80 dark:text-white/80">{staff.storeAccess}</TableCell>
                <TableCell className="text-seftec-navy/80 dark:text-white/80">{staff.totalSales}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-seftec-slate/70 dark:bg-white/10 rounded-full text-sm text-seftec-navy/80 dark:text-white/80">
                    {staff.activity}
                  </span>
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
export default MyStaff;
