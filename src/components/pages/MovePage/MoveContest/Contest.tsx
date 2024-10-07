import { Fragment, useMemo } from 'react';
// types
import type {
  ContestComboDetail,
  ContestEffect,
  NamedAPIResource,
  SuperContestEffect,
} from 'pokenode-ts';
// helpers
import { capitalise, removeDash } from '@/helpers';
// styles
import { Table } from '@/BaseStyles';
// components
import { Box, Link as MuiLink, Stack, Typography, type Grid2Props } from '@mui/material';
import Link from 'next/link';

interface ContestProps extends Grid2Props {
  combos?: ContestComboDetail;
  contestType: any;
  moveName: string;
  effect: ContestEffect | SuperContestEffect;
  title?: string;
}

// Render combo links
const renderLinks = (combos: NamedAPIResource[], lastDivider = 'or'): JSX.Element => (
  <>
    {combos.map(({ name }, i) => (
      <Fragment key={`${name}-combo`}>
        <MuiLink href={`/move/${name}`} component={Link}>
          {capitalise(removeDash(name))}
        </MuiLink>
        {i < combos.length - 1 && (i === combos.length - 2 ? ` ${lastDivider} ` : ', ')}
      </Fragment>
    ))}
  </>
);

// Render the combo text
const renderComboText = (
  comboMoves: NamedAPIResource[],
  moveName: string,
  appeal?: number,
  useAfter?: boolean,
): JSX.Element => (
  <Typography>
    <Typography fontWeight="600" component="span">
      Combo:{' '}
    </Typography>
    {'If '}
    {useAfter ? (
      renderLinks(comboMoves)
    ) : (
      <Typography fontWeight="600" component="span">
        {moveName}
      </Typography>
    )}
    {` ${useAfter ? 'is used before' : 'is used after'} `}
    {useAfter ? (
      <Typography fontWeight="600" component="span">
        {moveName}
      </Typography>
    ) : (
      renderLinks(comboMoves)
    )}
    {useAfter
      ? `, the user gains ${appeal ? appeal * 2 : 'double'} appeal points instead of ${appeal}.`
      : ' causes the second move to score double the normal appeal.'}
  </Typography>
);

const Contest = ({ combos, moveName, effect, title, ...rest }: ContestProps): JSX.Element => {
  // Extract appeal and jam safely
  const appeal = effect && 'appeal' in effect ? effect.appeal : undefined;
  const jam = effect && 'jam' in effect ? effect.jam : undefined;

  // Memoize the contest flavor text
  const contestFlavorText = useMemo(
    () =>
      effect
        ? effect.flavor_text_entries.find(flavor => flavor.language.name === 'en')?.flavor_text ||
          'No flavor text available for this move.'
        : 'No flavor text available for this move.',
    [effect],
  );

  return (
    <Stack alignItems="flex-start" justifyContent="flex-start" gap={1} {...rest}>
      {title && <Typography variant="sectionSubTitle">{title}</Typography>}
      <Box maxWidth="300px" component={Table}>
        <tbody>
          <tr>
            <th>Appeal</th>
            <td>{appeal ?? 'N/A'}</td>
          </tr>
          {jam !== undefined && (
            <tr>
              <th>Jam</th>
              <td>{jam}</td>
            </tr>
          )}
        </tbody>
      </Box>
      <Typography>{contestFlavorText}</Typography>
      {combos?.use_after && renderComboText(combos.use_after, moveName, appeal, true)}
      {combos?.use_before && renderComboText(combos.use_before, moveName, appeal, false)}
    </Stack>
  );
};

export default Contest;
