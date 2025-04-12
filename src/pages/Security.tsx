
import React from 'react';
import { MainNav } from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { siteConfig } from "@/config/site";
import { Toaster } from "@/components/ui/toaster";
import { Shield, Lock, Bell, RefreshCw } from 'lucide-react';

const Security = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-seftec-darkNavy pt-[56px]">
      <MainNav items={siteConfig.mainNav} />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-seftec-navy dark:text-white mb-8">Security Policy</h1>
          
          <div className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none">
            <p>Security is paramount at seftec.store. Our Security Policy outlines our commitment to protecting your data and ensuring a secure environment.</p>
            
            <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-seftec-slate/50 dark:bg-white/5 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <Shield className="h-6 w-6 text-seftec-gold dark:text-seftec-teal mr-3" />
                  <h2 className="text-xl font-bold text-seftec-navy dark:text-white m-0">Security Measures</h2>
                </div>
                <ul className="pl-5 mt-2 space-y-2">
                  <li>We use encryption protocols (such as SSL/TLS) to protect data in transit.</li>
                  <li>Regular security audits and vulnerability assessments are performed to safeguard our systems.</li>
                  <li>Access controls are in place to ensure that only authorized personnel can access sensitive information.</li>
                </ul>
              </div>
              
              <div className="bg-seftec-slate/50 dark:bg-white/5 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <Bell className="h-6 w-6 text-seftec-gold dark:text-seftec-teal mr-3" />
                  <h2 className="text-xl font-bold text-seftec-navy dark:text-white m-0">Incident Response</h2>
                </div>
                <ul className="pl-5 mt-2 space-y-2">
                  <li>In the event of a security breach, we have an incident response plan to mitigate harm, notify affected users, and take corrective measures.</li>
                  <li>We encourage users to report any security concerns or potential vulnerabilities.</li>
                </ul>
              </div>
              
              <div className="bg-seftec-slate/50 dark:bg-white/5 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <Lock className="h-6 w-6 text-seftec-gold dark:text-seftec-teal mr-3" />
                  <h2 className="text-xl font-bold text-seftec-navy dark:text-white m-0">User Responsibilities</h2>
                </div>
                <ul className="pl-5 mt-2 space-y-2">
                  <li>Users are responsible for maintaining the security of their login credentials.</li>
                  <li>Immediately report any suspicious activities or security incidents to us.</li>
                </ul>
              </div>
              
              <div className="bg-seftec-slate/50 dark:bg-white/5 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <RefreshCw className="h-6 w-6 text-seftec-gold dark:text-seftec-teal mr-3" />
                  <h2 className="text-xl font-bold text-seftec-navy dark:text-white m-0">Continuous Improvement</h2>
                </div>
                <ul className="pl-5 mt-2 space-y-2">
                  <li>Our security measures are continuously reviewed and updated to meet evolving threats.</li>
                  <li>Feedback and security assessments help us enhance our defenses.</li>
                </ul>
              </div>
            </div>
            
            <h2>Data Protection</h2>
            <p>We implement advanced measures to protect all data stored within our systems:</p>
            <ul>
              <li><strong>Data Encryption:</strong> All sensitive data is encrypted both in transit and at rest</li>
              <li><strong>Secure Infrastructure:</strong> Our platform is hosted on secure, ISO-certified cloud infrastructure with multiple redundancies</li>
              <li><strong>Regular Backups:</strong> Automated backup procedures ensure data can be recovered in case of any incident</li>
              <li><strong>Access Controls:</strong> Strict role-based access controls limit who can view or modify data</li>
            </ul>
            
            <h2>Security Compliance</h2>
            <p>Our security practices align with industry standards and regulations:</p>
            <ul>
              <li>PCI DSS compliance for payment processing</li>
              <li>GDPR compliance for data protection</li>
              <li>Regular third-party security audits</li>
              <li>Continuous vulnerability scanning and penetration testing</li>
            </ul>
            
            <h2>Reporting Security Issues</h2>
            <p>If you discover a security vulnerability or have concerns about the security of our platform, please contact us immediately at security@seftec.store. We take all reports seriously and will investigate promptly.</p>
            
            <p className="mt-8">For more information about our security practices or any security-related inquiries, please contact our security team at security@seftec.store.</p>
            
            <p className="italic mt-4">Last updated: April 12, 2023</p>
          </div>
        </div>
      </div>

      <Footer />
      <Toaster />
    </div>
  );
};

export default Security;
