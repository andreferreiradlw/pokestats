import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
// helpers
import getMultipliers from './damage_multipliers'
// components
import Loading from '../../Loading'
import Box from '../../Box'
import TypeBadge from '../../TypeBadge'
import Switch from './Switch'
// styles
import { SectionTitle, Table } from '../../BaseStyles'

export default function Weaknesses({ ...rest }) {
  // pokemon info
  const pokemonInfo = useSelector(state => state.pokemon.info)
  // data
  const { types } = pokemonInfo.data

  // multipliers data state
  const [typeMultipliers, setMultipliers] = useState()
  // current multipliers to show
  const [currMultipliers, setCurrMultipliers] = useState()
  // switch state
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    if (types.length) {
      let currTypes = types.map(currType => {
        return currType.type.name
      })
      // get multipliers
      const multipliers = getMultipliers(currTypes)
      // set state
      setMultipliers(multipliers)
      // initially show defense
      setCurrMultipliers(multipliers.defense)
    }
  }, [types])

  useEffect(() => {
    if (typeMultipliers) {
      enabled
        ? setCurrMultipliers(typeMultipliers.defense)
        : setCurrMultipliers(typeMultipliers.attack)
    }
  }, [enabled])

  return (
    <Box align={{ xxs: 'center', lg: 'flex-start' }} {...rest}>
      <Box
        direction={{ xxs: 'column', lg: 'row' }}
        justify="space-between"
        flexWrap="wrap"
      >
        <SectionTitle>Multipliers</SectionTitle>
        <Switch enabled={enabled} onClick={() => setEnabled(!enabled)} />
      </Box>

      {!typeMultipliers ? (
        <Loading />
      ) : (
        <>
          {currMultipliers && (
            <Table forwardedAs="table" align="flex-start">
              <tbody>
                <tr>
                  <th>{enabled ? 'Immune To' : 'No Effect To'}</th>
                  <td>
                    {currMultipliers.no_damage.map((type, i) => (
                      <TypeBadge key={i} type={type} iconOnly />
                    ))}
                  </td>
                </tr>
                <tr>
                  <th>0.25x</th>
                  <td>
                    {currMultipliers.quarter_damage.map((type, i) => (
                      <TypeBadge key={i} type={type} iconOnly />
                    ))}
                  </td>
                </tr>
                <tr>
                  <th>0.5x</th>
                  <td>
                    {currMultipliers.half_damage.map((type, i) => (
                      <TypeBadge key={i} type={type} iconOnly />
                    ))}
                  </td>
                </tr>
                <tr>
                  <th>2x</th>
                  <td>
                    {currMultipliers.double_damage.map((type, i) => (
                      <TypeBadge key={i} type={type} iconOnly />
                    ))}
                  </td>
                </tr>
                <tr>
                  <th>4x</th>
                  <td>
                    {currMultipliers.quadruple_damage.map((type, i) => (
                      <TypeBadge key={i} type={type} iconOnly />
                    ))}
                  </td>
                </tr>
              </tbody>
            </Table>
          )}
        </>
      )}
    </Box>
  )
}
