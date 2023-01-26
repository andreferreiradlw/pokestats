import { useMemo } from 'react';
// types
import type { AbilityEffectChange, Move, PastMoveStatValues } from 'pokenode-ts';
// helpers
import { capitalise, createSentence, mapGroupToGeneration, removeUnderscore } from '@/helpers';
// styles
import { BoldSpan, SectionTitle } from '@/BaseStyles';
// components
import Box, { BoxProps } from '@/components/Box';

interface MoveEntriesProps extends BoxProps {
  move: Move;
  moveName: string;
}

const buildValuesPhrase = (
  values: PastMoveStatValues,
  effectChanges: AbilityEffectChange[],
): string => {
  let phraseElements = [];
  let phrasePrefix = 'has';

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
  // if no values found, get past effect changes
  if (phraseElements.length === 0 && effectChanges) {
    const pastChanges = effectChanges.find(
      change => change.version_group.name === values.version_group.name,
    );

    if (pastChanges?.effect_entries) {
      pastChanges.effect_entries.forEach(entry =>
        phraseElements.push(entry.effect.toLowerCase().replace('.', '')),
      );
    } else {
      return null;
    }

    phrasePrefix = '';
  }

  return createSentence(phraseElements, 'and', phrasePrefix);
};

const MoveEntries = ({ move, moveName, ...rest }: MoveEntriesProps): JSX.Element => {
  // data
  const { effect_entries, past_values, effect_chance, effect_changes } = move;
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
            <p key={`effect-entry-${i}`}>
              {effect.replace('$effect_chance', effect_chance?.toString())}
            </p>
          ))}
        </Box>
      )}
      <Box flexalign="flex-start" flexjustify="flex-start" flexgap="0.5em">
        <SectionTitle>Version Changes</SectionTitle>
        {past_values?.length > 0
          ? past_values.map(({ version_group }, i) => {
              const phrase = buildValuesPhrase(past_values[i], effect_changes);
              if (phrase) {
                return (
                  <p key={`move-past-value-${i}`}>
                    {`Prior to ${mapGroupToGeneration(version_group.name)}, `}
                    <BoldSpan>{moveName}</BoldSpan>
                    {` ${phrase}.`}
                  </p>
                );
              } else if (past_values.length === 1) {
                return (
                  <p key={`move-past-value-${i}`}>
                    <BoldSpan>{moveName}</BoldSpan>
                    {' has no previous version changes.'}
                  </p>
                );
              } else {
                return null;
              }
            })
          : 'No changes in previous Generations.'}
      </Box>
    </Box>
  );
};

export default MoveEntries;
