import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Declare gtag as a global function
declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      params?: { 
        page_path?: string;
        page_location?: string;
        page_title?: string;
        [key: string]: any;
      }
    ) => void;
  }
}

export const useGoogleAnalytics = () => {
  const location = useLocation();
  
  useEffect(() => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', 'G-SJQ2MH92LH', {
        page_path: location.pathname + location.search,
        page_location: window.location.href,
        page_title: document.title
      });
    }
  }, [location]);
};