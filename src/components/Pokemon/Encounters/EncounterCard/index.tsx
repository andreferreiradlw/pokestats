import { useMemo } from 'react';
// helpers
import { staggerChildVariant } from '@/animations';
import { mapEncounterMethodIcons, parseLocationName } from '@/helpers';
// hooks
import type { EncounterData } from '@/hooks';
// components
import { Table } from '@/BaseStyles';
import {
  capitalize,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid2,
  Stack,
  Typography,
  type Grid2Props,
} from '@mui/material';
import { motion } from 'framer-motion';

interface EncounterCardProps extends Grid2Props {
  encounter: EncounterData;
  generation: string;
  pokemonName: string;
}

type FormattedEncounter = Record<
  string,
  {
    maxLevel: number;
    minLevel: number;
    maxChance: number;
    methodName: string;
    iconUrl: string;
  }
>;

const EncounterCard = ({
  encounter,
  generation,
  pokemonName,
  ...rest
}: EncounterCardProps): JSX.Element => {
  const { location_area } = encounter;

  const formattedEncounter = useMemo(() => {
    const { location_area, version_details } = encounter;
    // format location area data
    const area = {
      id: location_area.name,
      ...parseLocationName(location_area),
    };

    // format version details data
    const encounterDetails = version_details.encounter_details.reduce(
      (acc, { chance, max_level, min_level, method: currMethod }) => {
        const methodName = currMethod.name;
        const existingEntry = acc[methodName];

        if (!existingEntry) {
          acc[methodName] = {
            maxLevel: max_level,
            minLevel: min_level,
            maxChance: chance,
            methodName: capitalize(methodName),
            iconUrl: mapEncounterMethodIcons(
              methodName,
              pokemonName,
              location_area.name,
              generation,
            ),
          };

          return acc;
        }

        // Update existing entry with the maximum and minimum values
        existingEntry.maxLevel = Math.max(existingEntry.maxLevel, max_level);
        existingEntry.minLevel = Math.min(existingEntry.minLevel, min_level);
        existingEntry.maxChance = Math.max(existingEntry.maxChance, chance);

        return acc;
      },
      {} as FormattedEncounter,
    );

    // return formatted data
    return { area, encounterDetails };
  }, [encounter, generation, pokemonName]);

  return (
    <Grid2
      size={{ xxs: 6, md: 4, lg: 3 }}
      component={motion.div}
      variants={staggerChildVariant}
      {...rest}
    >
      <Card sx={{ width: '100%' }}>
        <CardHeader
          title={formattedEncounter.area.title}
          subheader={formattedEncounter.area.subtitle}
        />
        <CardMedia
          sx={{ height: 200 }}
          image={`https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/regions/${generation}/${location_area.name}.png`}
          title={location_area.name}
        />
        <CardContent>
          {formattedEncounter && (
            <Table>
              <tbody>
                {Object.keys(formattedEncounter.encounterDetails).map(key => {
                  // encounter details
                  const { maxLevel, minLevel, methodName, iconUrl, maxChance } =
                    formattedEncounter.encounterDetails[key];
                  // table row
                  return (
                    <tr key={methodName}>
                      <Stack component="th" alignItems="center">
                        <img src={iconUrl} alt={methodName} width="40px" />
                        <Typography variant="body2">{methodName}</Typography>
                      </Stack>
                      <td>
                        <Typography gutterBottom>
                          Level: {minLevel === maxLevel ? maxLevel : `${minLevel} to ${maxLevel}`}
                        </Typography>
                        <Typography>{`Chance: ${maxChance}%`}</Typography>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </CardContent>
      </Card>
    </Grid2>
  );
};

export default EncounterCard;
