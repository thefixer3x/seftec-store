
import React, { useState } from 'react';
import { siteConfig } from '@/config/site';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';

interface ComingSoonProps {
  title?: string;
  message?: string;
  showHomeLink?: boolean;
  showNotifyForm?: boolean;
}

const emailSchema = z.string().email({ message: "Please enter a valid email address" });

const ComingSoon: React.FC<ComingSoonProps> = ({
  title = "Coming Soon",
  message = "We're working hard to bring you an amazing experience. This section of our platform is under development and will be available shortly.",
  showHomeLink = true,
  showNotifyForm = true
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(null);
    
    try {
      // Validate email
      emailSchema.parse(email);
      
      setIsSubmitting(true);
      
      // Simulated API call - would connect to a real endpoint in production
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success notification
      toast({
        title: "Thank you!",
        description: "We'll notify you when we launch.",
        duration: 5000,
      });
      
      setEmail('');
    } catch (error) {
      if (error instanceof z.ZodError) {
        setEmailError(error.errors[0].message);
      } else {
        setEmailError("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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
        
        {showNotifyForm && (
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-grow">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full ${emailError ? 'border-red-500' : ''}`}
                  aria-label="Email for notification"
                />
                {emailError && (
                  <p className="text-red-500 text-xs mt-1 text-left">{emailError}</p>
                )}
              </div>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-seftec-gold hover:bg-seftec-gold/90 dark:bg-seftec-teal dark:hover:bg-seftec-teal/90"
              >
                {isSubmitting ? "Submitting..." : "Notify Me"}
              </Button>
            </div>
          </form>
        )}
        
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
