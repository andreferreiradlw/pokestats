export const formatPokemonId = (number: number): string =>
  number >= 100 ? number.toString() : number.toString().padStart(3, '0');
