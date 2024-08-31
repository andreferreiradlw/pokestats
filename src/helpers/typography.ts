// capitalises first letter of every word
const capitalise = (str: string): string => str.replace(/(^\w|\s\w)/g, m => m.toUpperCase());

// remove underscores and replace with spaces
const removeUnderscore = (str: string): string => str.replace(/_/g, ' ');

// remove dashes
const removeDash = (str: string): string => {
  if (!str.includes('-')) return str; // Early return if no dashes are found
  return str.replace(/-/g, ' ');
};

// return text between parenthesis
const betweentParenthesis = (str: string): string => {
  const match = str.match(/\((.*)\)/)?.pop();
  // if no parenthesis, return original str
  return match || null;
};

// formats game ROMs flavor text
const formatFlavorText = (text: string): string =>
  text
    .replace(/\u00AD/g, '')
    .replace(/\u000C/g, ' ')
    .replace(/u' -\n'/, ' - ')
    .replace(/u'-\n'/, '-')
    .replace(/(\r\n|\n|\r)/gm, ' ');

// prefixes id with zeros by length
const prefixId = (id: number, length = 3): string => id.toString().padStart(length, '0');

const createSentence = (elements: string[], lastDivider = 'and', prefix = 'has'): string => {
  if (elements.length === 0) return ''; // Handle empty array
  if (elements.length === 1) return `${prefix} ${elements[0]}`; // Handle single element

  const allButLastTwo = elements.slice(0, -2); // All elements except the last two
  const lastTwo = elements.slice(-2).join(` ${lastDivider} `); // Last two elements joined by the lastDivider

  const middlePart = allButLastTwo.length ? `${allButLastTwo.join(', ')}, ` : ''; // Middle part with comma separation if there are more than two elements

  return `${prefix} ${middlePart}${lastTwo}`; // Construct the final sentence
};

export {
  capitalise,
  removeUnderscore,
  removeDash,
  betweentParenthesis,
  formatFlavorText,
  prefixId,
  createSentence,
};
