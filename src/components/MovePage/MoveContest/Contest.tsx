import React, { useMemo } from 'react';
// types
import type {
  ContestComboDetail,
  ContestEffect,
  NamedAPIResource,
  SuperContestEffect,
} from 'pokenode-ts';
// helpers
import { capitalise, createSentence, removeDash } from '@/helpers';
// styles
import { Anchor, BoldSpan, SectionSubTitle, Table } from '@/BaseStyles';
// components
import Box, { BoxProps } from '@/components/Box';

interface ContestProps extends BoxProps {
  combos: ContestComboDetail;
  contestType: any;
  moveName: string;
  effect: ContestEffect | SuperContestEffect;
  title?: string;
}

const renderLinks = (combos: NamedAPIResource[], lastDivider = 'or'): JSX.Element => {
  const combosLength = combos.length;

  return (
    <>
      {combos.map(({ name }, i) => (
        <React.Fragment key={`${name}-combo-${i}`}>
          <Anchor href={`/move/${name}`}>{capitalise(removeDash(name))}</Anchor>
          {`${i + 1 === combosLength ? '' : combosLength > i + 2 ? ', ' : ` ${lastDivider} `}`}
        </React.Fragment>
      ))}
    </>
  );
};

const Contest = ({
  combos,
  moveName,
  contestType,
  effect,
  title,
  ...rest
}: ContestProps): JSX.Element => {
  // @ts-ignore
  const { appeal, jam } = effect || {};
  // memo
  const contestFlavorText = useMemo(
    () =>
      effect
        ? effect.flavor_text_entries.find(flavor => flavor.language.name === 'en').flavor_text
        : 'No flavor text available for this move.',
    [effect],
  );

  return (
    <Box flexalign="flex-start" flexjustify="flex-start" flexgap="0.5em" {...rest}>
      {title && <SectionSubTitle>{title}</SectionSubTitle>}
      <Table style={{ maxWidth: '300px' }}>
        <tbody>
          <tr>
            <th>Appeal</th>
            <td>{appeal}</td>
          </tr>
          {/** @ts-ignore */}
          {jam !== undefined && (
            <tr>
              <th>Jam</th>
              {/** @ts-ignore */}
              <td>{jam}</td>
            </tr>
          )}
        </tbody>
      </Table>
      <p>{contestFlavorText}</p>
      {combos?.use_after && (
        <p>
          <BoldSpan>Combo: </BoldSpan>
          {`If `}
          {renderLinks(combos.use_after)}
          {` is used before `}
          <BoldSpan>{moveName}</BoldSpan>
          {`, the user gains ${appeal * 2} appeal points instead of ${appeal}.`}
        </p>
      )}
      {combos?.use_before && (
        <p>
          <BoldSpan>Combo: </BoldSpan>
          {`If `}
          <BoldSpan>{moveName}</BoldSpan>
          {` is used before `}
          {renderLinks(combos.use_before)}
          {` causes the second move to score double the normal appeal.`}
        </p>
      )}
    </Box>
  );
};

export default Contest;
