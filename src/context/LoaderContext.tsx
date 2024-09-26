// contexts/LoaderContext.tsx
import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';

// Define the context with a default value
const LoaderContext = createContext<{ loading: boolean }>({ loading: false });

export const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const delay = 250; // Adjust delay as necessary (milliseconds)
  let loadingTimeout: NodeJS.Timeout | null = null;

  useEffect(() => {
    const handleStart = () => {
      // Set a timeout before showing the loader
      loadingTimeout = setTimeout(() => {
        setLoading(true);
      }, delay);
    };

    const handleComplete = () => {
      // Clear the timeout and hide the loader
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
        loadingTimeout = null;
      }
      setLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    // Cleanup event listeners and timeout on component unmount
    return () => {
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
      }
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router, delay]);

  // Memoize the context value to avoid re-creating it on every render
  const contextValue = useMemo(() => ({ loading }), [loading]);

  return <LoaderContext.Provider value={contextValue}>{children}</LoaderContext.Provider>;
};

// Custom hook to use the loader context
export const useLoader = () => useContext(LoaderContext);
