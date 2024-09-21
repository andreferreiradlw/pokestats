import type { GameValue } from '@/helpers';

export interface HeadbuttLocation {
  value: string;
  label: string;
  imageHeight: number;
}

type EncounterType = 'normal' | 'rare';

export interface HeadbuttEncounter {
  name: string;
  id: string;
  games: Set<string>;
  level: number;
  chance: string;
}

type EncounterGroup = {
  [key in EncounterType]: HeadbuttEncounter[];
};

export const headbuttLocations: HeadbuttLocation[] = [
  {
    value: 'azalea-town',
    label: 'Azalea Town',
    imageHeight: 288,
  },
  {
    value: 'ilex-forest',
    label: 'Ilex Forest',
    imageHeight: 864,
  },
  {
    value: 'lake-of-rage',
    label: 'Lake of Rage',
    imageHeight: 576,
  },
  {
    value: 'kanto-route-26',
    label: 'Route 26',
    imageHeight: 1696,
  },
  {
    value: 'kanto-route-27',
    label: 'Route 27',
    imageHeight: 288,
  },
  {
    value: 'kanto-route-29',
    label: 'Route 29',
    imageHeight: 288,
  },
  {
    value: 'johto-route-30',
    label: 'Route 30',
    imageHeight: 864,
  },
  {
    value: 'johto-route-31',
    label: 'route 31',
    imageHeight: 288,
  },
  {
    value: 'johto-route-32',
    label: 'Route 32',
    imageHeight: 1440,
  },
  {
    value: 'johto-route-33',
    label: 'Route 33',
    imageHeight: 320,
  },
  {
    value: 'johto-route-34',
    label: 'Route 34',
    imageHeight: 864,
  },
  {
    value: 'johto-route-35',
    label: 'Route 35',
    imageHeight: 576,
  },
  {
    value: 'johto-route-36',
    label: 'Route 36',
    imageHeight: 288,
  },
  {
    value: 'johto-route-37',
    label: 'Route 37',
    imageHeight: 288,
  },
  {
    value: 'johto-route-38',
    label: 'Route 38',
    imageHeight: 288,
  },
  {
    value: 'johto-route-39',
    label: 'Route 39',
    imageHeight: 576,
  },
  {
    value: 'johto-route-42',
    label: 'Route 42',
    imageHeight: 288,
  },
  {
    value: 'johto-route-43',
    label: 'Route 43',
    imageHeight: 864,
  },
  {
    value: 'johto-route-44',
    label: 'Route 44',
    imageHeight: 280,
  },
  {
    value: 'violet-city',
    label: 'Violet City',
    imageHeight: 576,
  },
];

const forestGroup: EncounterGroup = {
  normal: [
    { name: 'Caterpie', id: '010', games: new Set(['gold']), level: 10, chance: '65%' },
    { name: 'Metapod', id: '011', games: new Set(['gold']), level: 10, chance: '15%' },
    { name: 'Butterfree', id: '012', games: new Set(['gold']), level: 10, chance: '5%' },
    { name: 'Weedle', id: '013', games: new Set(['silver']), level: 10, chance: '65%' },
    { name: 'Kakuna', id: '014', games: new Set(['silver']), level: 10, chance: '15%' },
    { name: 'Beedrill', id: '015', games: new Set(['silver']), level: 10, chance: '5%' },
    { name: 'Exeggcute', id: '102', games: new Set(['gold', 'silver']), level: 10, chance: '15%' },
  ],
  rare: [
    { name: 'Caterpie', id: '010', games: new Set(['gold']), level: 10, chance: '50%' },
    { name: 'Butterfree', id: '012', games: new Set(['gold']), level: 10, chance: '5%' },
    { name: 'Weedle', id: '013', games: new Set(['silver']), level: 10, chance: '50%' },
    { name: 'Beedrill', id: '015', games: new Set(['silver']), level: 10, chance: '5%' },
    { name: 'Exeggcute', id: '102', games: new Set(['gold', 'silver']), level: 10, chance: '15%' },
    { name: 'Pineco', id: '204', games: new Set(['gold', 'silver']), level: 10, chance: '30%' },
  ],
};

const mountainGroup: EncounterGroup = {
  normal: [
    { name: 'Spearow', id: '021', games: new Set(['gold', 'silver']), level: 10, chance: '80%' },
    { name: 'Aipom', id: '190', games: new Set(['gold', 'silver']), level: 10, chance: '20%' },
  ],
  rare: [
    { name: 'Spearow', id: '021', games: new Set(['gold', 'silver']), level: 10, chance: '50%' },
    { name: 'Aipom', id: '190', games: new Set(['gold', 'silver']), level: 10, chance: '20%' },
    { name: 'Heracross', id: '214', games: new Set(['gold', 'silver']), level: 10, chance: '30%' },
  ],
};

