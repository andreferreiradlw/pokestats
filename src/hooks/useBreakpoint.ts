import { useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { Breakpoint } from '@mui/system';

type QueryType = 'up' | 'down' | 'only';

interface UseBreakpointProps {
  breakpoint: Breakpoint;
  queryType?: QueryType;
  onChange?: (matches: boolean) => void;
}

export const useBreakpoint = ({
  breakpoint,
  queryType = 'up',
  onChange,
}: UseBreakpointProps): boolean => {
  const theme = useTheme();

  // Determine the media query based on the queryType
  const query = useMemo(() => {
    switch (queryType) {
      case 'down':
        return theme.breakpoints.down(breakpoint);
      case 'only':
        return theme.breakpoints.only(breakpoint);
      case 'up':
      default:
        return theme.breakpoints.up(breakpoint);
    }
  }, [theme, breakpoint, queryType]);

  // Evaluate the query
  const matches = useMediaQuery(query);

  // Trigger callback if provided
  useMemo(() => {
    if (onChange) {
      onChange(matches);
    }
  }, [matches, onChange]);

  return matches;
};
