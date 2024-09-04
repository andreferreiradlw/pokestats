// src/context/ThemeContext.tsx
import type { ReactNode } from 'react';
import { createContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import type { ThemeMode } from '@/MuiTheme';
import generateTheme from '@/MuiTheme';

interface ColorModeContextProps {
  toggleColorMode: () => void;
  mode: ThemeMode; // Add mode to the context
}

export const ColorModeContext = createContext<ColorModeContextProps>({
  toggleColorMode: () => {},
  mode: 'light', // Default value for mode
});

interface ThemeContextProviderProps {
  children: ReactNode;
}

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const [mode, setMode] = useState<ThemeMode>('light'); // Default to 'light'
  const [mounted, setMounted] = useState(false); // Track if the component is mounted

  // Function to get initial theme from localStorage or system preference
  const getInitialTheme = (): ThemeMode => {
    const savedMode = localStorage.getItem('theme') as ThemeMode;
    if (savedMode) {
      return savedMode;
    }

    // If no saved theme, check the user's system preference
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDarkMode ? 'dark' : 'light';
  };

  // Set the initial theme on component mount
  useEffect(() => {
    setMode(getInitialTheme());
    setMounted(true); // Indicate that the component has mounted
  }, []);

  // Listen for changes in the user's system theme preference
  useEffect(() => {
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      // Only update if the user has not set a preference
      if (!localStorage.getItem('theme')) {
        setMode(e.matches ? 'dark' : 'light');
      }
    };

    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
    matchMedia.addEventListener('change', handleSystemThemeChange);

    return () => {
      matchMedia.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  const colorMode = useMemo<ColorModeContextProps>(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => {
          const newMode: ThemeMode = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem('theme', newMode); // Save the new mode to localStorage
          return newMode;
        });
      },
      mode, // Provide the current mode
    }),
    [mode], // Add mode as a dependency to ensure it updates correctly
  );

  const theme = useMemo(() => generateTheme(mode), [mode]);

  // Conditionally render the ThemeProvider only after the component has mounted
  if (!mounted) {
    return null;
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
