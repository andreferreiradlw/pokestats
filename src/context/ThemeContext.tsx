import { createContext, useState, useMemo, useEffect, ReactNode } from 'react';
import { createTheme, ThemeProvider, Theme } from '@mui/material/styles';

interface ColorModeContextProps {
  toggleColorMode: () => void;
}

export const ColorModeContext = createContext<ColorModeContextProps>({
  toggleColorMode: () => {},
});

interface ThemeContextProviderProps {
  children: ReactNode;
}

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  // Function to get initial theme from localStorage or system preference
  const getInitialTheme = (): 'light' | 'dark' => {
    const savedMode = localStorage.getItem('theme') as 'light' | 'dark';
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
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem('theme', newMode); // Save the new mode to localStorage
          return newMode;
        });
      },
    }),
    [],
  );

  const theme: Theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
