import { Fragment } from 'react';
// helpers
import type { NamedAPIResource } from 'pokenode-ts';
// styles
import { Table } from '@/BaseStyles';
// components
import type { MovePageProps } from '..';
import type { Grid2Props } from '@mui/material';
import { Box, Grid2, Stack, Typography } from '@mui/material';

interface MoveMachinesProps extends Grid2Props {
  moveName: string;
  machines: MovePageProps['moveMachines'];
  moveType: NamedAPIResource['name'];
}

const MoveMachines = ({
  moveName,
  moveType,
  machines,
  ...rest
}: MoveMachinesProps): JSX.Element => {
  return (
    <Grid2
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      gap={1}
      {...rest}
    >
      <Typography variant="sectionTitle">Machines</Typography>
      {machines ? (
        <Box component={Table}>
          <tbody>
            {Object.keys(machines).map((currKey, i) => (
              <tr key={`move-machine-${i}`}>
                <th>
                  {machines[currKey].groups.map((currMachine, i) => (
                    <Fragment key={`machine-${currKey}-${i}`}>
                      <Typography whiteSpace="normal" fontWeight="600" component="span">
                        {currMachine.map(
                          (machine, i) => `${machine}${currMachine.length > i + 1 ? ' / ' : ''}`,
                        )}
                      </Typography>
                      {machines[currKey].groups.length > 1 && <br />}
                    </Fragment>
                  ))}
                </th>
                <Stack
                  flexDirection="row"
                  justifyContent="flex-end"
                  width="100%"
                  margin="0 auto"
                  gap={0.5}
                  component="td"
                >
                  <Typography component="span">{machines[currKey].machine}</Typography>
                  <img
                    src={`https://raw.githubusercontent.com/msikma/pokesprite/master/items/${
                      machines[currKey].machine.includes('hm') ? 'hm' : 'tm'
                    }/${moveType}.png`}
                    alt={moveType}
                    width="30"
                  />
                </Stack>
              </tr>
            ))}
          </tbody>
        </Box>
      ) : (
        <Typography>
          <Typography fontWeight="600" component="span">
            {moveName}
          </Typography>
          {` has no machine names in any version.`}
        </Typography>
      )}
    </Grid2>
  );
};

export default MoveMachines;
