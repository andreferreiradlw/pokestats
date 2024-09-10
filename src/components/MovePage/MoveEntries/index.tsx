import { useMemo } from 'react';
// types
import type { AbilityEffectChange, Move, PastMoveStatValues } from 'pokenode-ts';
// helpers
import { createSentence, type GameGroup, mapGroupToGeneration, removeUnderscore } from '@/helpers';
// components
import type { Grid2Props } from '@mui/material';
import { capitalize, Grid2, Stack, Typography } from '@mui/material';

interface MoveEntriesProps extends Grid2Props {
  move: Move;
  moveName: string;
}

const buildValuesPhrase = (
  values: PastMoveStatValues,
  effectChanges: AbilityEffectChange[],
): string | null => {
  const phraseElements: string[] = [];

  // Check values and build phrase elements
  Object.entries(values).forEach(([key, value]) => {
    if (key !== 'version_group' && key !== 'effect_entries' && value) {
      switch (key) {
        case 'power':
          phraseElements.push(`${value} ${capitalize(removeUnderscore(key))}`);
          break;
        case 'pp':
          phraseElements.push(`${value} ${removeUnderscore(key).toUpperCase()}`);
          break;
        case 'type':
          phraseElements.push(`type of ${value.name}`);
          break;
        case 'accuracy':
          phraseElements.push(`accuracy of ${value}%`);
          break;
        default:
          break;
      }
    }
  });

  // If no values are found, look for past effect changes
  if (phraseElements.length === 0 && effectChanges) {
    const pastChanges = effectChanges.find(
      change => change.version_group.name === values.version_group.name,
    );

    if (pastChanges?.effect_entries) {
      pastChanges.effect_entries.forEach(entry =>
        phraseElements.push(entry.effect.toLowerCase().replace('.', '')),
      );
      return createSentence(phraseElements, 'and', '');
    }

    return null;
  }

  return createSentence(phraseElements);
};

const MoveEntries = ({ move, moveName, ...rest }: MoveEntriesProps): JSX.Element => {
  const { effect_entries, past_values, effect_chance, effect_changes } = move;

  // Memoize the filtered effect entries
  const effectEntries = useMemo(
    () => effect_entries.filter(({ language }) => language.name === 'en'),
    [effect_entries],
  );

  const renderEffectEntries = () =>
    effect_chance &&
    effectEntries.length > 0 && (
      <Stack alignItems="flex-start" justifyContent="flex-start" gap={1}>
        <Typography variant="sectionTitle">Effect Entries</Typography>
        {effectEntries.map(({ effect }) => (
          <Typography key={`effect-entry-${effect}`}>
            {effect.replace('$effect_chance', effect_chance.toString())}
          </Typography>
        ))}
      </Stack>
    );

  const renderVersionChanges = () => (
    <Stack alignItems="flex-start" justifyContent="flex-start" gap={1}>
      <Typography variant="sectionTitle">Version Changes</Typography>
      {past_values?.length > 0 ? (
        past_values.map((value, i) => {
          const phrase = buildValuesPhrase(value, effect_changes);

          return phrase ? (
            <Typography key={`move-past-value-${i}`}>
              {`Prior to ${mapGroupToGeneration(value.version_group.name as GameGroup)}, `}
              <Typography fontWeight="600" component="span">
                {moveName}
              </Typography>
              {` ${phrase}.`}
            </Typography>
          ) : i === past_values.length - 1 && past_values.length === 1 ? (
            <Typography key={`move-past-value-${i}`}>
              <Typography fontWeight="600" component="span">
                {moveName}
              </Typography>
              {' has no previous version changes.'}
            </Typography>
          ) : null;
        })
      ) : (
        <Typography>No changes in previous Generations.</Typography>
      )}
    </Stack>
  );

  return (
    <Grid2
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      gap={2}
      {...rest}
    >
      {renderEffectEntries()}
      {renderVersionChanges()}
    </Grid2>
  );
};

export default MoveEntries;
