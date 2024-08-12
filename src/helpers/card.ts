const formatCardName = (name: string): string =>
  name
    .replace(/\s/g, '-')
    .replace(/[^A-Za-z-]/g, '')
    .toLocaleLowerCase();

export { formatCardName };
