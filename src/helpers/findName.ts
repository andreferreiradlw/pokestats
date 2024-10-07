import type {
  Description,
  Effect,
  FlavorText,
  MoveFlavorText,
  Name,
  VerboseEffect,
} from 'pokenode-ts';

const findEnglishName = (names: Name[]) => names.find(name => name.language.name === 'en')?.name;

const findEnglishDescription = (descriptions: Description[]) =>
  descriptions.find(({ language }) => language.name === 'en')?.description;

const findEnglishEffect = (effects: Effect[]) =>
  effects.find(({ language }) => language.name === 'en')?.effect;

const findEnglishVerboseEffect = (verboseEffects: VerboseEffect[]) =>
  verboseEffects.find(({ language }) => language.name === 'en')?.short_effect;

const findEnglishMoveFlavorText = (flavorTexts: MoveFlavorText[]) =>
  flavorTexts.find(({ language }) => language.name === 'en')?.flavor_text;

const findEnglishFlavorText = (flavorTexts: FlavorText[]) =>
  flavorTexts.find(({ language }) => language.name === 'en')?.flavor_text;

export {
  findEnglishName,
  findEnglishDescription,
  findEnglishEffect,
  findEnglishVerboseEffect,
  findEnglishMoveFlavorText,
  findEnglishFlavorText,
};
