
import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DefiLeadershipContent: React.FC = () => {
  const { toast } = useToast();
  
  const handleDemoRequest = () => {
    toast({
      title: "Demo Request Received",
      description: "Thank you for your interest. Our team will contact you shortly to schedule a demo.",
    });
  };
  
  return (
    <section className="py-16 bg-seftec-slate dark:bg-seftec-navy/20">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-seftec-navy dark:text-white">
            Ready to Transform Your Enterprise with DeFi?
          </h2>
          
          <p className="text-lg text-seftec-navy/70 dark:text-white/70 mb-8">
            Join the growing number of forward-thinking enterprises leveraging our ISO 20022 compliant 
            DeFi solutions to enhance efficiency, reduce costs, and unlock new opportunities.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={handleDemoRequest} className="bg-seftec-navy dark:bg-gradient-teal-purple text-white">
              Request a Demo
            </Button>
            
            <Link to="/">
              <Button variant="outline" className="group">
                Return to Homepage
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
