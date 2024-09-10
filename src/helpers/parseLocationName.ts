import { capitalise } from './typography';

export const parseLocationName = (locationName?: string): { title: string; subtitle?: string } => {
  if (!locationName) return { title: 'Unknown' };

  const match = locationName.match(/(.*?)\s*\(([^)]+)\)/); // Matches content inside parentheses

  return match
    ? { title: match[1].trim(), subtitle: capitalise(match[2].trim()) }
    : { title: locationName.trim(), subtitle: 'Location' };
};
