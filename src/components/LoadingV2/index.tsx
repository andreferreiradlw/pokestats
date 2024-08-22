// helpers
import { loadingChild } from '@/helpers';
// components
import { Stack, StackProps } from '@mui/material';
import { motion } from 'framer-motion';
// styles
import { Description, IconContainer, PokeballIcon, PotionIcon, RecordIcon } from './StyledLoading';

export interface LoadingV2Props extends StackProps {
  $iconWidth?: number;
  description?: string;
  iconShape?: 'potion' | 'pokeball' | 'record';
}

interface LoadingIconProps {
  icon: LoadingV2Props['iconShape'];
}

const LoadingIcon = ({ icon }: LoadingIconProps): JSX.Element => {
  switch (icon) {
    case 'pokeball':
      return <PokeballIcon />;
    case 'record':
      return <RecordIcon />;
    default:
      return <PotionIcon />;
  }
};

const LoadingV2 = ({
  $iconWidth,
  iconShape,
  description,
  ...rest
}: LoadingV2Props): JSX.Element => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      gap={4}
      py={4}
      component={motion.div}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={loadingChild}
      {...rest}
    >
      <IconContainer $iconWidth={$iconWidth || 12}>
        <LoadingIcon icon={iconShape} />
      </IconContainer>
      {description && <Description>{description}</Description>}
    </Stack>
  );
};

export default LoadingV2;
