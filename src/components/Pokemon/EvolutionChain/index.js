import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
// components
import Box from '../../Box'
import Loading from '../../Loading'
import Evolution from './Evolution'
// styles
import { SectionTitle } from '../StyledPokemon'

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
          {!chain.evolves_to.length && <p>This Pokemon does not evolve.</p>}
          <Box direction={{ xxs: 'column', md: 'row' }} sizes={12}>
            <Evolution noArrow species={chain.species} sizes={4} />
            <Box direction="column" sizes={8}>
              {chain.evolves_to.length > 0 &&
                chain.evolves_to.map((firstEvo, i) => (
                  <Box direction="row" key={i}>
                    <Evolution
                      species={firstEvo.species}
                      details={firstEvo.evolution_details}
                    />
                    {firstEvo.evolves_to.length > 0 && (
                      <Box direction="column">
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
          </Box>
        </>
      )}
    </Box>
  )
}
