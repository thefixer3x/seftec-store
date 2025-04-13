
import React from 'react';
import { MainNav } from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { siteConfig } from "@/config/site";
import { Toaster } from "@/components/ui/toaster";

const Cookies = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-seftec-darkNavy pt-[56px]">
      <MainNav items={siteConfig.mainNav} />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-seftec-navy dark:text-white mb-8">Cookies Policy</h1>
          
          <div className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none">
            <p>Our website uses cookies to enhance your browsing experience. This Cookies Policy provides an overview of how we use cookies and your choices regarding them.</p>
            
            <h2>1. What Are Cookies?</h2>
            <p>
              Cookies are small text files stored on your device that help us remember your preferences and actions on our site. They are widely used to make websites work more efficiently and provide valuable information to website owners.
            </p>
            
            <h2>2. How We Use Cookies</h2>
            <ul>
              <li><strong>Essential cookies:</strong> Required for the functioning of our website (e.g., login authentication, session management, shopping cart).</li>
              <li><strong>Analytical cookies:</strong> Help us understand user interactions and improve site performance through data collection about how you use our site.</li>
              <li><strong>Functional cookies:</strong> Allow our website to remember choices you make and provide enhanced, personalized features.</li>
              <li><strong>Marketing cookies:</strong> May be used to personalize advertising content, though we do not sell your data to third parties.</li>
            </ul>
            
            <h2>3. Your Cookie Choices</h2>
            <p>
              You have several options for managing cookies:
            </p>
            <ul>
              <li>Accept all cookies to enjoy the best experience on our site.</li>
              <li>Modify your browser settings to alert you when cookies are being sent or to refuse cookies altogether.</li>
              <li>Use our cookie preference tool (if available) to selectively accept categories of cookies.</li>
            </ul>
            <p>
              Please note that blocking some types of cookies may impact your experience on our site and the services we can offer.
            </p>
            
            <h2>4. Third-Party Cookies</h2>
            <p>
              Our platform may use third-party services that deploy their own cookies. These may include:
            </p>
            <ul>
              <li>Analytics providers (e.g., Google Analytics)</li>
              <li>Social media platforms (when you share content)</li>
              <li>Payment processors</li>
              <li>Advertising networks</li>
            </ul>
            <p>
              Please review their respective privacy policies for more details on how these third parties use your data.
            </p>
            
            <h2>5. Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our business practices. Any changes will be posted on this page, and if the changes are significant, we will provide a more prominent notice.
            </p>
            
            <p className="mt-8">For more information about how we use cookies or if you have any questions about this Cookie Policy, please contact our support team at cookies@seftec.store.</p>
            
            <p className="italic mt-4">Last updated: April 12, 2023</p>
          </div>
        </div>
      </div>

      <Footer />
      <Toaster />
    </div>
  );
};

export default Cookies;
