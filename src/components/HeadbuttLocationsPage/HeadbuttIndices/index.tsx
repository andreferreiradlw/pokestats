import { useMemo } from 'react';
import { Grid2, type Grid2Props, Paper, Typography } from '@mui/material';
import { getEncounterRate } from '@/helpers';

interface EncounterInfoProps extends Grid2Props {
  trainerId?: number | '';
}

const HeadbuttIndices = ({ trainerId, ...rest }: EncounterInfoProps): JSX.Element => {
  // Calculate rare and normal encounter indexes based on the trainer ID
  const { rareIndexes, normalIndexes } = useMemo(() => {
    const rare: number[] = [];
    const normal: number[] = [];

    if (trainerId !== undefined && trainerId !== '') {
      const trainerIdLastDigit = parseInt(trainerId.toString().slice(-1), 10);

      // Calculate encounter indexes based on the trainer ID
      for (let i = 0; i < 10; i++) {
        const encounterRate = getEncounterRate(i, trainerIdLastDigit);
        if (encounterRate === 80) {
          rare.push(i);
        } else if (encounterRate === 50) {
          normal.push(i);
        }
      }
    }
    return { rareIndexes: rare, normalIndexes: normal };
  }, [trainerId]);

  return (
    <Grid2 gap={1} flexDirection="column" component={Paper} p={2} {...rest}>
      <Typography variant="sectionSubTitle">Encounter Indexes</Typography>
      <Typography>
        <strong>Rare:</strong> {rareIndexes.join(', ')}
      </Typography>
      <Typography>
        <strong>Normal:</strong> {normalIndexes.join(', ')}
      </Typography>
    </Grid2>
  );
};

export default HeadbuttIndices;
