import { useMemo } from 'react';
// types
import type { MoveTarget as PokenodeMoveTarget } from 'pokenode-ts';
// styles
import { SectionTitle } from '@/BaseStyles';
// components
import Box, { BoxProps } from '@/components/Box';

interface MoveTargetProps extends BoxProps {
  target: PokenodeMoveTarget;
}

const MoveTarget = ({ target, ...rest }: MoveTargetProps): JSX.Element => {
  // data
  const { name, descriptions } = target;
  // memo
  const targetDescription = useMemo(
    () => descriptions.find(flavor => flavor.language.name === 'en').description,
    [descriptions],
  );

  return (
    <Box flexalign="flex-start" flexjustify="flex-start" flexgap="1em" {...rest}>
      <SectionTitle>Target</SectionTitle>
      <p>{targetDescription}</p>
    </Box>
  );
};

export default MoveTarget;
