import React from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-[56px]">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;