const cityGroup: EncounterGroup = {
  normal: [
    { name: 'Venonat', id: '048', games: new Set(['gold', 'silver']), level: 15, chance: '80%' },
    { name: 'Venomoth', id: '049', games: new Set(['gold', 'silver']), level: 15, chance: '5%' },
    { name: 'Abra', id: '063', games: new Set(['gold', 'silver']), level: 15, chance: '15%' },
  ],
  rare: [
    { name: 'Venonat', id: '048', games: new Set(['gold', 'silver']), level: 15, chance: '50%' },
    { name: 'Venomoth', id: '049', games: new Set(['gold', 'silver']), level: 15, chance: '5%' },
    { name: 'Abra', id: '063', games: new Set(['gold', 'silver']), level: 15, chance: '15%' },
    { name: 'Magnemite', id: '081', games: new Set(['gold', 'silver']), level: 15, chance: '30%' },
  ],
};

const mountainGroupCrystal: EncounterGroup = {
  normal: [
    { name: 'Spearow', id: '021', games: new Set(['crystal']), level: 10, chance: '80%' },
    { name: 'Aipom', id: '190', games: new Set(['crystal']), level: 10, chance: '20%' },
  ],
  rare: [
    { name: 'Spearow', id: '021', games: new Set(['crystal']), level: 10, chance: '50%' },
    { name: 'Aipom', id: '190', games: new Set(['crystal']), level: 10, chance: '20%' },
    { name: 'Heracross', id: '214', games: new Set(['crystal']), level: 10, chance: '30%' },
  ],
};

const townGroupCrystal: EncounterGroup = {
  normal: [
    { name: 'Spearow', id: '021', games: new Set(['crystal']), level: 10, chance: '65%' },
    { name: 'Ekans', id: '023', games: new Set(['crystal']), level: 10, chance: '15%' },
    { name: 'Aipom', id: '190', games: new Set(['crystal']), level: 10, chance: '20%' },
  ],
  rare: [
    { name: 'Spearow', id: '021', games: new Set(['crystal']), level: 10, chance: '50%' },
    { name: 'Aipom', id: '190', games: new Set(['crystal']), level: 10, chance: '20%' },
    { name: 'Heracross', id: '214', games: new Set(['crystal']), level: 10, chance: '30%' },
  ],
};

const routeGroupCrystal: EncounterGroup = {
  normal: [
    { name: 'Exeggcute', id: '102', games: new Set(['crystal']), level: 10, chance: '20%' },
    { name: 'Hoothoot', id: '163', games: new Set(['crystal']), level: 10, chance: '50%' },
    { name: 'Ledyba', id: '165', games: new Set(['crystal']), level: 10, chance: '15%' },
    { name: 'Spinarak', id: '167', games: new Set(['crystal']), level: 10, chance: '15%' },
  ],
  rare: [
    { name: 'Exeggcute', id: '102', games: new Set(['crystal']), level: 10, chance: '20%' },
    { name: 'Hoothoot', id: '163', games: new Set(['crystal']), level: 10, chance: '50%' },
    { name: 'Pineco', id: '204', games: new Set(['crystal']), level: 10, chance: '30%' },
  ],
};

const borderGroupCrystal: EncounterGroup = {
  normal: [
    { name: 'Ekans', id: '023', games: new Set(['crystal']), level: 10, chance: '15%' },
    { name: 'Exeggcute', id: '102', games: new Set(['crystal']), level: 10, chance: '20%' },
    { name: 'Hoothoot', id: '163', games: new Set(['crystal']), level: 10, chance: '65%' },
  ],
  rare: [
    { name: 'Exeggcute', id: '102', games: new Set(['crystal']), level: 10, chance: '20%' },
    { name: 'Hoothoot', id: '163', games: new Set(['crystal']), level: 10, chance: '50%' },
    { name: 'Pineco', id: '204', games: new Set(['crystal']), level: 10, chance: '30%' },
  ],
};

const lakeGroupCrystal: EncounterGroup = {
  normal: [
    { name: 'Venonat', id: '048', games: new Set(['crystal']), level: 10, chance: '15%' },
    { name: 'Exeggcute', id: '102', games: new Set(['crystal']), level: 10, chance: '20%' },
    { name: 'Hoothoot', id: '163', games: new Set(['crystal']), level: 10, chance: '65%' },
  ],
  rare: [
    { name: 'Exeggcute', id: '102', games: new Set(['crystal']), level: 10, chance: '20%' },
    { name: 'Hoothoot', id: '163', games: new Set(['crystal']), level: 10, chance: '50%' },
    { name: 'Pineco', id: '204', games: new Set(['crystal']), level: 10, chance: '30%' },
  ],
};

