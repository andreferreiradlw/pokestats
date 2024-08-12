import { useState, useContext, useMemo } from 'react';
import { MoveLearnMethod, Pokemon, PokemonSpecies } from 'pokenode-ts';
import GameVersionContext from '@/components/Layout/gameVersionContext';
import { mapVersionToGroup, filterMoves, fadeInUpVariant } from '@/helpers';
import { AnimatePresence, motion } from 'framer-motion';
import Loading from '@/components/Loading';
import MovesTable from '@/components/MovesTable';
import { Grid, GridProps, Typography } from '@mui/material';
import DropdownV2 from '@/components/DropdownV2';
import GameGenSelect from '@/components/GameGenSelect';
import { useMachines, usePokemonMoves } from '@/hooks';

const LearnMethodOptions = [
  { label: 'Level Up', value: 'level-up' },
  { label: 'Machines', value: 'machine' },
  { label: 'Egg', value: 'egg' },
  { label: 'Tutor', value: 'tutor' },
];

interface PokemonMovesProps extends GridProps {
  pokemon: Pokemon;
  species: PokemonSpecies;
}

const PokemonMoves = ({ pokemon, species, ...rest }: PokemonMovesProps): JSX.Element => {
  // states
  const { gameVersion } = useContext(GameVersionContext);
  const [learnMethod, setLearnMethod] = useState<MoveLearnMethod['name']>('level-up');

  // fetch all moves
  const { data: allMoves, isLoading: movesLoading } = usePokemonMoves(pokemon);

  const filteredMoves = useMemo(() => {
    if (!allMoves) return [];
    // currently selected game group
    const gameGroup = mapVersionToGroup(gameVersion);
    // filter moves
    return filterMoves(allMoves, learnMethod, gameGroup);
  }, [allMoves, gameVersion, learnMethod]);

  // Process moves based on the selected game version
  const { data: machines, isLoading: machinesLoading } = useMachines(filteredMoves, pokemon.name, {
    enabled: learnMethod === 'machine' && filterMoves.length > 0,
  });

  return (
    <Grid container alignItems={{ xxs: 'center', lg: 'flex-start' }} {...rest}>
      <Typography variant="sectionTitle">Move Pool</Typography>
      <Grid item flexDirection="row" gap="1.5em">
        <DropdownV2
          label="Type"
          options={LearnMethodOptions}
          onChange={e => setLearnMethod(e.target.value)}
          value={learnMethod}
        />
        <GameGenSelect pokemon={species} />
      </Grid>
      {movesLoading || machinesLoading ? (
        <Loading flexheight="100%" $iconWidth={{ xxs: '20%', xs: '15%', md: '10%', lg: '5%' }} />
      ) : (
        <AnimatePresence mode="wait">
          {filteredMoves.length ? (
            <MovesTable moves={filteredMoves} machineNames={machines} learnMethod={learnMethod} />
          ) : (
            <Typography
              variant="sectionMessage"
              component={motion.p}
              initial="hidden"
              animate="show"
              exit="exit"
              variants={fadeInUpVariant}
              key={`moves-${learnMethod}-nomoves-message`}
            >
              {`No ${learnMethod} moves for currently selected game version.`}
            </Typography>
          )}
        </AnimatePresence>
      )}
    </Grid>
  );
};

export default PokemonMoves;
