
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
            <p>Cookies are small text files stored on your device that help us remember your preferences and actions on our site.</p>
            
            <h2>2. How We Use Cookies</h2>
            <ul>
              <li><strong>Essential cookies:</strong> Required for the functioning of our website (e.g., login authentication, session management).</li>
              <li><strong>Analytical cookies:</strong> Help us understand user interactions and improve site performance.</li>
              <li><strong>Marketing cookies:</strong> May be used to personalize advertising content, though we do not sell your data to third parties.</li>
            </ul>
            
            <h2>3. Your Cookie Choices</h2>
            <ul>
              <li>You can manage your cookie preferences through your browser settings.</li>
              <li>Blocking cookies may affect your experience and some functionalities on our site.</li>
            </ul>
            
            <h2>4. Third-Party Cookies</h2>
            <p>Our platform may use third-party services that deploy their own cookies. Please review their respective privacy policies for more details.</p>
            
            <h3>Types of Cookies We Use</h3>
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Category</th>
                  <th className="px-4 py-2 text-left">Purpose</th>
                  <th className="px-4 py-2 text-left">Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">Session Cookies</td>
                  <td className="border px-4 py-2">Enable core functionality such as security, network management, and accessibility</td>
                  <td className="border px-4 py-2">Expire when you close your browser</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Preference Cookies</td>
                  <td className="border px-4 py-2">Store information about your preferences and personalize your experience</td>
                  <td className="border px-4 py-2">1 year</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Analytics Cookies</td>
                  <td className="border px-4 py-2">Help us understand how visitors interact with our website</td>
                  <td className="border px-4 py-2">2 years</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Marketing Cookies</td>
                  <td className="border px-4 py-2">Track your browsing habits to deliver targeted advertising</td>
                  <td className="border px-4 py-2">90 days</td>
                </tr>
              </tbody>
            </table>
            
            <p className="mt-8">For more information about cookies or if you have any questions, please contact our support team at cookies@seftec.store.</p>
            
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
