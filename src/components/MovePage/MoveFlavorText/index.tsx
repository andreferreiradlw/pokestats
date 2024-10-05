import { useMemo, Fragment } from 'react';
// types
import type { MoveFlavorText as PokenodeMoveFlavorText } from 'pokenode-ts';
// helpers
import {
  formatFlavorText,
  type GameGroup,
  listGamesByGroup,
  listGenGroupsByGroup,
} from '@/helpers';
// components
import { Table } from '@/BaseStyles';
import type { Grid2Props } from '@mui/material';
import { Box, Grid2, Typography } from '@mui/material';

interface GroupedFlavorText {
  flavor: string;
  games: string[][];
}
interface MoveFlavorTextProps extends Grid2Props {
  flavorTexts: PokenodeMoveFlavorText[];
}

// Helper function to group and format flavor texts
const groupFlavorTexts = (
  flavorTexts: PokenodeMoveFlavorText[],
): Record<string, GroupedFlavorText> => {
  const grouped = flavorTexts
    .filter(({ language }) => language.name === 'en') // Filter out non-English texts
    .reduce((acc: Record<string, GroupedFlavorText>, { version_group, flavor_text }) => {
      const genGroups = listGenGroupsByGroup(version_group.name as GameGroup); // Get generation groups by version group
      const primaryGroup = genGroups?.[0];

      if (primaryGroup && !acc[primaryGroup]) {
        acc[primaryGroup] = {
          flavor: formatFlavorText(flavor_text), // Format flavor text
          games: genGroups?.map(group => listGamesByGroup(group)), // List games by group
        };
      }
      return acc;
    }, {});
  return grouped;
};

const MoveFlavorText = ({ flavorTexts, ...rest }: MoveFlavorTextProps): JSX.Element => {
  // grouped flavor texts
  const groupFlavorByVersionGroup = useMemo(() => groupFlavorTexts(flavorTexts), [flavorTexts]);

  return (
    <Grid2
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      gap={1}
      {...rest}
    >
      <Typography variant="sectionTitle">Descriptions</Typography>
      <Box component={Table} sx={{ tableLayout: 'auto' }}>
        <tbody>
          {Object.entries(groupFlavorByVersionGroup).map(([groupKey, { flavor, games }]) => (
            <tr key={`attack-flavor-${groupKey}`}>
              <th>
                {games.map((gameGroup, j) => (
                  <Fragment key={`move-${groupKey}-${j}`}>
                    <Typography fontWeight="600" component="span">
                      {gameGroup.map(
                        (game, k) => `${game}${k < gameGroup.length - 1 ? ' / ' : ''}`,
                      )}
                    </Typography>
                    {j < games.length - 1 && <br />}
                  </Fragment>
                ))}
              </th>
              <td>{flavor}</td>
            </tr>
          ))}
        </tbody>
      </Box>
    </Grid2>
  );
};

export default MoveFlavorText;
