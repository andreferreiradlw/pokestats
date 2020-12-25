import { useSelector } from 'react-redux'
// components
import Loading from '../../../Loading'
import Box from '../../../Box'
//helpers
import { capitalize } from '../.././../../helpers/typography'
// styles
import { SectionTitle, DescriptionList } from '../../StyledPokemon'

export default function Breeding({ ...rest }) {
  // biology
  const pokemonBio = useSelector((state) => state.pokemon.biology)
  // data
  const { gender_rate, egg_groups, hatch_counter, habitat } = pokemonBio.data

  const genderRatio = (rate, sex) => {
    if (sex === 'male') {
      return 12.5 * (8 - rate)
    } else if (sex === 'female') {
      return 12.5 * rate
    } else {
      return
    }
  }

  const eggGroups = (groups) => {
    return groups.map((group) => capitalize(group.name)).join(', ')
  }

  const eggCycle = (counter) => {
    return `${counter} cycles, ${255 * (hatch_counter + 1)} steps`
  }

  return (
    <>
      {pokemonBio.isLoading ? (
        <Loading />
      ) : (
        <Box align="flex-start" margin="0 0 2rem" {...rest}>
          <SectionTitle>Breeding</SectionTitle>
          <DescriptionList forwardedAs="table" align="flex-start">
            <tbody>
              <tr>
                <th>Gender Distribution</th>
                <td>
                  {gender_rate === -1
                    ? 'Genderless'
                    : `${genderRatio(gender_rate, 'male')}%, ${genderRatio(
                        gender_rate,
                        'female'
                      )}% female`}
                </td>
              </tr>
              <tr>
                <th>Egg Groups</th>
                <td>{eggGroups(egg_groups)}</td>
              </tr>
              <tr>
                <th>Egg Cycles</th>
                <td>{eggCycle(hatch_counter)}</td>
              </tr>
              <tr>
                <th>Habitat</th>
                <td>{capitalize(habitat.name)}</td>
              </tr>
            </tbody>
          </DescriptionList>
        </Box>
      )}
    </>
  )
}
