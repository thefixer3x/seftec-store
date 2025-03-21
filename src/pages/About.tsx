
import React from 'react';
import { MainNav } from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { siteConfig } from '@/config/site';

const About = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav items={siteConfig.mainNav} />
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-seftec-navy dark:text-white mb-8">About Seftec</h1>
            
            <div className="space-y-6 text-seftec-navy/80 dark:text-white/80">
              <p className="text-lg">
                Seftec is a pioneering B2B marketplace designed specifically for Africa's global trade ecosystem. 
                Our platform leverages cutting-edge technology to connect African businesses with verified partners worldwide.
              </p>

              <h2 className="text-2xl font-semibold text-seftec-navy dark:text-white mt-8 mb-4">Our Mission</h2>
              <p>
                We're on a mission to transform cross-border trade for African businesses by providing a secure, 
                transparent and efficient platform that eliminates traditional barriers to international commerce.
              </p>

              <h2 className="text-2xl font-semibold text-seftec-navy dark:text-white mt-8 mb-4">Our Vision</h2>
              <p>
                To become the leading digital infrastructure powering Africa's participation in global trade, 
                enabling businesses of all sizes to seamlessly connect, transact, and grow internationally.
              </p>

              <h2 className="text-2xl font-semibold text-seftec-navy dark:text-white mt-8 mb-4">Our Team</h2>
              <p>
                Seftec was founded by a team of experts with extensive experience in international trade, 
                fintech, and digital marketplaces. Our diverse team spans multiple countries across Africa 
                and beyond, bringing together the perfect blend of local insight and global expertise.
              </p>

              <div className="bg-seftec-slate/30 dark:bg-seftec-navy/30 p-6 rounded-lg mt-8">
                <h2 className="text-2xl font-semibold text-seftec-navy dark:text-white mb-4">Why Choose Seftec?</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>AI-powered verification for secure and trustworthy partnerships</li>
                  <li>Streamlined cross-border payments and logistics</li>
                  <li>Advanced analytics and market intelligence</li>
                  <li>24/7 support from our experienced trade specialists</li>
                  <li>Tailored solutions for businesses of all sizes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
