import { useState, useEffect, useRef, useMemo, useContext } from 'react';
// types
import type { MoveLearnMethod } from 'pokenode-ts';
import type { PokemonMove } from '@/types';
// helpers
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

interface PokemonMovesProps extends BoxProps {
  pokemonMoves: PokemonMove[];
}

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

const PokemonMoves = ({ pokemonMoves, ...rest }: PokemonMovesProps): JSX.Element => {
  // game version
  const { gameVersion } = useContext(GameVersionContext);
  // learn method state
  const [learnMethod, setLearnMethod] = useState<MoveLearnMethod['name']>('level-up');
  // machine names
  const [machineNames, setMachineNames] = useState<string[]>();
  // loading
  const [movesLoading, setMovesLoading] = useState(true);

  const filteredMoves: FilteredMove[] = useMemo(
    () => filterMoves(pokemonMoves, learnMethod, mapVersionToGroup(gameVersion)),
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

  // current pokemon moves
  useEffect(() => {
    // statt loading
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
      // if not machine just stop loading instead
      if (_isMounted.current) setMovesLoading(false);
    }
  }, [filteredMoves, learnMethod]);

  return (
    <Box align={{ xxs: 'center', lg: 'flex-start' }} {...rest}>
      <SectionTitle>Move Pool</SectionTitle>
      {/** TABS */}
      <TabContainer direction="row" justify="space-evenly" $flexWrap="wrap">
        <Button
          $active={learnMethod === 'level-up'}
          onClick={() => setLearnMethod('level-up')}
          whileHover="hover"
          whileTap="tap"
          variants={fadeInUpVariant}
          key="pokemon-moves-lvlup-btn"
        >
          Level Up
        </Button>
        <Button
          $active={learnMethod === 'machine'}
          onClick={() => setLearnMethod('machine')}
          whileHover="hover"
          whileTap="tap"
          variants={fadeInUpVariant}
          key="pokemon-moves-tmhm-btn"
        >
          TM / HM
        </Button>
        <Button
          $active={learnMethod === 'egg'}
          onClick={() => setLearnMethod('egg')}
          whileHover="hover"
          whileTap="tap"
          variants={fadeInUpVariant}
          key="pokemon-moves-egg-btn"
        >
          Egg
        </Button>
        <Button
          $active={learnMethod === 'tutor'}
          onClick={() => setLearnMethod('tutor')}
          whileHover="hover"
          whileTap="tap"
          variants={fadeInUpVariant}
          key="pokemon-moves-tutor-btn"
        >
          Tutor
        </Button>
      </TabContainer>
      <AnimatePresence mode="wait">
        {movesLoading ? (
          <Loading
            height="100%"
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
                      <TypeBadge margin="0" $iconOnly typename={move.type.name} />
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
