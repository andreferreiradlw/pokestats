import { HTMLMotionProps } from 'framer-motion';
import { Container } from './styledAutocompleteV2';
import { CSSProperties } from '@mui/styled-engine-sc';
import { useAutocompleteOptions } from '@/hooks';

export interface AutocompleteV2Props extends HTMLMotionProps<'div'> {
  width?: CSSProperties['width'];
}

const AutocompleteV2 = (props: AutocompleteV2Props): JSX.Element => {
  // fetch data
  const { data, isLoading } = useAutocompleteOptions();

  return <Container {...props}>AutocompleteV2</Container>;
};

export default AutocompleteV2;
