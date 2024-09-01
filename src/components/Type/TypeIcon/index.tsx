import { useMemo } from 'react';
// types
import type { Name } from 'pokenode-ts';
// components
import { Stack, StackProps, Theme } from '@mui/material';
import TypeBadge from '@/components/TypeBadge';
// styles
import { JpnName } from '@/components/BaseStyles';

interface TypeIconProps extends StackProps {
  typeName: keyof Theme['palette']['types'];
  otherNames: Name[];
}

const TypeIcon = ({ typeName, otherNames, ...rest }: TypeIconProps): JSX.Element => {
  // memo
  const japanName = useMemo(
    () => otherNames.find(name => name.language.name === 'ja-Hrkt')?.name,
    [otherNames],
  );

  return (
    <Stack
      position="relative"
      minHeight={{ xxs: '250px', lg: '350px' }}
      flexGrow={1}
      justifyContent="center"
      alignItems="center"
      {...rest}
    >
      <TypeBadge
        $typename={typeName}
        key={`type-icon-${typeName}`}
        $iconOnly
        $fill
        $iconWidth="auto"
        $iconHeight="150px"
      />
      {japanName && <JpnName>{`${japanName}タイプ`}</JpnName>}
    </Stack>
  );
};

export default TypeIcon;
