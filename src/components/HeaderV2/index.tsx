// components
import Link from 'next/link';
import GameGenSelect from '../GameGenSelect';
import AutocompleteV2 from '../AutocompleteV2';
import type { AppBarProps } from '@mui/material';
import { Stack } from '@mui/material';
// helpers
import { hoverVariant } from '@/animations';
// styles
import { ContentContainer, HeaderContainer, Logo } from './styledHeaderV2';
import ThemeToggleButton from '../ThemeToggleButton';

export interface HeaderV2Props extends AppBarProps {
  showGenSelect?: boolean;
}

const HeaderV2 = ({ showGenSelect, ...rest }: HeaderV2Props): JSX.Element => (
  <HeaderContainer position="static" elevation={2} {...rest}>
    <ContentContainer maxWidth="xl">
      <Stack width="auto" justifyContent="flex-start" alignItems="flex-start">
        <Link href="/" passHref legacyBehavior>
          <Logo whileHover="hover" whileTap="tap" variants={hoverVariant}>
            Pokestats
          </Logo>
        </Link>
        {showGenSelect && <GameGenSelect />}
      </Stack>
      <Stack
        width="auto"
        direction={{ xxs: 'row-reverse', md: 'row' }}
        justifyContent={{ xxs: 'center', md: 'flex-end' }}
        alignItems="center"
        gap={2}
        flexWrap={{ xxs: 'wrap', md: 'nowrap' }}
      >
        <ThemeToggleButton />
        <AutocompleteV2 width="350px" autocompleteOptions={{ size: 'small' }} />
      </Stack>
    </ContentContainer>
  </HeaderContainer>
);

export default HeaderV2;
