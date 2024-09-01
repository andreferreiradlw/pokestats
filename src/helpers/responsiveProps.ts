import { Theme } from '@mui/material/styles';

// Helper function to generate responsive styles
export const responsivePropsV2 =
  (
    property: string, // The CSS property to be responsive (e.g., 'width', 'height')
    values: string | number | Record<string, string | number>, // Values can be a string, number, or an object with breakpoints
  ) =>
  ({ theme }: { theme: Theme }) => {
    if (!values) throw new Error('No values provided for responsive props!');

    // Helper function to convert values to the appropriate format
    const getValue = (value: string | number) => {
      if (typeof value === 'number') {
        // Use theme.spacing for numeric values
        return theme.spacing(value);
      }
      return value;
    };

    // Handle single string or numeric values
    if (typeof values === 'string' || typeof values === 'number') {
      return `${property}: ${getValue(values)};`;
    }

    // Handle object values with breakpoints
    if (typeof values === 'object') {
      const styles: Record<string, any> = {};

      Object.keys(values).forEach(breakpoint => {
        const breakpointValue = values[breakpoint as keyof typeof values];
        if (
          breakpointValue !== undefined &&
          theme.breakpoints.values[breakpoint as keyof Theme['breakpoints']['values']] !== undefined
        ) {
          // Apply styles directly for the smallest breakpoint
          if (breakpoint === 'xxs') {
            styles[property] = getValue(breakpointValue);
          } else {
            // Use MUI's breakpoint utility for other breakpoints
            styles[theme.breakpoints.up(breakpoint as keyof Theme['breakpoints']['values'])] = {
              [property]: getValue(breakpointValue),
            };
          }
        }
      });

      return styles;
    }

    return undefined;
  };
