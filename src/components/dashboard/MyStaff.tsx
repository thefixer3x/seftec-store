
import React from 'react';
import { Plus, Users, Inbox } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const MyStaff = () => {
  return (
    <Card className="w-full border border-seftec-navy/10 dark:border-white/10 bg-white/90 dark:bg-white/5 shadow-md rounded-xl overflow-hidden mt-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2 bg-gradient-to-r from-seftec-slate/50 to-white/50 dark:from-seftec-darkNavy/70 dark:to-seftec-navy/50 border-b border-seftec-navy/10 dark:border-white/10">
        <div className="flex items-center">
          <Users className="h-5 w-5 mr-2 text-seftec-gold dark:text-seftec-teal" />
          <CardTitle className="text-xl font-bold text-seftec-navy dark:text-white">Branch Service Managers</CardTitle>
        </div>
        <Button disabled className="bg-gradient-to-r from-seftec-gold to-seftec-gold/80 dark:from-seftec-teal dark:to-seftec-purple text-white transition-all shadow-sm opacity-50 cursor-not-allowed">
          <Plus className="h-4 w-4 mr-2" />
          Add Branch Manager
        </Button>
      </CardHeader>
      <CardContent className="py-12">
        <div className="flex flex-col items-center justify-center text-center">
          <Inbox className="h-12 w-12 text-seftec-navy/20 dark:text-white/20 mb-4" />
          <h3 className="text-lg font-medium text-seftec-navy/70 dark:text-white/70 mb-1">No staff members yet</h3>
          <p className="text-sm text-seftec-navy/50 dark:text-white/50 max-w-sm">
            Staff management will be available once branches are configured.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MyStaff;
