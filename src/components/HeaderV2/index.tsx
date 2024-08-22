// components
import Link from 'next/link';
import GameGenSelect from '../GameGenSelect';
import AutocompleteV2 from '../AutocompleteV2';
import { AppBarProps, Stack } from '@mui/material';
// helpers
import { hoverVariant } from '@/helpers';
// styles
import { ContentContainer, HeaderContainer, Logo } from './styledHeaderV2';

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
      <AutocompleteV2 width="350px" autocompleteOptions={{ size: 'small' }} />
    </ContentContainer>
  </HeaderContainer>
);

export default HeaderV2;
