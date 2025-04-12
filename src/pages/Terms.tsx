
import React from 'react';
import { MainNav } from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { siteConfig } from "@/config/site";
import { Toaster } from "@/components/ui/toaster";

const Terms = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-seftec-darkNavy pt-[56px]">
      <MainNav items={siteConfig.mainNav} />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-seftec-navy dark:text-white mb-8">Terms of Service</h1>
          
          <div className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none">
            <p>Welcome to seftec.store. By accessing and using our platform, you agree to comply with and be bound by the following terms and conditions. Please read these Terms of Service carefully.</p>
            
            <h2>1. Use of Platform</h2>
            <ul>
              <li>You must be at least 18 years old or have the legal consent of a parent/guardian to use our services.</li>
              <li>You agree to use the platform only for lawful purposes and in accordance with these terms.</li>
            </ul>
            
            <h2>2. Account Responsibilities</h2>
            <ul>
              <li>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</li>
              <li>Notify us immediately of any unauthorized use or security breach concerning your account.</li>
            </ul>
            
            <h2>3. Services Provided</h2>
            <ul>
              <li>SeFtec.store offers a range of digital and fintech solutions designed for business and personal financial management.</li>
              <li>We reserve the right to modify or discontinue any service with or without notice.</li>
            </ul>
            
            <h2>4. Intellectual Property</h2>
            <ul>
              <li>All content, designs, trademarks, and logos on seftec.store are the property of their respective owners.</li>
              <li>You may not reproduce, distribute, or create derivative works based on our intellectual property without our express written consent.</li>
            </ul>
            
            <h2>5. Limitation of Liability</h2>
            <ul>
              <li>In no event will seftec.store, its affiliates, or employees be liable for any direct, indirect, incidental, or consequential damages arising from your use of the platform.</li>
              <li>Use the platform at your own risk.</li>
            </ul>
            
            <h2>6. Changes to Terms</h2>
            <ul>
              <li>We may update these terms from time to time. Continued use of the platform constitutes acceptance of any changes.</li>
            </ul>
            
            <p className="mt-8">For more detailed information on our policies or any inquiries, please contact our support team at support@seftec.store.</p>
            
            <p className="italic mt-4">Last updated: April 12, 2023</p>
          </div>
        </div>
      </div>

      <Footer />
      <Toaster />
    </div>
  );
};

export default Terms;
