import { SpeciesApi } from '@/services';
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { EvolutionChain, EvolutionDetail, PokemonSpecies } from 'pokenode-ts';

export interface EvolutionChainPokestats {
  chainId: number;
  babyTriggerItem: EvolutionChain['baby_trigger_item'];
  firstEvolution: PokemonSpecies | undefined; // Allow null if not found
  secondEvolution: {
    species: PokemonSpecies;
    evolutionDetails: EvolutionDetail[];
    thirdEvolution: {
      species: PokemonSpecies;
      evolutionDetails: EvolutionDetail[];
    }[];
  }[];
}

// Fetch evolution details for a species
const fetchEvolutionDetails = async (
  speciesName: string,
  currentSpecies: PokemonSpecies,
): Promise<PokemonSpecies | null> => {
  return speciesName === currentSpecies.name
    ? currentSpecies
    : await SpeciesApi.getByName(speciesName);
};

// Process third evolution step
const processThirdEvolution = async (
  thirdEvolutions: EvolutionChain['chain']['evolves_to'],
  currentSpecies: PokemonSpecies,
) => {
  if (thirdEvolutions.length === 0) return [];

  return (
    await Promise.all(
      thirdEvolutions.map(async thirdEvolution => {
        const thirdEvolutionData = await fetchEvolutionDetails(
          thirdEvolution.species.name,
          currentSpecies,
        );
        if (thirdEvolutionData) {
          return {
            species: thirdEvolutionData,
            evolutionDetails: thirdEvolution.evolution_details,
          };
        }
        return null;
      }),
    )
  ).filter(
    (evolution): evolution is { species: PokemonSpecies; evolutionDetails: EvolutionDetail[] } =>
      evolution !== null,
  ); // Filter out nulls and ensure correct type
};

// Process second evolution step and nested third evolution step
const processSecondEvolution = async (
  secondEvolutions: EvolutionChain['chain']['evolves_to'],
  currentSpecies: PokemonSpecies,
) => {
  if (secondEvolutions.length === 0) return [];

  return (
    await Promise.all(
      secondEvolutions.map(async secondEvolution => {
        const secondEvolutionData = await fetchEvolutionDetails(
          secondEvolution.species.name,
          currentSpecies,
        );
        if (secondEvolutionData) {
          const thirdEvolution = await processThirdEvolution(
            secondEvolution.evolves_to,
            currentSpecies,
          );
          return {
            species: secondEvolutionData,
            evolutionDetails: secondEvolution.evolution_details,
            thirdEvolution,
          };
        }
        return null;
      }),
    )
  ).filter(
    (
      evolution,
    ): evolution is {
      species: PokemonSpecies;
      evolutionDetails: EvolutionDetail[];
      thirdEvolution: {
        species: PokemonSpecies;
        evolutionDetails: EvolutionDetail[];
      }[];
    } => evolution !== null,
  ); // Filter out nulls and ensure correct type
};

// Main hook to fetch and process the entire evolution chain
export const useEvolutionChain = (
  evolutionChain: EvolutionChain,
  species: PokemonSpecies,
  options?: Partial<UseQueryOptions<EvolutionChainPokestats>>,
): UseQueryResult<EvolutionChainPokestats> =>
  useQuery<EvolutionChainPokestats>({
    queryKey: ['evolutionChain', evolutionChain.id],
    queryFn: async (): Promise<EvolutionChainPokestats> => {
      const firstEvolutionSpecies = evolutionChain.chain.species.name;

      const firstEvolution = await fetchEvolutionDetails(firstEvolutionSpecies, species);

      const secondEvolution = await processSecondEvolution(
        evolutionChain.chain.evolves_to,
        species,
      );

      return {
        chainId: evolutionChain.id,
        babyTriggerItem: evolutionChain.baby_trigger_item,
        firstEvolution: firstEvolution as PokemonSpecies,
        secondEvolution,
      };
    },
    ...options,
  });
