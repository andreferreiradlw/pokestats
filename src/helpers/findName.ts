import type { Name } from 'pokenode-ts';

const findEnglishName = (names: Name[]) => names.find(name => name.language.name === 'en')?.name;

export { findEnglishName };
