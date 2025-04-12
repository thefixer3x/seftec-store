
import React from 'react';
import { MainNav } from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { siteConfig } from "@/config/site";
import { Toaster } from "@/components/ui/toaster";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-seftec-darkNavy pt-[56px]">
      <MainNav items={siteConfig.mainNav} />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-seftec-navy dark:text-white mb-8">Privacy Policy</h1>
          
          <div className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none">
            <p>We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data.</p>
            
            <h2>1. Information Collection</h2>
            <ul>
              <li>We collect personal information such as your name, email address, and payment details when you register or make a purchase.</li>
              <li>Usage data, including IP addresses and browsing behavior, is collected to improve our services.</li>
            </ul>
            
            <h2>2. Use of Information</h2>
            <ul>
              <li>Your information is used to provide and personalize our services, process transactions, and communicate updates.</li>
              <li>We may use aggregated data for analytical purposes but will never disclose personally identifiable information without your consent unless required by law.</li>
            </ul>
            
            <h2>3. Data Security</h2>
            <ul>
              <li>We implement robust security measures to protect your information from unauthorized access and disclosure.</li>
              <li>Although we strive to use commercially acceptable means to secure your data, we cannot guarantee its absolute security.</li>
            </ul>
            
            <h2>4. Data Sharing and Disclosure</h2>
            <ul>
              <li>We do not sell, trade, or rent your personal information to third parties.</li>
              <li>Data may be shared with trusted service providers under strict confidentiality agreements, only as necessary to provide our services.</li>
            </ul>
            
            <h2>5. Your Rights</h2>
            <ul>
              <li>You have the right to access, correct, or delete your personal information by contacting our support team.</li>
              <li>Changes to this policy will be communicated through updates on our website.</li>
            </ul>
            
            <p className="mt-8">For more detailed information on our privacy practices or any inquiries, please contact our support team at privacy@seftec.store.</p>
            
            <p className="italic mt-4">Last updated: April 12, 2023</p>
          </div>
        </div>
      </div>

      <Footer />
      <Toaster />
    </div>
  );
};

export default Privacy;
