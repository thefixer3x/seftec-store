
import React from 'react';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { Link } from 'react-router-dom';
import { Shield, Lock, ExternalLink } from 'lucide-react';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer
      className={cn(
        'py-12 bg-seftec-slate dark:bg-seftec-darkNavy border-t border-seftec-navy/10 dark:border-white/10',
        className
      )}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Link 
              to="/" 
              className="text-2xl font-bold text-seftec-navy dark:text-white flex items-center mb-4"
            >
              <Icons.logo className="h-6 w-6 text-seftec-gold mr-2" />
              <span className="font-bold text-seftec-navy dark:text-white">
                Seftec.<span className="text-seftec-gold">Store</span>
              </span>
            </Link>
            <p className="text-seftec-navy/70 dark:text-white/70 mb-6">
              A secure, AI-driven B2B marketplace that enables businesses to connect with verified partners worldwide.
            </p>
            
            {/* Security badges */}
            <div className="flex flex-col space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-xs text-seftec-navy/80 dark:text-white/80">
                <Shield size={14} className="text-green-600" />
                <span>256-bit SSL Encryption</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-seftec-navy/80 dark:text-white/80">
                <Lock size={14} className="text-green-600" />
                <span>Secure Payment Processing</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-seftec-navy dark:text-white mb-4">Platform</h3>
            <ul className="space-y-3">
              <li><Link to="/biz-tools" className="text-seftec-navy/70 hover:text-seftec-navy dark:text-white/70 dark:hover:text-white transition-colors">Features</Link></li>
              <li><Link to="/solutions" className="text-seftec-navy/70 hover:text-seftec-navy dark:text-white/70 dark:hover:text-white transition-colors">Solutions</Link></li>
              <li><Link to="/value-propositions" className="text-seftec-navy/70 hover:text-seftec-navy dark:text-white/70 dark:hover:text-white transition-colors">Value Propositions</Link></li>
              <li><a href="#" className="text-seftec-navy/70 hover:text-seftec-navy dark:text-white/70 dark:hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-seftec-navy dark:text-white mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-seftec-navy/70 hover:text-seftec-navy dark:text-white/70 dark:hover:text-white transition-colors">About</Link></li>
              <li><a href="#" className="text-seftec-navy/70 hover:text-seftec-navy dark:text-white/70 dark:hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-seftec-navy/70 hover:text-seftec-navy dark:text-white/70 dark:hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-seftec-navy/70 hover:text-seftec-navy dark:text-white/70 dark:hover:text-white transition-colors">Press</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-seftec-navy dark:text-white mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="text-seftec-navy/70 dark:text-white/70">
                <a href="mailto:info@seftec.tech" className="hover:text-seftec-navy dark:hover:text-white transition-colors">
                  info@seftec.tech
                </a>
              </li>
              <li>
                <Link to="/contact" className="text-seftec-navy/70 hover:text-seftec-navy dark:text-white/70 dark:hover:text-white transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <a href="#" className="text-seftec-navy/70 hover:text-seftec-navy dark:text-white/70 dark:hover:text-white transition-colors">
                  Documentation
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-seftec-navy/10 dark:border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-seftec-navy/70 dark:text-white/70 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Seftec Dynamics. All rights reserved.
          </div>
          
          <div className="flex flex-wrap space-x-6">
            <Link to="/terms" className="text-seftec-navy/70 hover:text-seftec-navy dark:text-white/70 dark:hover:text-white transition-colors text-sm">Terms</Link>
            <Link to="/privacy" className="text-seftec-navy/70 hover:text-seftec-navy dark:text-white/70 dark:hover:text-white transition-colors text-sm">Privacy</Link>
            <Link to="/cookies" className="text-seftec-navy/70 hover:text-seftec-navy dark:text-white/70 dark:hover:text-white transition-colors text-sm">Cookies</Link>
            <Link to="/security" className="text-seftec-navy/70 hover:text-seftec-navy dark:text-white/70 dark:hover:text-white transition-colors text-sm">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
