// remove underscores and replace with spaces
const removeUnderscore = (str: string): string => str.replace(/_/g, ' ');

// remove dashes
const removeDash = (str: string): string => str.replace(/-/g, ' ');

export { removeUnderscore, removeDash };
