// Track custom events
export const trackEvent = (
  eventName: string, 
  eventParams: Record<string, any> = {}
) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, eventParams);
  }
};