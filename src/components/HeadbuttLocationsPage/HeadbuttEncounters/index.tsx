import type { GameValue } from '@/helpers';
import { Grid2, type Grid2Props } from '@mui/material';
import { useMemo } from 'react';
import { mapAreaPokemon } from '../headbuttData';

interface HeadbuttEncountersProps extends Grid2Props {
  areakey: string;
  gameVersion: GameValue;
}

const HeadbuttEncounters = ({
  areakey,
  gameVersion,
  ...rest
}: HeadbuttEncountersProps): JSX.Element => {
  const encounters = useMemo(() => mapAreaPokemon(gameVersion, areakey), [areakey, gameVersion]);

  return <Grid2 {...rest}>{encounters ? 'encounters' : 'no encounters'}</Grid2>;
};

export default HeadbuttEncounters;
