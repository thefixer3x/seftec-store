
import React from 'react';
import { Link } from 'react-router-dom';
import { MainNav } from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { siteConfig } from '@/config/site';
import { SeftecHub } from '@/components/ui/seftec-hub';

interface DevTestLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const DevTestLayout: React.FC<DevTestLayoutProps> = ({ 
  children, 
  title = "Developer Test", 
  description = "Internal test page for development purposes" 
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNav items={siteConfig.mainNav} />
      
      <div className="container mx-auto px-4 py-2 mt-[56px] border-b border-gray-100 dark:border-gray-800">
        <div className="flex justify-between items-center">
          <SeftecHub />
          <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-3 py-1 rounded-md text-sm">
            Developer Testing Area
          </div>
        </div>
      </div>
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-seftec-navy dark:text-white">{title}</h1>
            <p className="text-seftec-navy/70 dark:text-white/70 mt-1">{description}</p>
          </div>
          
          <div className="mb-6 p-3 bg-gray-100 dark:bg-gray-800/30 rounded-md">
            <nav>
              <ul className="flex flex-wrap gap-2">
                <li>
                  <Link 
                    to="/developer/test/edge-function" 
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Edge Function Test
                  </Link>
                </li>
                {/* Add more test links here as needed */}
              </ul>
            </nav>
          </div>
          
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DevTestLayout;
