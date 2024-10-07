import { memo } from 'react';
// types
import type { EvolutionDetail } from 'pokenode-ts';
// helpers
import { getResourceId } from '@/helpers';
// components
import { Stack, type StackProps } from '@mui/material';
import EvolutionDetailItem from './EvolutionDetailItem';

interface EvolutionDetailsProps extends StackProps {
  details?: EvolutionDetail[];
}

const EvolutionDetails = memo(({ details, ...rest }: EvolutionDetailsProps): JSX.Element | null => {
  if (!details?.length) return null;

  const triggerOrder = { 'use-item': 1, trade: 2 };

  const renderedItems = details
    .sort((a, b) => {
      return (
        (triggerOrder[b.trigger?.name as keyof typeof triggerOrder] || 0) -
        (triggerOrder[a.trigger?.name as keyof typeof triggerOrder] || 0)
      );
    })
    .map((detail, i) => {
      const shouldRender =
        detail.trigger?.name !== 'level-up' || Object.values(detail).some(x => x);

      if (!shouldRender) return null;

      return (
        <EvolutionDetailItem key={getResourceId(detail.trigger?.url || `${i}`)} triggers={detail} />
      );
    })
    .filter(Boolean);

  if (!renderedItems.length) return null;

  return (
    <Stack gap="0.5em" width="auto" {...rest}>
      {renderedItems}
    </Stack>
  );
});

export default EvolutionDetails;
