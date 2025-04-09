
import React from 'react';
import { Search } from 'lucide-react';

const FAQSearch = () => {
  return (
    <div className="mb-10 relative">
      <div className="relative">
        <input 
          type="text" 
          placeholder="Search the FAQ..." 
          className="w-full py-3 px-5 pl-12 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-seftec-darkNavy/50 focus:outline-none focus:ring-2 focus:ring-seftec-gold dark:focus:ring-seftec-teal"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
      </div>
    </div>
  );
};

export default FAQSearch;
