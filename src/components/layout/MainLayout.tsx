
import React from 'react';
import { MainNav } from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { ConsentBanner } from '@/components/consent/ConsentBanner';
import { siteConfig } from '@/config/site';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNav items={siteConfig.mainNav} />
      <main className="flex-grow pt-[56px]">
        {children}
      </main>
      <Footer />
      <ConsentBanner />
    </div>
  );
};

export default MainLayout;
