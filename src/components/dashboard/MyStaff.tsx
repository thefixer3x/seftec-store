
import React from 'react';
import { ArrowRight, Plus, Users } from 'lucide-react';
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
  return (
    <Card className="w-full border border-seftec-navy/10 dark:border-white/10 bg-white/90 dark:bg-white/5 shadow-md rounded-xl overflow-hidden mt-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2 bg-gradient-to-r from-seftec-slate/50 to-white/50 dark:from-seftec-darkNavy/70 dark:to-seftec-navy/50 border-b border-seftec-navy/10 dark:border-white/10">
        <div className="flex items-center">
          <Users className="h-5 w-5 mr-2 text-seftec-gold dark:text-seftec-teal" />
          <CardTitle className="text-xl font-bold text-seftec-navy dark:text-white">Branch Service Managers</CardTitle>
        </div>
        <Button className="bg-gradient-to-r from-seftec-gold to-seftec-gold/80 hover:from-seftec-gold/90 hover:to-seftec-gold/70 dark:from-seftec-teal dark:to-seftec-purple dark:hover:from-seftec-teal/90 dark:hover:to-seftec-purple/90 text-white transition-all shadow-sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Branch Manager
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-seftec-slate/30 dark:bg-white/5">
            <TableRow>
              <TableHead className="text-seftec-navy font-semibold dark:text-white">Name</TableHead>
              <TableHead className="text-seftec-navy font-semibold dark:text-white">Branch Access</TableHead>
              <TableHead className="text-seftec-navy font-semibold dark:text-white">Total Sales</TableHead>
              <TableHead className="text-seftec-navy font-semibold dark:text-white">Activity</TableHead>
              <TableHead className="text-seftec-navy font-semibold dark:text-white">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staffData.map((staff, index) => (
              <TableRow 
                key={index} 
                className="hover:bg-seftec-slate/20 dark:hover:bg-white/5 transition-colors border-b border-seftec-navy/5 dark:border-white/5 last:border-0"
              >
                <TableCell>
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2 bg-gradient-to-r from-seftec-gold to-seftec-gold/70 dark:from-seftec-teal dark:to-seftec-purple text-white shadow-sm">
                      <AvatarFallback>{staff.initials}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-seftec-navy dark:text-white">{staff.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-seftec-navy/80 dark:text-white/80">{staff.storeAccess}</TableCell>
                <TableCell className="text-seftec-navy/80 dark:text-white/80">{staff.totalSales}</TableCell>
                <TableCell>
                  <span className="px-2.5 py-1 bg-seftec-slate/50 dark:bg-white/10 rounded-full text-xs font-medium text-seftec-navy/80 dark:text-white/80 shadow-sm">
                    {staff.activity}
                  </span>
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
export default MyStaff;
