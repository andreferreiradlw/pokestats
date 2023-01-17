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

const padPokemonId = (id: number): string => id.toString().padStart(3, '0');

export { removeUnderscore, removeDash, formatFlavorText, padPokemonId };
