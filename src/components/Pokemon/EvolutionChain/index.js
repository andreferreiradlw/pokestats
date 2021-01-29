import { useSelector } from 'react-redux'
import { AnimatePresence } from 'framer-motion'
// helpers
import { fadeInUpVariant } from '../../../helpers/animations'
// components
import Box from '../../Box'
import BoxWrapper from '../../Box/StyledBox'
import Loading from '../../Loading'
import Evolution from './Evolution'
// styles
import { SectionTitle, SectionMessage } from '../../BaseStyles'

export default function EvolutionChain({ ...rest }) {
  // evolution
  const pokemonEvo = useSelector(state => state.pokemon.evolution)
  // chain
  const { chain } = pokemonEvo.data

  return (
    <Box align={{ xxs: 'center', lg: 'flex-start' }} {...rest}>
      <SectionTitle>Evolution Chain</SectionTitle>
      <AnimatePresence exitBeforeEnter>
        {pokemonEvo.isLoading && (
          <Loading height="271px" iconWidth="5%" key={`pokemon-evolution`} />
        )}
        {!pokemonEvo.isLoading && !chain.evolves_to.length && (
          <SectionMessage
            initial="hidden"
            animate="show"
            variants={fadeInUpVariant}
            key={`no-pokemon-evolution`}
          >
            This Pokémon does not evolve.
          </SectionMessage>
        )}
        {!pokemonEvo.isLoading && chain.evolves_to.length > 0 && (
          <BoxWrapper
            direction={{ xxs: 'column', lg: 'row' }}
            justify="center"
            align="center"
            width="100%"
          >
            <Evolution noArrow species={chain.species} width="auto" />
            {chain.evolves_to.length > 0 && (
              <Box direction={{ xxs: 'row', lg: 'column' }} sizes={9.6}>
                {chain.evolves_to.map((firstEvo, i) => (
                  <Box
                    direction={{ xxs: 'column', lg: 'row' }}
                    key={`first-evo-box-${i}`}
                  >
                    <Evolution
                      species={firstEvo.species}
                      details={firstEvo.evolution_details}
                      key={`first-evo-${i}`}
                    />
                    {firstEvo.evolves_to.length > 0 && (
                      <Box direction={{ xxs: 'row', lg: 'column' }}>
                        {firstEvo.evolves_to.map((secondEvo, x) => (
                          <Evolution
                            key={`second-evo-${x}`}
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
          </BoxWrapper>
        )}
      </AnimatePresence>
    </Box>
  )
}
