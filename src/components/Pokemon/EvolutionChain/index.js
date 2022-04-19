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
  const { chain, id: chainId } = pokemonEvo.data

  return (
    <Box align={{ xxs: 'center', lg: 'flex-start' }} {...rest}>
      <SectionTitle>Evolution Chain</SectionTitle>
      {!pokemonEvo.isLoading && chain && !chain.evolves_to.length && (
        <SectionMessage
          initial="hidden"
          animate="show"
          variants={fadeInUpVariant}
          key={`no-pokemon-evolution-${chainId}`}
        >
          This Pokémon does not evolve.
        </SectionMessage>
      )}
      <AnimatePresence exitBeforeEnter>
        {pokemonEvo.isLoading && (
          <Loading
            height="271px"
            iconWidth="5%"
            key={`pokemon-evolution-${chainId}`}
          />
        )}
        {!pokemonEvo.isLoading && chain && (
          <BoxWrapper
            direction={{ xxs: 'column', lg: 'row' }}
            justify="center"
            align="center"
            width="100%"
          >
            <Evolution noArrow species={chain.species} width="auto" />
            {chain.evolves_to.length > 0 && (
              <Box
                direction={{ xxs: 'row', lg: 'column' }}
                $flexWrap={{ xxs: 'wrap', lg: 'nowrap' }}
                sizes={9.6}
              >
                {chain.evolves_to.map((firstEvo, i) => (
                  <Box
                    direction={{ xxs: 'column', lg: 'row' }}
                    align={{ xxs: 'flex-end', lg: 'center' }}
                    key={`first-evo-box-${i}-${chainId}`}
                    width={{ xxs: '200px', lg: '100%' }}
                  >
                    <Evolution
                      species={firstEvo.species}
                      details={firstEvo.evolution_details}
                      key={`first-evo-${i}-${chainId}`}
                    />
                    {firstEvo.evolves_to.length > 0 && (
                      <Box
                        direction={{ xxs: 'row', lg: 'column' }}
                        align={{ xxs: 'flex-end', lg: 'center' }}
                      >
                        {firstEvo.evolves_to.map((secondEvo, x) => (
                          <Evolution
                            key={`second-evo-${x}-${chainId}`}
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
