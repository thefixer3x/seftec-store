
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building } from 'lucide-react';

const BankAccountInfo = () => {
  return (
    <Card className="bg-white shadow-sm border">
      <CardContent className="p-4 flex items-center space-x-4">
        <div className="font-mono text-sm bg-gray-100 px-3 py-2 rounded">1234567890</div>
        <div className="text-sm">Example Bank</div>
        <div className="text-sm font-medium">COMPANY XYZ</div>
        <Button variant="ghost" size="icon" className="ml-auto">
          <Building className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default BankAccountInfo;
