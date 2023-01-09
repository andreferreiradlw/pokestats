import { useState, useEffect, useRef, useMemo, useContext } from 'react';
// types
import type { PokemonMove } from '@/types';
// helpers
import { MoveClient, MoveLearnMethod, Pokemon, Move } from 'pokenode-ts';
import GameVersionContext from '@/components/Layout/gameVersionContext';
import {
  mapVersionToGroup,
  mapGeneration,
  filterMoves,
  FilteredMove,
  getMachineNames,
  capitalize,
  removeDash,
  staggerTableVariant,
  fadeInUpVariant,
  getIdFromMove,
} from '@/helpers';
// components
import { AnimatePresence } from 'framer-motion';
import Box, { BoxProps } from '@/components/Box';
import Loading from '@/components/Loading';
import TypeBadge from '@/components/TypeBadge';
// styles
import { SectionTitle, SectionMessage, Button } from '@/components/BaseStyles';
import {
  TableContainer,
  MovesTable,
  NameTH,
  NameTD,
  TableRow,
  TabContainer,
  TableBody,
} from './StyledMoves';

const TabsData = [
  { title: 'Level Up', value: 'level-up' },
  { title: 'Machines', value: 'machine' },
  { title: 'Egg', value: 'egg' },
  { title: 'Tutor', value: 'tutor' },
];

const mapMethodName = (methodName: MoveLearnMethod['name']): string => {
  switch (methodName) {
    case 'level-up':
      return 'Level';
    case 'machine':
      return 'Machine';
    default:
      return '-';
  }
};

interface PokemonMovesProps extends BoxProps {
  pokemon: Pokemon;
}

const PokemonMoves = ({ pokemon, ...rest }: PokemonMovesProps): JSX.Element => {
  // game version
  const { gameVersion } = useContext(GameVersionContext);
  // loading
  const [pokemonMoves, setPokemonMoves] = useState<PokemonMove[]>();
  // learn method state
  const [learnMethod, setLearnMethod] = useState<MoveLearnMethod['name']>('level-up');
  // machine names
  const [machineNames, setMachineNames] = useState<string[]>();
  // loading
  const [movesLoading, setMovesLoading] = useState(true);

  const filteredMoves: FilteredMove[] = useMemo(
    () => pokemonMoves && filterMoves(pokemonMoves, learnMethod, mapVersionToGroup(gameVersion)),
    [pokemonMoves, learnMethod, gameVersion],
  );

  // ref
  const _isMounted = useRef(null);

  // manage mounted state to avoid memory leaks
  useEffect(() => {
    _isMounted.current = true;
    return () => {
      _isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    // start loading
    setMovesLoading(true);
    // client
    const moveClient = new MoveClient({
      cacheOptions: { maxAge: 0, limit: false },
    });

    const fetchMovesData = async (): Promise<Move[]> => {
      // move requests array
      let moveRequests = [];
      // create an axios request for each move
      pokemon.moves.forEach(({ move }) =>
        moveRequests.push(moveClient.getMoveById(getIdFromMove(move.url))),
      );

      const allPokemonMovesData = await Promise.all(moveRequests);

      return allPokemonMovesData;
    };

    fetchMovesData()
      .then(movesData => {
        const formatMoves = movesData
          .map((currMove, i) => {
            // version details from pokemon moves info
            return {
              ...currMove,
              version_group_details: pokemon.moves[i].version_group_details,
            };
          })
          .filter(data => data);
        // update state
        setPokemonMoves(formatMoves);
      })
      .catch(console.error);
  }, [pokemon]);

  // current pokemon moves
  useEffect(() => {
    setMovesLoading(true);

    if (_isMounted.current && filteredMoves?.length) {
      // if move is machine then get machine names
      if (learnMethod === 'machine') {
        // requests from current moves machines
        getMachineNames(filteredMoves).then(names => {
          if (_isMounted.current) {
            // update machine names state
            setMachineNames(names);
            // stop loading
            setMovesLoading(false);
          }
        });
      } else {
        // if not machine just stop loading instead
        if (_isMounted.current) setMovesLoading(false);
      }
    } else {
      setMovesLoading(false);
    }
  }, [filteredMoves, learnMethod]);

  return (
    <Box flexalign={{ xxs: 'center', lg: 'flex-start' }} flexgap="2em" {...rest}>
      <SectionTitle>Move Pool</SectionTitle>
      {/** TABS */}
      <TabContainer flexdirection="row" flexjustify="space-evenly" flexwrap="wrap">
        {TabsData.map(({ title, value }) => (
          <Button
            $active={learnMethod === value}
            onClick={() => {
              setLearnMethod(value);
            }}
            whileHover="hover"
            whileTap="tap"
            variants={fadeInUpVariant}
            key={`pokemon-moves-${value}-btn`}
          >
            {title}
          </Button>
        ))}
      </TabContainer>
      <AnimatePresence mode="wait">
        {movesLoading ? (
          <Loading
            flexheight="100%"
            $iconWidth={{ xxs: '20%', xs: '15%', md: '10%', lg: '5%' }}
            passKey="pokemon-moves-loading"
          />
        ) : filteredMoves?.length ? (
          <TableContainer
            initial="hidden"
            animate="show"
            exit="exit"
            variants={fadeInUpVariant}
            key="pokemon-moves-table-container"
          >
            <MovesTable key="pokemon-moves-table">
              <thead>
                <tr>
                  <th>{mapMethodName(learnMethod)}</th>
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
              <TableBody
                key="moves-tbody"
                initial="hidden"
                animate="show"
                exit="exit"
                variants={staggerTableVariant}
              >
                {filteredMoves.map((move, i) => (
                  <TableRow key={`${move.name}-${i}`}>
                    {learnMethod === 'level-up' && <td>{move.level_learned_at}</td>}
                    {learnMethod === 'machine' &&
                      (machineNames?.[i] ? <td>{machineNames[i].toUpperCase()}</td> : <td>...</td>)}
                    {learnMethod === 'egg' && <td>-</td>}
                    {learnMethod === 'tutor' && <td>-</td>}
                    <NameTD>{removeDash(move.name)}</NameTD>
                    <td>
                      <TypeBadge flexmargin="0" $iconOnly $typename={move.type.name} />
                    </td>
                    <td>{capitalize(move.damage_class.name)}</td>
                    <td>{move.power || '-'}</td>
                    <td>{move.pp || '-'}</td>
                    <td>{move.accuracy || '-'}</td>
                    <td>{move.priority}</td>
                    <td>{mapGeneration(move.generation.name)}</td>
                  </TableRow>
                ))}
              </TableBody>
            </MovesTable>
          </TableContainer>
        ) : (
          <SectionMessage
            initial="hidden"
            animate="show"
            exit="exit"
            variants={fadeInUpVariant}
            key="pokemon-nomoves-message"
          >
            {`No ${learnMethod} moves for currently selected game version.`}
          </SectionMessage>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default PokemonMoves;
