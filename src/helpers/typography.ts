// data
import itemMapData from '@/components/Pokemon/Training/item-icons.json';

// remove underscores and replace with spaces
const removeUnderscore = (str: string): string => str.replace(/_/g, ' ');

// remove dashes
const removeDash = (str: string): string => str.replace(/-/g, ' ');

const formatFlavorText = (text: string): string =>
  text
    .replace(/\u00AD/g, '')
    .replace(/\u000C/g, ' ')
    .replace(/u' -\n'/, ' - ')
    .replace(/u'-\n'/, '-')
    .replace(/(\r\n|\n|\r)/gm, ' ');

const prefixId = (id: number, length = 3): string => id.toString().padStart(length, '0');

// map item pokeapi slug to correct sprites url
const itemMapUrl = (itemSlug: string): string => {
  let itemMatch;

  for (const category of Object.keys(itemMapData)) {
    for (const categoryItem of Object.keys(itemMapData[category])) {
      const currItem = itemMapData[category][categoryItem];
      if (currItem.icon.slug === itemSlug) {
        itemMatch = currItem.icon;
        break;
      }
    }
    if (itemMatch) break;
  }

  // return formatted url
  return itemMatch ? `${itemMatch.set}/${itemMatch.filename}` : 'other-item/poke-doll.png';
};

export { removeUnderscore, removeDash, formatFlavorText, prefixId, itemMapUrl };
