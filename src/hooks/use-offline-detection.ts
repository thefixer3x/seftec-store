
import { useState, useEffect } from 'react';

// FIXED: Added NetworkInformation interface
interface NetworkInformation {
  effectiveType: string;
  addEventListener: (type: string, listener: EventListener) => void;
  removeEventListener: (type: string, listener: EventListener) => void;
}

/**
 * Hook to detect and monitor network connectivity
 * Provides real-time updates on connection status
 */
export function useOfflineDetection() {
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);
  const [connectionType, setConnectionType] = useState<string | null>(null);

  useEffect(() => {
    // Update offline status
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    // Listen for connection changes
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check for Network Information API support
    if ('connection' in navigator && navigator['connection']) {
      // FIXED: added type assertion for NetworkInformation
      const connection = navigator['connection'] as NetworkInformation;
      
      // Get initial connection type
      setConnectionType(connection.effectiveType);
      
      // Update connection type when it changes
      const handleConnectionChange = () => {
        setConnectionType(connection.effectiveType);
      };
      
      connection.addEventListener('change', handleConnectionChange);
      
      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
        connection.removeEventListener('change', handleConnectionChange);
      };
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Get a human-readable connection status
  const getConnectionStatus = (): string => {
    if (isOffline) return 'Offline';
    
    if (connectionType) {
      switch (connectionType) {
        case 'slow-2g':
        case '2g':
          return 'Poor connection';
        case '3g':
          return 'Fair connection';
        case '4g':
          return 'Good connection';
        default:
          return 'Connected';
      }
    }
    
    return 'Connected';
  };

  return {
    isOffline,
    connectionType,
    connectionStatus: getConnectionStatus()
  };
}
