import { useMemo } from 'react';
// types
import type { Move, PastMoveStatValues } from 'pokenode-ts';
// styles
import { SectionTitle } from '@/BaseStyles';
// components
import Box, { BoxProps } from '@/components/Box';
import { capitalise, createSentence, mapGroupToGeneration, removeUnderscore } from '@/helpers';

interface MoveEntriesProps extends BoxProps {
  move: Move;
  moveName: string;
}

const buildValuesPhrase = (values: PastMoveStatValues): string => {
  let phraseElements = [];

  for (const value of Object.keys(values)) {
    if (value !== 'version_group' && value !== 'effect_entries' && !!values[value]) {
      if (value === 'power')
        phraseElements.push(`${values[value]} ${capitalise(removeUnderscore(value))}`);
      if (value === 'pp')
        phraseElements.push(`${values[value]} ${removeUnderscore(value).toLocaleUpperCase()}`);
      if (value === 'type') phraseElements.push(`type of ${values[value].name}`);
      if (value === 'accuracy') phraseElements.push(`accuracy of ${values[value]}%`);
    }
  }

  return createSentence(phraseElements);
};

const MoveEntries = ({ move, moveName, ...rest }: MoveEntriesProps): JSX.Element => {
  // data
  const { effect_entries, past_values, effect_chance } = move;
  // memo
  const effectEntries = useMemo(
    () => effect_entries.filter(({ language }) => language.name === 'en'),
    [effect_entries],
  );

  return (
    <Box flexalign="flex-start" flexjustify="flex-start" flexgap="1em" {...rest}>
      {!!effectEntries?.length && (
        <Box flexalign="flex-start" flexjustify="flex-start" flexgap="0.5em">
          <SectionTitle>Effect Entries</SectionTitle>
          {effectEntries.map(({ effect }, i) => (
            <p key={`effect-entry-${i}`}>{effect.replace('$effect_chance', effect_chance)}</p>
          ))}
        </Box>
      )}
      <Box flexalign="flex-start" flexjustify="flex-start" flexgap="0.5em">
        <SectionTitle>Version Changes</SectionTitle>
        {past_values?.length > 0
          ? past_values.map(({ version_group }, i) => (
              <p key={`move-past-value-${i}`}>{`Prior to ${mapGroupToGeneration(
                version_group.name,
              )}, ${moveName} has ${buildValuesPhrase(past_values[i])}.`}</p>
            ))
          : 'No changes in previous Generations.'}
      </Box>
    </Box>
  );
};

export default MoveEntries;
