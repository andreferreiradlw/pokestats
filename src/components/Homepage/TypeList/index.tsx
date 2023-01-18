// types
import type { Type } from 'pokenode-ts';
// styles
import { SectionTitle } from '@/components/BaseStyles';
// components
import Box, { BoxProps } from '@/components/Box';
import TypeBadge from '@/components/TypeBadge';

interface TypeListProps extends BoxProps {
  types: Type[];
}

const TypeList = ({ types, ...rest }: TypeListProps): JSX.Element => {
  if (!types) return null;

  return (
    <Box $constrained $withGutter flexalign="flex-start" flexjustify="flex-start" {...rest}>
      <Box flexalign="flex-start" flexjustify="flex-start" flexgap="1em">
        <SectionTitle>Types</SectionTitle>
        <Box
          flexdirection="row"
          flexalign="flex-start"
          flexjustify="flex-start"
          flexgap="1em"
          flexwrap="wrap"
        >
          {types?.map(({ name }, i) => (
            <TypeBadge $typename={name} key={`homepage-typebadge-${name}-${i}`} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default TypeList;
