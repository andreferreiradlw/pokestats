import { useSelector } from 'react-redux'
import { AnimatePresence } from 'framer-motion'
// helpers
import { removeDash, mapGeneration, fadeInUpVariant } from '../../../helpers'
// styles
import { SectionMessage } from '../../BaseStyles'
import {
  TableContainer,
  MovesTable,
  NameTH,
  NameTD,
  TableRow,
  TableBody,
} from '../../Pokemon/Moves/StyledMoves'
// components
import Loading from '../../Loading'
import TypeBadge from '../../TypeBadge'

export default function Moves() {
  // moves selector
  const typeMoves = useSelector(state => state.type.moves)
  // data
  const { data, isLoading } = typeMoves

  return (
    <AnimatePresence exitBeforeEnter>
      {/** LOADING */}
      {isLoading && (
        <Loading
          height="100%"
          $iconWidth={{ xxs: '20%', xs: '15%', md: '10%', lg: '5%' }}
          key="pokemon-type-moves"
        />
      )}
      {/** TABLE */}
      {!isLoading && data.length !== 0 && (
        <TableContainer>
          <MovesTable>
            <thead>
              <tr>
                <NameTH>Name</NameTH>
                <th>Type</th>
                <th>Category</th>
                <th>Power</th>
                <th>PP</th>
                <th>Accuracy</th>
                <th>Priority</th>
                <th>Generation</th>
              </tr>
            </thead>
            <TableBody>
              {data.map((move, i) => (
                <TableRow key={`type-${move.name}-${i}`}>
                  <NameTD>{removeDash(move.name)}</NameTD>
                  <td>
                    <TypeBadge margin="0" $iconOnly type={move.type.name} />
                  </td>
                  <td>
                    {move.damage_class
                      ? removeDash(move.damage_class.name)
                      : '-'}
                  </td>
                  <td>{move.power || '-'}</td>
                  <td>{move.pp || '-'}</td>
                  <td>{move.accuracy || '-'}</td>
                  <td>{move.priority}</td>
                  <td>{mapGeneration(move.generation.name) || '-'}</td>
                </TableRow>
              ))}
            </TableBody>
          </MovesTable>
        </TableContainer>
      )}
      {/** NO MOVES */}
      {!isLoading && data.length === 0 && (
        <SectionMessage
          initial="hidden"
          animate="show"
          exit="exit"
          variants={fadeInUpVariant}
          key="type-nomoves-message"
        >
          No moves for current type.
        </SectionMessage>
      )}
    </AnimatePresence>
  )
}
