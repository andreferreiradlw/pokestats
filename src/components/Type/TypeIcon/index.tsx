import { useMemo } from 'react';
// types
import type { Name } from 'pokenode-ts';
// components
import Box, { BoxProps } from '@/components/Box';
import TypeBadge from '@/components/TypeBadge';
// styles
import { JpnName } from '@/components/BaseStyles';

interface TypeIconProps extends BoxProps {
  typeName: string;
  otherNames: Name[];
}

const TypeIcon = ({ typeName, otherNames, ...rest }: TypeIconProps): JSX.Element => {
  // memo
  const japanName = useMemo(
    () => otherNames.find(name => name.language.name === 'ja-Hrkt').name,
    [otherNames],
  );

  return (
    <Box $isRelative minheight={{ xxs: '250px', lg: '350px' }} {...rest}>
      <TypeBadge
        $typename={typeName}
        key={`type-icon-${typeName}`}
        $iconOnly
        $fill
        $float
        $iconWidth="auto"
        $iconHeight="150px"
      />
      {japanName && <JpnName>{`${japanName}タイプ`}</JpnName>}
    </Box>
  );
};

export default TypeIcon;
