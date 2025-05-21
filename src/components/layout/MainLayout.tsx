
import React from 'react';
import { MainNav } from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { siteConfig } from '@/config/site';
import { SeftecHub } from '@/components/ui/seftec-hub';

interface MainLayoutProps {
  children: React.ReactNode;
  hideSeftecHub?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, hideSeftecHub = false }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNav items={siteConfig.mainNav} />
      
      {!hideSeftecHub && (
        <div className="container mx-auto px-4 py-2 mt-[56px] border-b border-gray-100 dark:border-gray-800">
          <SeftecHub />
        </div>
      )}
      
      <main className={`flex-grow ${hideSeftecHub ? 'pt-[56px]' : ''}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
