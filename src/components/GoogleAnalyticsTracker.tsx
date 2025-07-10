import { useGoogleAnalytics } from '../hooks/useGoogleAnalytics';

// This component doesn't render anything, it just tracks page views
const GoogleAnalyticsTracker: React.FC = () => {
  // Use the Google Analytics hook
  useGoogleAnalytics();
  
  // This component doesn't render anything
  return null;
};

export default GoogleAnalyticsTracker;