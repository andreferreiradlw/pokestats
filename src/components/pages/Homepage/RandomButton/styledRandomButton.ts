// helpers
import { styled } from '@mui/material/styles';
import { rotate } from '@/animations';
// icons
import PokeballIcon from 'public/static/iconLibrary/pokeball.svg';

export const Pokeball = styled(PokeballIcon)`
  animation: 3s ${rotate} 0ms infinite linear;
  width: 1em;
`;
