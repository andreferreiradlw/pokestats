import { useSelector } from 'react-redux'
import Link from 'next/link'
// helpers
import { removeDash } from '../../../helpers/typography'
// components
import Box from '../../Box'
// styles
import { BtnAnchor, Title, Arrow, PokemonImg } from './StyledNavigation'

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
    <>
      {allPokemon.length > 0 && (
        <Box
          direction={{ xxs: 'column', sm: 'row' }}
          justify={{ xxs: 'flex-start', sm: 'center' }}
          {...rest}
        >
          {id !== 1 && (
            <Link
              as={`/pokemon/${allPokemon[id - 2].name}`}
              href="/pokemon/[id]"
              passHref
            >
              <BtnAnchor left>
                <Arrow left>
                  <PokemonImg
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                      id - 1
                    }.png`}
                    alt={allPokemon[id - 2].name}
                    height={90}
                    pixelated
                  />
                </Arrow>
                <Title right>
                  <span>{`#${id - 1}`}</span>
                  {removeDash(allPokemon[id - 2].name)}
                </Title>
              </BtnAnchor>
            </Link>
          )}
          {id !== pokemonLength && (
            <Link
              as={`/pokemon/${allPokemon[id].name}`}
              href="/pokemon/[id]"
              passHref
            >
              <BtnAnchor right>
                <Arrow right>
                  <PokemonImg
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                      id + 1
                    }.png`}
                    alt={allPokemon[id].name}
                    height={90}
                    pixelated
                  />
                </Arrow>
                <Title left>
                  <span>{`#${id + 1}`}</span>
                  {removeDash(allPokemon[id].name)}
                </Title>
              </BtnAnchor>
            </Link>
          )}
        </Box>
      )}
    </>
  )
}