const forestGroupCrystal: EncounterGroup = {
  normal: [
    { name: 'Butterfree', id: '012', games: new Set(['crystal']), level: 10, chance: '5%' },
    { name: 'Beedrill', id: '015', games: new Set(['crystal']), level: 10, chance: '5%' },
    { name: 'Hoothoot', id: '163', games: new Set(['crystal']), level: 10, chance: '50%' },
    { name: 'Noctowl', id: '164', games: new Set(['crystal']), level: 10, chance: '10%' },
    { name: 'Pineco', id: '204', games: new Set(['crystal']), level: 10, chance: '30%' },
  ],
  rare: [
    { name: 'Caterpie', id: '010', games: new Set(['crystal']), level: 10, chance: '15%' },
    { name: 'Metapod', id: '011', games: new Set(['crystal']), level: 10, chance: '5%' },
    { name: 'Weedle', id: '013', games: new Set(['crystal']), level: 10, chance: '15%' },
    { name: 'Kakuna', id: '014', games: new Set(['crystal']), level: 10, chance: '5%' },
    { name: 'Hoothoot', id: '163', games: new Set(['crystal']), level: 10, chance: '60%' },
  ],
};

const areaMappings: {
  [key: string]: { goldSilver: EncounterGroup; crystal?: EncounterGroup };
} = {
  // Gold and Silver mappings
  'azalea-town': { goldSilver: forestGroup, crystal: townGroupCrystal },
  'ilex-forest': { goldSilver: forestGroup, crystal: forestGroupCrystal },
  'lake-of-rage': { goldSilver: forestGroup, crystal: lakeGroupCrystal },
  'kanto-route-26': { goldSilver: forestGroup, crystal: borderGroupCrystal },
  'kanto-route-27': { goldSilver: forestGroup, crystal: borderGroupCrystal },
  'johto-route-34': { goldSilver: forestGroup, crystal: routeGroupCrystal },
  'johto-route-35': { goldSilver: forestGroup, crystal: routeGroupCrystal },
  'johto-route-36': { goldSilver: forestGroup, crystal: routeGroupCrystal },
  'johto-route-37': { goldSilver: forestGroup, crystal: routeGroupCrystal },
  'johto-route-38': { goldSilver: forestGroup, crystal: routeGroupCrystal },
  'johto-route-39': { goldSilver: forestGroup, crystal: routeGroupCrystal },
  'kanto-route-29': { goldSilver: mountainGroup, crystal: routeGroupCrystal },
  'johto-route-30': { goldSilver: mountainGroup, crystal: routeGroupCrystal },
  'johto-route-31': { goldSilver: mountainGroup, crystal: routeGroupCrystal },
  'johto-route-32': { goldSilver: mountainGroup, crystal: borderGroupCrystal },
  'johto-route-33': { goldSilver: mountainGroup, crystal: townGroupCrystal },
  'johto-route-42': { goldSilver: mountainGroup, crystal: townGroupCrystal },
  'johto-route-43': { goldSilver: mountainGroup, crystal: lakeGroupCrystal },
  'johto-route-44': { goldSilver: mountainGroup, crystal: mountainGroupCrystal },
  'johto-route-45': { goldSilver: mountainGroup, crystal: mountainGroupCrystal },
  'johto-route-46': { goldSilver: mountainGroup, crystal: mountainGroupCrystal },
  'new-bark-town': { goldSilver: cityGroup },
  'violet-city': { goldSilver: cityGroup },
  'ecruteak-city': { goldSilver: cityGroup },
  'mahogany-town': { goldSilver: cityGroup },
  'blackthorn-city': { goldSilver: cityGroup },
};

export const mapAreaHeadbuttEncounters = (
  gameVersion: GameValue,
  areaKey?: string,
): EncounterGroup | undefined => {
  if (!areaKey) return undefined;

  const area = areaMappings[areaKey];

  // Early return if area does not exist
  if (!area) return undefined;

  // Directly return crystal encounters if the game version is 'crystal'
  if (gameVersion === 'crystal') return area.crystal;

  // Reference the existing goldSilver group
  const { goldSilver } = area;

  // Filter encounters only if gameVersion is 'gold' or 'silver'
  goldSilver.normal = goldSilver.normal.filter(encounter => encounter.games.has(gameVersion));
  goldSilver.rare = goldSilver.rare.filter(encounter => encounter.games.has(gameVersion));

  // Return the modified goldSilver group
  return goldSilver;
};
