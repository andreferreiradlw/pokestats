import { Name } from 'pokenode-ts';

const findEnglishName = (names: Name[]): string =>
  names.find(name => name.language.name === 'en').name;

export { findEnglishName };
