import type { Item, ItemPocket } from 'pokenode-ts';
import { type GameGenValue, mapGeneration, mapGroupToGeneration } from './gameVersion';
import { formatFlavorText } from './typography';

export interface ExtractedItem {
  attributes: string[];
  category: string;
  cost: Item['cost'];
  shortEntry: string;
  generationIntroduced: string;
  id: Item['id'];
  name: Item['name'];
  sprite: string;
  longEntry: string;
  flavourTextEntries: Item['flavor_text_entries'];
  names: Item['names'];
  fling_effect: Item['fling_effect'];
  fling_power: Item['fling_power'];
  descriptions: {
    description: string;
    versionGroupName: string;
    generation: string;
  }[];
}

export interface FormattedItemPocket {
  categories: string[];
  id: ItemPocket['id'];
  name: ItemPocket['name'];
}

export const formatItemData = (item: Item): ExtractedItem => {
  const {
    attributes,
    category,
    cost,
    effect_entries,
    flavor_text_entries,
    fling_effect,
    fling_power,
    game_indices,
    id,
    name,
    names,
    sprites,
  } = item;

  // Find the English effect entry, if available
  const effectEntry = effect_entries.find(entry => entry.language.name === 'en');
  const shortEntry = effectEntry?.short_effect.replace('Held: ', '') ?? '';
  const longEntry = effectEntry?.effect ?? '';

  // Determine final long entry
  const finalLongEntry = ['Cult vendor trash.', 'Vendor trash.'].includes(longEntry)
    ? shortEntry
    : longEntry;

  // Extract and format generation information
  const firstGen = game_indices[0]?.generation.name as GameGenValue;

  const generationIntroduced = firstGen ? mapGeneration(firstGen) : 'unknown';

  // Extract attribute names
  const attributeNames = attributes.map(attr => attr.name);

  // Filter and map flavor text entries to descriptions
  const descriptions = flavor_text_entries
    .filter(entry => entry.language.name === 'en')
    .map(entry => ({
      description: entry.text,
      versionGroupName: entry.version_group.name,
      // @ts-expect-error: valid group name
      generation: mapGroupToGeneration[entry.version_group.name] ?? 'unknown',
    }));

  return {
    attributes: attributeNames,
    category: category.name ?? 'unknown',
    cost,
    shortEntry,
    generationIntroduced,
    id,
    name,
    sprite: sprites.default ?? '',
    longEntry: formatFlavorText(finalLongEntry),
    flavourTextEntries: flavor_text_entries,
    names,
    fling_effect,
    fling_power,
    descriptions,
  };
};

export const formatItemPocket = (itemPockets: ItemPocket[]): FormattedItemPocket[] =>
  itemPockets.map(({ categories, id, name }) => {
    const categoryNames = categories.map(category => category.name);

    return {
      categories: categoryNames,
      id,
      name,
    };
  });
