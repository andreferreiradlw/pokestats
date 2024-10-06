import { useMemo } from 'react';
// types
import type { ItemAttribute, ItemFlingEffect } from 'pokenode-ts';
// components
import { Grid2, Typography, type Grid2Props } from '@mui/material';
import { Table } from '@/BaseStyles';
import {
  capitalise,
  findEnglishDescription,
  findEnglishEffect,
  findEnglishName,
  removeDash,
} from '@/helpers';

export interface ItemEffectsProps extends Grid2Props {
  flingEffect: ItemFlingEffect | null;
  attributes: ItemAttribute[];
}

const ItemEffects = ({ attributes, flingEffect, ...rest }: ItemEffectsProps): JSX.Element => {
  const attributeRows = useMemo(
    () =>
      attributes.map(({ id, names, descriptions }) => {
        const attributeName = findEnglishName(names)?.replaceAll('_', ' ') || 'Unknown';
        const attributeDescription =
          findEnglishDescription(descriptions) || 'No description available for this item.';
        return (
          <tr key={`attribute-${id}`}>
            <th scope="row">{attributeName}</th>
            <Typography component="td">{attributeDescription}</Typography>
          </tr>
        );
      }),
    [attributes],
  );

  const flingEffectRow = useMemo(() => {
    if (!flingEffect) return null;
    const flingEffectName = capitalise(removeDash(flingEffect.name));
    const flingEffectDescription =
      findEnglishEffect(flingEffect.effect_entries) || 'No fling effect description available.';
    return (
      <tr>
        <th scope="row">{flingEffectName}</th>
        <Typography component="td">{flingEffectDescription}</Typography>
      </tr>
    );
  }, [flingEffect]);

  return (
    <Grid2 container spacing={4} flexDirection="column" {...rest}>
      <Grid2 size={12} gap={2} flexDirection="column">
        <Typography variant="sectionTitle">Attributes</Typography>
        {attributes.length > 0 ? (
          <Table sx={{ tableLayout: 'auto' }}>
            <tbody>{attributeRows}</tbody>
          </Table>
        ) : (
          <Typography variant="subtitle1">This item has no attributes.</Typography>
        )}
      </Grid2>

      {flingEffect && (
        <Grid2 size={12} gap={2} flexDirection="column">
          <Typography variant="sectionTitle">Fling Effect</Typography>
          <Table sx={{ tableLayout: 'auto' }}>
            <tbody>{flingEffectRow}</tbody>
          </Table>
        </Grid2>
      )}
    </Grid2>
  );
};

export default ItemEffects;
