import type { LocationArea } from 'pokenode-ts';
import { capitalise } from './typography';
import { findEnglishName } from './findName';

export const parseLocationName = (
  locationArea?: LocationArea,
): { title: string; subtitle?: string } => {
  if (!locationArea) return { title: 'Unknown' };

  const locationName =
    findEnglishName(locationArea.names) ||
    capitalise(locationArea.name.replace(/-area$/, '').replace(/-/g, ' '));

  const match = locationName.match(/(.*?)\s*\(([^)]+)\)/); // Matches content inside parentheses

  return match
    ? { title: match[1].trim(), subtitle: capitalise(match[2].trim()) }
    : { title: locationName.trim(), subtitle: 'Area' };
};
