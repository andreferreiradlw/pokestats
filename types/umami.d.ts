interface Window {
  umami?: {
    trackEvent: (eventName: string, eventData?: Record<string, any>) => void;
  };
}
