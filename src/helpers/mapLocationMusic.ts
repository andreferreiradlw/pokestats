import type { GameGenValue } from './gameVersion';

const mapGen1Music = (locationKey: string) => {
  // Define a mapping from locationKey to the corresponding music file
  const locationMapping: Record<string, string> = {
    'pallet-town': 'pallet-town',
    'kanto-route-1': 'route-1',
    'kanto-route-2': 'route-1',
    'pewter-city': 'viridian-city',
    'viridian-city': 'viridian-city',
    'saffron-city': 'viridian-city',
    'seafoam-islands': 'viridian-forest',
    'viridian-forest': 'viridian-forest',
    'digletts-cave': 'viridian-forest',
    'mt-moon': 'mt-moon',
    'rock-tunnel': 'mt-moon',
    'kanto-victory-road-2': 'mt-moon',
    'kanto-route-3': 'route-3',
    'kanto-route-4': 'route-3',
    'kanto-route-5': 'route-3',
    'kanto-route-6': 'route-3',
    'kanto-route-7': 'route-3',
    'kanto-route-8': 'route-3',
    'kanto-route-9': 'route-3',
    'kanto-route-10': 'route-3',
    'kanto-route-16': 'route-3',
    'kanto-route-17': 'route-3',
    'kanto-route-18': 'route-3',
    'kanto-sea-route-19': 'route-3',
    'kanto-sea-route-20': 'route-3',
    'kanto-sea-route-21': 'route-3',
    'kanto-route-22': 'route-3',
    'kanto-route-24': 'route-24',
    'kanto-route-25': 'route-24',
    'kanto-route-11': 'route-11',
    'kanto-route-12': 'route-11',
    'kanto-route-13': 'route-11',
    'kanto-route-14': 'route-11',
    'kanto-route-15': 'route-11',
    'cerulean-city': 'cerulean-city',
    'fuchsia-city': 'cerulean-city',
    'vermilion-city': 'vermilion-city',
    'lavender-town': 'lavender-town',
    'pokemon-tower': 'pokemon-tower',
    'pokemon-mansion': 'pokemon-mansion',
    'celadon-city': 'celadon-city',
    'kanto-safari-zone': 'safari-zone',
    'cinnabar-island': 'cinnabar-island',
    'kanto-route-23': 'victory-road',
    'indigo-plateau': 'victory-road',
    'power-plant': 'rocket-hideout',
    'cerulean-cave': 'rocket-hideout',
  };

  return locationMapping[locationKey] || undefined;
};

export const mapLocationMusic = (generation: GameGenValue, locationKey: string) => {
  let trackUrl: string | undefined;

  if (generation === 'generation-i') {
    trackUrl = mapGen1Music(locationKey);
  }

  return trackUrl
    ? new Audio(
        `https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/music/${generation}/${trackUrl}.mp3`,
      )
    : undefined;
};
