
import React from 'react';
import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer
      className={cn(
        'py-12 bg-seftec-slate border-t border-seftec-navy/10',
        className
      )}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <a 
              href="/" 
              className="text-2xl font-bold text-seftec-navy flex items-center mb-4"
            >
              <span className="mr-1">Seftec</span>
              <span className="text-seftec-gold">.Store</span>
            </a>
            <p className="text-seftec-navy/70 mb-6">
              A secure, AI-driven B2B marketplace that enables businesses to connect with verified partners worldwide.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-seftec-navy mb-4">Platform</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-seftec-navy/70 hover:text-seftec-navy transition-colors">Features</a></li>
              <li><a href="#" className="text-seftec-navy/70 hover:text-seftec-navy transition-colors">Solutions</a></li>
              <li><a href="#" className="text-seftec-navy/70 hover:text-seftec-navy transition-colors">Enterprise</a></li>
              <li><a href="#" className="text-seftec-navy/70 hover:text-seftec-navy transition-colors">Pricing</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-seftec-navy mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-seftec-navy/70 hover:text-seftec-navy transition-colors">About</a></li>
              <li><a href="#" className="text-seftec-navy/70 hover:text-seftec-navy transition-colors">Careers</a></li>
              <li><a href="#" className="text-seftec-navy/70 hover:text-seftec-navy transition-colors">Blog</a></li>
              <li><a href="#" className="text-seftec-navy/70 hover:text-seftec-navy transition-colors">Press</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-seftec-navy mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="text-seftec-navy/70">hello@seftec.store</li>
              <li className="text-seftec-navy/70">Support</li>
              <li className="text-seftec-navy/70">Documentation</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-seftec-navy/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-seftec-navy/70 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Seftec Dynamics. All rights reserved.
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-seftec-navy/70 hover:text-seftec-navy transition-colors">Terms</a>
            <a href="#" className="text-seftec-navy/70 hover:text-seftec-navy transition-colors">Privacy</a>
            <a href="#" className="text-seftec-navy/70 hover:text-seftec-navy transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
