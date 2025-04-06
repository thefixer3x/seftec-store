
import React from 'react';
import { siteConfig } from '@/config/site';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ComingSoonProps {
  title?: string;
  message?: string;
  showHomeLink?: boolean;
}

const ComingSoon: React.FC<ComingSoonProps> = ({
  title = "Coming Soon",
  message = "We're working hard to bring you an amazing experience. This section of our platform is under development and will be available shortly.",
  showHomeLink = true
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-seftec-slate dark:bg-seftec-darkNavy p-4">
      <div className="max-w-md w-full text-center p-8 bg-white/70 dark:bg-white/5 shadow-lg rounded-lg border border-seftec-navy/10 dark:border-white/10 backdrop-blur-sm">
        <div className="flex justify-center mb-6">
          <Icons.logo className="h-12 w-12 text-seftec-gold dark:text-seftec-teal" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4 text-seftec-navy dark:text-white">{title}</h1>
        
        <p className="text-seftec-navy/70 dark:text-white/70 mb-8">
          {message}
        </p>
        
        {showHomeLink && (
          <Button asChild className="bg-seftec-gold hover:bg-seftec-gold/90 dark:bg-seftec-teal dark:hover:bg-seftec-teal/90">
            <Link to="/">
              Return to Homepage
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default ComingSoon;
