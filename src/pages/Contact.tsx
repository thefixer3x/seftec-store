
import React from 'react';
import { MainNav } from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Contact form submitted');
  };

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav items={siteConfig.mainNav} />
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-seftec-navy dark:text-white mb-8 text-center">Contact Us</h1>
            
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              <div className="bg-white dark:bg-seftec-navy/20 p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold text-seftec-navy dark:text-white mb-6">Get in Touch</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-seftec-navy dark:text-white/80 mb-1">
                      Your Name
                    </label>
                    <Input id="name" placeholder="Enter your name" />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-seftec-navy dark:text-white/80 mb-1">
                      Email Address
                    </label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-seftec-navy dark:text-white/80 mb-1">
                      Subject
                    </label>
                    <Input id="subject" placeholder="What is this regarding?" />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-seftec-navy dark:text-white/80 mb-1">
                      Message
                    </label>
                    <Textarea id="message" placeholder="How can we help you?" rows={4} />
                  </div>
                  
                  <Button type="submit" className="w-full bg-gradient-teal-purple text-white hover:opacity-90">
                    Send Message
                  </Button>
                </form>
              </div>
              
              <div className="flex flex-col justify-between">
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-seftec-navy dark:text-white mb-4">Contact Information</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Mail className="h-5 w-5 text-seftec-gold mt-0.5" />
                      <div>
                        <h3 className="font-medium text-seftec-navy dark:text-white">Email</h3>
                        <p className="text-seftec-navy/70 dark:text-white/70">support@seftechub.com</p>
                        <p className="text-seftec-navy/70 dark:text-white/70">info@seftechub.com</p>
                        <p className="text-seftec-navy/70 dark:text-white/70">partnerships@seftechub.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Phone className="h-5 w-5 text-seftec-purple mt-0.5" />
                      <div>
                        <h3 className="font-medium text-seftec-navy dark:text-white">Phone</h3>
                        <p className="text-seftec-navy/70 dark:text-white/70">+1 (917) 730-4021</p>
                        <p className="text-seftec-navy/70 dark:text-white/70">+234 (803) 999-1110</p>
                        <p className="text-seftec-navy/70 dark:text-white/70">+44 (079) 560-70021</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-seftec-teal mt-0.5" />
                      <div>
                        <h3 className="font-medium text-seftec-navy dark:text-white">Office Locations</h3>
                        <p className="text-seftec-navy/70 dark:text-white/70">Houston TX, USA</p>
                        <p className="text-seftec-navy/70 dark:text-white/70">Lagos, Nigeria</p>
                        <p className="text-seftec-navy/70 dark:text-white/70">London, United Kingdom</p>
                        <p className="text-seftec-navy/70 dark:text-white/70">Dubai, U.A.E.</p>
                        <p className="text-seftec-navy/70 dark:text-white/70">Nairobi, Kenya</p>
                        <p className="text-seftec-navy/70 dark:text-white/70">Cape Town, South Africa</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 bg-seftec-slate/30 dark:bg-seftec-navy/30 p-5 rounded-lg">
                  <h3 className="font-semibold text-seftec-navy dark:text-white mb-2">Business Hours</h3>
                  <p className="text-seftec-navy/70 dark:text-white/70">Monday - Friday: 9AM - 6PM (WAT)</p>
                  <p className="text-seftec-navy/70 dark:text-white/70">Saturday: 10AM - 2PM (WAT)</p>
                  <p className="text-seftec-navy/70 dark:text-white/70">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
