
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const DashboardHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="relative max-w-xs">
          <Input 
            type="text" 
            placeholder="Search..." 
            className="pl-9"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={() => navigate('/profile')}>
            Profile
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigate('/')}>
            Go to Website
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
