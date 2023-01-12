const formatFlavorText = (text: string): string =>
  text
    .replace(/\u00AD/g, '')
    .replace(/\u000C/g, ' ')
    .replace(/u' -\n'/, ' - ')
    .replace(/u'-\n'/, '-')
    .replace(/(\r\n|\n|\r)/gm, ' ');

export { formatFlavorText };
