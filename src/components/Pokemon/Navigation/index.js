import { useSelector } from 'react-redux'
import Link from 'next/link'
// helpers
import { removeDash } from '../../../helpers/typography'
// components
import Box from '../../Box'
// styles
import {
  BtnContainer,
  BtnAnchor,
  BtnSpan,
  ArrowLeft,
  ArrowRight,
  PokemonImg,
  NumberID,
} from './StyledNavigation'

export default function Navigation({ ...rest }) {
  // pokemon selector
  const pokemonInfo = useSelector(state => state.pokemon.info)
  // pokemon array
  const allPokemon = useSelector(state => state.home.pokemon)
  // pokemon array length
  const pokemonLength = useSelector(state => state.home.pokemonLength)
  // data
  const { id } = pokemonInfo.data

  return (
    <Box
      direction={{ xxs: 'column', sm: 'row' }}
      justify={{ xxs: 'flex-start', sm: 'center', lg: 'flex-end' }}
      {...rest}
    >
      {id !== 1 && (
        <Link as={`/pokemon/${allPokemon[id - 2].name}`} href="/pokemon/[id]">
          <BtnContainer>
            <BtnAnchor left>
              <BtnSpan isIcon left>
                <PokemonImg
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    id - 1
                  }.png`}
                />
                <ArrowLeft />
              </BtnSpan>
              <BtnSpan isTitle right>
                <NumberID>{`#${id - 1}`}</NumberID>
                {removeDash(allPokemon[id - 2].name)}
              </BtnSpan>
            </BtnAnchor>
          </BtnContainer>
        </Link>
      )}
      {id !== pokemonLength && (
        <Link as={`/pokemon/${allPokemon[id].name}`} href="/pokemon/[id]">
          <BtnContainer>
            <BtnAnchor right>
              <BtnSpan isIcon right>
                <PokemonImg
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    id + 1
                  }.png`}
                />
                <ArrowRight />
              </BtnSpan>
              <BtnSpan isTitle left>
                <NumberID>{`#${id + 1}`}</NumberID>
                {removeDash(allPokemon[id].name)}
              </BtnSpan>
            </BtnAnchor>
          </BtnContainer>
        </Link>
      )}
    </Box>
  )
}
