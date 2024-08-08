import { useState } from 'react';

// Custom hook for session storage management
export const useSessionState = (key: string, initialValue: string) => {
  const [value, setValue] = useState<string>(() => {
    return sessionStorage.getItem(key) || initialValue;
  });

  const setSessionState = (newValue: string) => {
    setValue(newValue);
    sessionStorage.setItem(key, newValue);
  };

  return [value, setSessionState] as const;
};
