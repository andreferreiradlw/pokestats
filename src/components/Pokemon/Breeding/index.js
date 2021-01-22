import { useSelector } from 'react-redux'
// components
import Loading from '../../Loading'
import Box from '../../Box'
//helpers
import { removeDash } from '../.././../helpers/typography'
// styles
import { SectionTitle, Table, Numbered } from '../../BaseStyles'

export default function Breeding({ ...rest }) {
  // biology
  const pokemonBio = useSelector(state => state.pokemon.biology)
  // evolution
  const pokemonEvo = useSelector(state => state.pokemon.evolution)
  // data
  const { gender_rate, egg_groups, hatch_counter, habitat } = pokemonBio.data
  const { baby_trigger_item } = pokemonEvo.data

  // gender ratio
  const genderRatio = rate =>
    `${12.5 * (8 - rate)}% male, ${12.5 * rate}% female`

  // egg groups
  const eggGroups = groups =>
    groups.map((group, i) => (
      <Numbered key={`${group.name}-${i}`}>
        {`${groups.length > 1 ? `${++i}. ` : ``}${removeDash(group.name)}`}
      </Numbered>
    ))

  // egg hatch cycle
  const eggCycle = counter =>
    `${counter} cycles ( ${255 * (hatch_counter + 1)} steps )`

  return (
    <>
      {pokemonEvo.isLoading ? (
        <Loading />
      ) : (
        <Box align={{ xxs: 'center', lg: 'flex-start' }} {...rest}>
          <SectionTitle>Breeding</SectionTitle>
          <Table forwardedAs="table" align="flex-start">
            <tbody>
              <tr>
                <th>Gender Distribution</th>
                <td>
                  {gender_rate === -1 ? 'Genderless' : genderRatio(gender_rate)}
                </td>
              </tr>
              <tr>
                <th>Egg Groups</th>
                <td>
                  {egg_groups.length ? eggGroups(egg_groups) : 'No Egg Groups'}
                </td>
              </tr>
              <tr>
                <th>Egg Cycles</th>
                <td>
                  {hatch_counter ? eggCycle(hatch_counter) : 'No Egg Cycles'}
                </td>
              </tr>
              <tr>
                <th>Baby Trigger Item</th>
                <td>
                  {baby_trigger_item
                    ? removeDash(baby_trigger_item.name)
                    : 'None'}
                </td>
              </tr>
              <tr>
                <th>Habitat</th>
                <td>{habitat ? removeDash(habitat.name) : 'None'}</td>
              </tr>
            </tbody>
          </Table>
        </Box>
      )}
    </>
  )
}
