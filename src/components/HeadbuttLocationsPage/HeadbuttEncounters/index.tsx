import { capitalise, type GameValue } from '@/helpers';
import { Avatar, Chip, Grid2, Paper, Stack, Typography, type Grid2Props } from '@mui/material';
import { useMemo, useCallback, memo } from 'react';
import { type HeadbuttEncounter, mapAreaHeadbuttEncounters } from '../headbuttData';
import { useRouter } from 'next/router';

interface HeadbuttEncountersProps extends Grid2Props {
  areaKey: string;
  gameVersion: GameValue;
}

const HeadbuttEncounters = ({
  areaKey,
  gameVersion,
  ...rest
}: HeadbuttEncountersProps): JSX.Element => {
  const encounters = useMemo(
    () => mapAreaHeadbuttEncounters(gameVersion, areaKey),
    [areaKey, gameVersion],
  );
  const router = useRouter();

  const handleChipClick = useCallback(
    (name: string) => {
      router.push(`/pokemon/${name.toLowerCase()}`);
    },
    [router],
  );

  const renderEncounterChips = useCallback(
    (title: string, encounterList: HeadbuttEncounter[]) => (
      <Stack direction="row" flexWrap="wrap" gap={1} alignItems="center">
        <Typography variant="body2">{title}:</Typography>
        {encounterList.map(({ chance, level, id, name }) => (
          <Chip
            size="small"
            key={id}
            avatar={
              <Avatar
                alt={name}
                src={`https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/images/${id}.png`}
              />
            }
            label={`${chance} - Level: ${level}`}
            variant="filled"
            onClick={() => handleChipClick(name)}
          />
        ))}
      </Stack>
    ),
    [handleChipClick],
  );

  if (!encounters) {
    return (
      <Grid2 component={Paper} p={2} {...rest}>
        {`No encounters in this area for Pokemon ${capitalise(gameVersion)} version.`}
      </Grid2>
    );
  }

  return (
    <Grid2 component={Paper} p={2} gap={2} flexDirection="column" {...rest}>
      <Typography textTransform="capitalize">{`Pokemon ${gameVersion} encounters`}</Typography>
      {renderEncounterChips('Normal', encounters.normal)}
      {renderEncounterChips('Rare', encounters.rare)}
    </Grid2>
  );
};

export default memo(HeadbuttEncounters);
