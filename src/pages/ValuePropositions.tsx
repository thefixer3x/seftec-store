
import React from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import ValuePropositionsSection from '@/components/sections/ValuePropositionsSection';
import ValuePropositionsDashboard from '@/components/sections/ValuePropositionsDashboard';

const ValuePropositions = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <ValuePropositionsSection />
        <ValuePropositionsDashboard />
      </main>
      <Footer />
    </div>
  );
};

export default ValuePropositions;
