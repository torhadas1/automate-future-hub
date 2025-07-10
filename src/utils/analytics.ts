// Declare gtag as a global function
declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      params?: Record<string, any>
    ) => void;
  }
}

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', 'G-SJQ2MH92LH', {
      page_path: url,
      page_title: title || document.title
    });
  }
};

// Track custom events
export const trackEvent = (
  eventName: string, 
  eventParams: Record<string, any> = {}
) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, eventParams);
    console.log(`🔍 Tracked event: ${eventName}`, eventParams);
  }
};