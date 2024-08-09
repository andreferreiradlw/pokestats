import { useState, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MoveClient, MoveLearnMethod, Pokemon, PokemonSpecies } from 'pokenode-ts';
import GameVersionContext from '@/components/Layout/gameVersionContext';
import {
  mapVersionToGroup,
  filterMoves,
  getMachineNames,
  fadeInUpVariant,
  getIdFromMove,
} from '@/helpers';
import { AnimatePresence, motion } from 'framer-motion';
import Loading from '@/components/Loading';
import MovesTable from '@/components/MovesTable';
import { Grid, GridProps, Typography } from '@mui/material';
import DropdownV2 from '@/components/DropdownV2';
import GameGenSelect from '@/components/GameGenSelect';

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
  const { gameVersion } = useContext(GameVersionContext);
  const [learnMethod, setLearnMethod] = useState<MoveLearnMethod['name']>('level-up');

  // Fetch all moves
  const { data: allMoves, isLoading: movesLoading } = useQuery({
    queryKey: ['pokemonMoves', pokemon.name],
    queryFn: async () => {
      const moveClient = new MoveClient();
      const moveRequests = pokemon.moves.map(({ move }) =>
        moveClient.getMoveById(getIdFromMove(move.url)),
      );
      const movesData = await Promise.all(moveRequests);

      return movesData.map((currMove, i) => ({
        ...currMove,
        version_group_details: pokemon.moves[i].version_group_details,
      }));
    },
  });

  // Process moves based on the selected game version
  const { data: genMoves, isLoading: genMovesLoading } = useQuery({
    queryKey: ['genMoves', gameVersion, allMoves],
    queryFn: async () => {
      if (!allMoves) return null;

      const gameGroup = mapVersionToGroup(gameVersion);
      const levelMoves = filterMoves(allMoves, 'level-up', gameGroup);
      const tmMoves = filterMoves(allMoves, 'machine', gameGroup);
      const breedingMoves = filterMoves(allMoves, 'egg', gameGroup);
      const professorMoves = filterMoves(allMoves, 'tutor', gameGroup);

      const machineNames = await getMachineNames(tmMoves);

      return {
        genMoves: {
          'level-up': levelMoves,
          machine: tmMoves,
          egg: breedingMoves,
          tutor: professorMoves,
        },
        machineNames,
      };
    },
    enabled: !!allMoves, // Only run this query if allMoves has data
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
      {movesLoading || genMovesLoading ? (
        <Loading flexheight="100%" $iconWidth={{ xxs: '20%', xs: '15%', md: '10%', lg: '5%' }} />
      ) : (
        <AnimatePresence mode="wait">
          {genMoves?.genMoves?.[learnMethod]?.length ? (
            <MovesTable
              moves={genMoves.genMoves[learnMethod]}
              machineNames={genMoves.machineNames}
              learnMethod={learnMethod}
              initial="hidden"
              animate="show"
              exit="exit"
              variants={fadeInUpVariant}
              key={`moves-${learnMethod}-table-container`}
            />
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
