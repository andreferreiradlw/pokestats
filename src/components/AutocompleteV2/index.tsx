import { HTMLMotionProps } from 'framer-motion';
import { Container } from './styledAutocompleteV2';
import { CSSProperties } from '@mui/styled-engine-sc';

export interface AutocompleteV2Props extends HTMLMotionProps<'div'> {
  // filterList: (Pokemon | PokemonType | MoveType)[];
  width?: CSSProperties['width'];
  filterList: any;
}

const AutocompleteV2 = ({ filterList, ...rest }: AutocompleteV2Props): JSX.Element => {
  return <Container {...rest}>AutocompleteV2</Container>;
};

export default AutocompleteV2;
