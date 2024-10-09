'use client';

import { useCallback } from 'react';

export function useUmami() {
  const track = useCallback((eventName: string, eventData?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window?.umami) {
      window.umami?.track(eventName, eventData);
    } else {
      console.warn('Umami is not initialized');
    }
  }, []);

  return { track };
}
