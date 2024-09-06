import { staggerChildVariant } from '@/animations';
import type { EncounterData } from '@/hooks';
import { Card, CardContent, Grid2, Typography, type Grid2Props } from '@mui/material';
import { motion } from 'framer-motion';

interface EncounterCardProps extends Grid2Props {
  encounter: EncounterData;
}

const EncounterCard = ({ encounter, ...rest }: EncounterCardProps): JSX.Element => {
  return (
    <Grid2
      size={{ xxs: 6, md: 4, lg: 3 }}
      component={motion.div}
      variants={staggerChildVariant}
      {...rest}
    >
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {`${encounter.location_area.id}-${encounter.version_details.version.name}`}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </Card>
    </Grid2>
  );
};

export default EncounterCard;
