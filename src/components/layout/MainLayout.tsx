import React from 'react';
import { MainNav } from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { siteConfig } from '@/config/site';
import { SeftecHub } from '@/components/ui/seftec-hub';
interface MainLayoutProps {
  children: React.ReactNode;
  hideSeftecHub?: boolean;
}
const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  hideSeftecHub = false
}) => {
  return <div className="min-h-screen flex flex-col">
      <MainNav items={siteConfig.mainNav} />
      
      {!hideSeftecHub}
      
      <main className={`flex-grow ${hideSeftecHub ? 'pt-[56px]' : ''}`}>
        {children}
      </main>
      <Footer />
    </div>;
};
export default MainLayout;