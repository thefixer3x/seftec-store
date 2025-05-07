
import React from 'react';

interface DefiHighlightSectionProps {
  extraContent?: React.ReactNode;
}

const DefiHighlightSection = ({ extraContent }: DefiHighlightSectionProps) => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Enterprise DeFi Leadership</h2>
          <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
            Seftec is pioneering secure, compliant access to decentralized finance for enterprise clients
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="p-6 bg-blue-800/40 rounded-xl hover:bg-blue-800/60 transition-colors">
            <div className="font-bold text-xl mb-3">ISO 20022 Compliant</div>
            <p className="opacity-90">Seamlessly integrating traditional banking systems with blockchain-based solutions through industry-standard protocols.</p>
          </div>
          
          <div className="p-6 bg-blue-800/40 rounded-xl hover:bg-blue-800/60 transition-colors">
            <div className="font-bold text-xl mb-3">Enterprise Security</div>
            <p className="opacity-90">Bank-grade security protocols with multi-layer protection and comprehensive risk management for institutional clients.</p>
          </div>
          
          <div className="p-6 bg-blue-800/40 rounded-xl hover:bg-blue-800/60 transition-colors">
            <div className="font-bold text-xl mb-3">Global Partnerships</div>
            <p className="opacity-90">Strategic alliances with leading financial institutions and blockchain networks to deliver unparalleled access and liquidity.</p>
          </div>
        </div>
        
        {/* Display extra content if provided */}
        {extraContent}
      </div>
    </section>
  );
};

export default DefiHighlightSection;
