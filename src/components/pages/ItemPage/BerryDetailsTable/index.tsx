import { useMemo } from 'react';
// types
import type { Berry } from 'pokenode-ts';
// helpers
import { usePlausible } from 'next-plausible';
import { capitalise, removeDash } from '@/helpers';
// components
import { Numbered, Table } from '@/BaseStyles';
import { Grid2, Stack, Tooltip, Typography, type Grid2Props } from '@mui/material';
import CustomButton from '@/components/CustomButton';
import Link from 'next/link';

interface BerryDetailsTableProps extends Grid2Props {
  berry: Berry;
}

const BerryDetailsTable = ({ berry, ...rest }: BerryDetailsTableProps): JSX.Element => {
  // analytics
  const plausible = usePlausible();

  // berry data
  const {
    growth_time,
    firmness,
    smoothness,
    soil_dryness,
    size,
    max_harvest,
    natural_gift_power,
    natural_gift_type,
    flavors,
  } = berry;

  const berryFlavors = useMemo(() => flavors.filter(({ potency }) => potency > 0), [flavors]);

  return (
    <Grid2 container size={12} spacing={2} direction="column" {...rest}>
      <Grid2 size={12} component={Typography} variant="sectionTitle">
        Berry Information
      </Grid2>
      <Grid2 size={12}>
        <Table>
          <tbody>
            <tr>
              <Tooltip title="The size of this Berry.">
                <th>Size</th>
              </Tooltip>
              <Typography component="td">{`${size / 10} cm`}</Typography>
            </tr>
            {berryFlavors.length > 0 && (
              <tr>
                <Tooltip title="The referenced berry flavor and how powerful it is for this berry.">
                  <th>Flavors</th>
                </Tooltip>
                <Stack component="td">
                  {berryFlavors.map(({ flavor, potency }, i) => (
                    <Numbered key={flavor.name}>
                      <Typography fontWeight="500" textTransform="capitalize">
                        {`${berryFlavors.length > 1 ? `${i + 1}.` : ''} ${removeDash(flavor.name)}`}
                      </Typography>
                      <Typography variant="body2" component="span">
                        {`Potency: ${potency}`}
                      </Typography>
                    </Numbered>
                  ))}
                </Stack>
              </tr>
            )}
            <tr>
              <Tooltip title="Time it takes the tree to grow one stage, in hours. Berry trees go through four of these growth stages before they can be picked">
                <th>Growth Time</th>
              </Tooltip>
              <Typography component="td">{`${growth_time} hours`}</Typography>
            </tr>
            <tr>
              <Tooltip title="The firmness of this berry, used in making Pokéblocks or Poffins.">
                <th>Firmness</th>
              </Tooltip>
              <Typography component="td">{capitalise(removeDash(firmness.name))}</Typography>
            </tr>
            <tr>
              <Tooltip title="The smoothness of this Berry, used in making Pokéblocks or Poffins.">
                <th>Smoothness</th>
              </Tooltip>
              <Typography component="td">{smoothness}</Typography>
            </tr>
            <tr>
              <Tooltip title="The speed at which this Berry dries out the soil as it grows. A higher rate means the soil dries more quickly.">
                <th>Soil Dryness</th>
              </Tooltip>
              <Typography component="td">{soil_dryness}</Typography>
            </tr>
            <tr>
              <Tooltip title="The maximum number of these berries that can grow on one tree in Generation IV.">
                <th>Max Harvest</th>
              </Tooltip>
              <Typography component="td">{max_harvest}</Typography>
            </tr>
            {natural_gift_power > 0 && (
              <tr>
                <Tooltip title="The power and type of the move 'Natural Gift' when used with this Berry.">
                  <th>Natural Gift</th>
                </Tooltip>
                <Stack component="td">
                  <Typography gutterBottom>{`Power: ${natural_gift_power}`}</Typography>
                  <Typography>{`Type: ${capitalise(natural_gift_type.name)}`}</Typography>
                </Stack>
              </tr>
            )}
          </tbody>
        </Table>
      </Grid2>
      <Grid2 size={12}>
        <Link href="/berries" passHref legacyBehavior>
          <CustomButton
            size="large"
            variant="contained"
            onClick={() => plausible('See All Berries Click')}
          >
            See all berries
          </CustomButton>
        </Link>
      </Grid2>
    </Grid2>
  );
};

export default BerryDetailsTable;
