
import React from 'react';
import ComingSoon from '@/components/ui/coming-soon';
import { useLocation } from 'react-router-dom';

const ComingSoonPage = () => {
  const location = useLocation();
  const subdomain = window.location.hostname.split('.')[0];
  
  // Customize the message based on the subdomain
  const getCustomMessage = () => {
    if (subdomain === 'app') {
      return "The SefTec dashboard is coming soon! Our team is currently building a powerful business management interface to help you streamline your operations.";
    } else if (subdomain === 'api') {
      return "The SefTec API service is under development. Developers will soon be able to integrate with our powerful business tools.";
    } else {
      return "This section of our platform is under development and will be available shortly.";
    }
  };

  return (
    <ComingSoon 
      title={`${subdomain.toUpperCase()} - Coming Soon`}
      message={getCustomMessage()}
      showHomeLink={true}
    />
  );
};

export default ComingSoonPage;
