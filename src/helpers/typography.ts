// capitalise 1st letter of the string
export const capitalize = (string: string): string =>
  string.charAt(0).toUpperCase() + string.slice(1);

// remove underscores and replace with spaces
export const removeUnderscore = (string: string): string => {
  const words = string.split('_');

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }

  return words.join(' ');
};

// remove dashes
export const removeDash = (string: string): string => {
  const words = string.split('-');

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }

  return words.join(' ');
};
