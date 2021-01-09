import { useSelector } from 'react-redux'
// components
import Box from '../../Box'
import Loading from '../../Loading'
import Evolution from './Evolution'
// styles
import { SectionTitle, SectionMessage } from '../StyledPokemon'

export default function EvolutionChain({ ...rest }) {
  // evolution
  const pokemonEvo = useSelector(state => state.pokemon.evolution)
  // chain
  const { chain } = pokemonEvo.data

  return (
    <Box align={{ xxs: 'center', lg: 'flex-start' }} {...rest}>
      <SectionTitle>Evolution Chain</SectionTitle>
      {pokemonEvo.isLoading ? (
        <Loading />
      ) : (
        <>
          {!chain.evolves_to.length && (
            <SectionMessage>This Pokémon does not evolve.</SectionMessage>
          )}
          <Box direction={{ xxs: 'column', lg: 'row' }} sizes={12}>
            <Evolution
              noArrow
              species={chain.species}
              grow={false}
              width="auto"
            />
            {chain.evolves_to.length > 0 && (
              <Box direction={{ xxs: 'row', lg: 'column' }} sizes={9.6}>
                {chain.evolves_to.map((firstEvo, i) => (
                  <Box direction={{ xxs: 'column', lg: 'row' }} key={i}>
                    <Evolution
                      species={firstEvo.species}
                      details={firstEvo.evolution_details}
                    />
                    {firstEvo.evolves_to.length > 0 && (
                      <Box direction={{ xxs: 'row', lg: 'column' }}>
                        {firstEvo.evolves_to.map((secondEvo, x) => (
                          <Evolution
                            key={x}
                            species={secondEvo.species}
                            details={secondEvo.evolution_details}
                          />
                        ))}
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </>
      )}
    </Box>
  )
}
