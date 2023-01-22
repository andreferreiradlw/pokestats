import { useState, useEffect, useRef, useContext } from 'react';
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
  removeDash,
  fadeInUpVariant,
  getIdFromMove,
} from '@/helpers';
// components
import { AnimatePresence } from 'framer-motion';
import Box, { BoxProps } from '@/components/Box';
import Loading from '@/components/Loading';
import TypeBadge from '@/components/TypeBadge';
import Dropdown from '@/components/Dropdown';
// styles
import { SectionTitle, SectionMessage, UppercasedTd } from '@/components/BaseStyles';
import {
  TableContainer,
  MovesTable,
  NameTH,
  NameTD,
  TableRow,
  TitleContainer,
  TableBody,
} from './StyledMoves';

const LearnMethodOptions = [
  { label: 'Level Up', value: 'level-up' },
  { label: 'Machines', value: 'machine' },
  { label: 'Egg', value: 'egg' },
  { label: 'Tutor', value: 'tutor' },
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
  // moves
  const [allMoves, setAllMoves] = useState<PokemonMove[]>();
  const [genMoves, setGenMoves] = useState<{
    'level-up': FilteredMove[];
    machine: FilteredMove[];
    egg: FilteredMove[];
    tutor: FilteredMove[];
  }>();
  // learn method state
  const [learnMethod, setLearnMethod] = useState<MoveLearnMethod['name']>('level-up');
  // machine names
  const [machineNames, setMachineNames] = useState<string[]>();
  // loading
  const [movesLoading, setMovesLoading] = useState(true);
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
    // console.log(pokemon);
    // console.log('genMoves', genMoves);
  }, [genMoves]);

  useEffect(() => {
    if (!movesLoading) setMovesLoading(true);

    const moveClient = new MoveClient();

    const fetchMovesData = async (): Promise<Move[]> => {
      let moveRequests = [];
      // create an axios request for each move
      pokemon.moves.forEach(({ move }) =>
        moveRequests.push(moveClient.getMoveById(getIdFromMove(move.url))),
      );
      const allPokemonMovesData = await Promise.all(moveRequests);
      if (!_isMounted.current) return;
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
        if (!_isMounted.current) return;
        setAllMoves(formatMoves);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!movesLoading) setMovesLoading(true);

    if (allMoves) {
      setMachineNames([]);

      const fetchMachineNames = async (moves: FilteredMove[]): Promise<void> => {
        await getMachineNames(moves).then(names => {
          if (!_isMounted.current) return;
          setMachineNames(names);
        });
      };
      // current group to filter
      const gameGroup = mapVersionToGroup(gameVersion);
      // filter moves
      const levelMoves = filterMoves(allMoves, 'level-up', gameGroup);
      const tmMoves = filterMoves(allMoves, 'machine', gameGroup);
      fetchMachineNames(tmMoves);
      const breedingMoves = filterMoves(allMoves, 'egg', gameGroup);
      const professorMoves = filterMoves(allMoves, 'tutor', gameGroup);

      if (!_isMounted.current) return;
      // update state
      setGenMoves({
        'level-up': levelMoves,
        machine: tmMoves,
        egg: breedingMoves,
        tutor: professorMoves,
      });
    }
    // stop loading
    setMovesLoading(false);
  }, [allMoves, gameVersion]);

  return (
    <Box flexalign={{ xxs: 'center', lg: 'flex-start' }} flexgap="2em" {...rest}>
      <TitleContainer
        flexdirection="row"
        flexjustify={{ xxs: 'center', lg: 'flex-start' }}
        flexwrap="wrap"
        flexgap="1em"
      >
        <SectionTitle>Move Pool</SectionTitle>
        <Dropdown
          options={LearnMethodOptions}
          onChange={e => setLearnMethod(e.target.value)}
          value={learnMethod}
          minWidth="125px"
        />
      </TitleContainer>
      {movesLoading && (
        <Loading flexheight="100%" $iconWidth={{ xxs: '20%', xs: '15%', md: '10%', lg: '5%' }} />
      )}
      <AnimatePresence mode="wait">
        {genMoves?.[learnMethod]?.length ? (
          <TableContainer
            initial="hidden"
            animate="show"
            exit="exit"
            variants={fadeInUpVariant}
            key={`moves-${learnMethod}-table-container`}
          >
            <MovesTable>
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
              <TableBody>
                {genMoves[learnMethod].map((move: PokemonMove, i: number) => (
                  <TableRow key={`${learnMethod}-${move.name}-${i}`}>
                    {/* @ts-ignore **/}
                    {learnMethod === 'level-up' && <td>{move.level_learned_at}</td>}
                    {learnMethod === 'machine' &&
                      (machineNames?.[i] ? (
                        <td>
                          <Box
                            flexdirection="row"
                            flexjustify="space-between"
                            width="75%"
                            flexmargin="0 auto"
                            flexgap="0.1em"
                          >
                            <span>{machineNames[i].toUpperCase()}</span>
                            <img
                              src={`https://raw.githubusercontent.com/msikma/pokesprite/master/items/${
                                machineNames[i].includes('hm') ? 'hm' : 'tm'
                              }/${move.type.name}.png`}
                              alt={move.type.name}
                              width="30"
                            />
                          </Box>
                        </td>
                      ) : (
                        <td>...</td>
                      ))}
                    {learnMethod === 'egg' && <td>-</td>}
                    {learnMethod === 'tutor' && <td>-</td>}
                    <NameTD>{removeDash(move.name)}</NameTD>
                    <td>
                      <TypeBadge flexmargin="0" $iconOnly $typename={move.type.name} />
                    </td>
                    <UppercasedTd>{move.damage_class.name}</UppercasedTd>
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
            key={`moves-${learnMethod}-nomoves-message`}
          >
            {`No ${learnMethod} moves for currently selected game version.`}
          </SectionMessage>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default PokemonMoves;
