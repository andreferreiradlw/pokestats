import type { Description, Effect, Name, VerboseEffect } from 'pokenode-ts';

const findEnglishName = (names: Name[]) => names.find(name => name.language.name === 'en')?.name;

const findEnglishDescription = (descriptions: Description[]) =>
  descriptions.find(({ language }) => language.name === 'en')?.description;

const findEnglishEffect = (effects: Effect[]) =>
  effects.find(({ language }) => language.name === 'en')?.effect;

const findEnglishVerboseEffect = (verboseEffects: VerboseEffect[]) =>
  verboseEffects.find(({ language }) => language.name === 'en')?.short_effect;

export { findEnglishName, findEnglishDescription, findEnglishEffect, findEnglishVerboseEffect };
