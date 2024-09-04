import { forwardRef } from 'react';
// animations
import { loadingChild, staggerExitLoadingVariant } from '@/animations';
// styles
import { LoadingContainer, PotionIcon, PokeballIcon, RecordIcon, Text } from './StyledLoading';
// components
import type { StackProps } from '@mui/material';
import { Stack } from '@mui/material';
import { motion } from 'framer-motion';

export interface LoadingProps extends StackProps {
  $iconWidth?: number | string | Record<string, string | number>;
  noIcon?: boolean;
  passKey?: string;
  text?: string;
  icon?: 'potion' | 'pokeball' | 'record';
}

interface LoadingIconProps {
  width: LoadingProps['$iconWidth'];
  icon: LoadingProps['icon'];
}

const LoadingIcon = ({ width, icon }: LoadingIconProps): JSX.Element => {
  switch (icon) {
    case 'pokeball':
      return <PokeballIcon $iconWidth={width} />;
    case 'record':
      return <RecordIcon $iconWidth={width} />;
    default:
      return <PotionIcon $iconWidth={width} />;
  }
};

const Loading = forwardRef(
  (
    { $iconWidth, noIcon, icon, text, passKey, alignItems, ...rest }: LoadingProps,
    ref: any,
  ): JSX.Element => (
    <Stack
      ref={ref}
      justifyContent="center"
      alignItems="center"
      height="auto"
      flexGrow={1}
      gap={2}
      width="100%"
      component={LoadingContainer}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={staggerExitLoadingVariant}
      key={passKey}
      {...rest}
    >
      {!noIcon && (
        <Stack
          width="100%"
          justifyContent="center"
          alignItems={alignItems || 'center'}
          component={motion.div}
          variants={loadingChild}
          key={`icon-${passKey}`}
        >
          <LoadingIcon width={$iconWidth} icon={icon} />
        </Stack>
      )}
      {text && (
        <Stack
          width="100%"
          justifyContent="center"
          alignItems="center"
          component={motion.div}
          variants={loadingChild}
          key={`text-${passKey}`}
        >
          <Text variant="sectionSubTitle" textTransform="capitalize">
            {text}
          </Text>
        </Stack>
      )}
    </Stack>
  ),
);

Loading.displayName = 'Loading';

export default Loading;
