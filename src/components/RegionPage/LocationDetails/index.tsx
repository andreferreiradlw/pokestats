// types
import type { CanvasMapperArea } from '../CanvasMapper';
// components
import { Grid2, type Grid2Props } from '@mui/material';

interface LocationDetailsProps extends Grid2Props {
  area: CanvasMapperArea;
}

const LocationDetails = ({ area, ...rest }: LocationDetailsProps): JSX.Element => {
  console.log('selected area:', area);

  return (
    <Grid2 size={12} {...rest}>
      LocationDetails
    </Grid2>
  );
};

export default LocationDetails;
