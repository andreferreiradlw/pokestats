import React from 'react';
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
  const japanName = otherNames.find(name => name.language.name === 'ja-Hrkt').name;

  return (
    <Box $relative $minHeight={{ xxs: '250px', lg: '350px' }} {...rest}>
      <TypeBadge
        typename={typeName}
        key={`type-icon-${typeName}`}
        $iconOnly
        $fill
        $float
        $iconWidth="auto"
        $iconHeight="150px"
      />
      {japanName && <JpnName>{japanName}</JpnName>}
    </Box>
  );
};

export default TypeIcon;
