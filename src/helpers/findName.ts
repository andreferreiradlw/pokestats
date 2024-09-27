import type { Description, Effect, Name } from 'pokenode-ts';

const findEnglishName = (names: Name[]) => names.find(name => name.language.name === 'en')?.name;

const findEnglishDescription = (names: Description[]) =>
  names.find(name => name.language.name === 'en')?.description;

const findEnglishEffect = (names: Effect[]) =>
  names.find(name => name.language.name === 'en')?.effect;

export { findEnglishName, findEnglishDescription, findEnglishEffect };
