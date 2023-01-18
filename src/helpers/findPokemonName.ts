import { PokemonSpecies } from 'pokenode-ts';

const findPokemonName = (species: PokemonSpecies): string =>
  species.names.find(name => name.language.name === 'en').name;

export { findPokemonName };
