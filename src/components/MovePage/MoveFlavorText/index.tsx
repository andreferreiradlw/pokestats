import { BoldSpan, SectionTitle, Table } from '@/BaseStyles';
import Box, { BoxProps } from '@/components/Box';
import { formatFlavorText, listGamesByGroup, listGenGroupsByGroup } from '@/helpers';
import { MoveFlavorText as PokenodeMoveFlavorText } from 'pokenode-ts';
import { useMemo, Fragment } from 'react';

interface GroupedFlavorText {
  flavor: string;
  games: string[][];
}
interface MoveFlavorTextProps extends BoxProps {
  flavorTexts: PokenodeMoveFlavorText[];
}

const MoveFlavorText = ({ flavorTexts, ...rest }: MoveFlavorTextProps): JSX.Element => {
  // memo
  const groupFlavorByVersionGroup = useMemo(
    () =>
      flavorTexts.reduce(
        (acc: Record<string, GroupedFlavorText>, { version_group, flavor_text, language }) => {
          if (language.name !== 'en') return acc;

          const genGroups = listGenGroupsByGroup(version_group.name);
          const primaryGroup = genGroups[0];

          if (!acc[primaryGroup]) {
            acc[primaryGroup] = {
              flavor: formatFlavorText(flavor_text),
              games: genGroups.map(group => listGamesByGroup(group)),
            };
          }

          return acc;
        },
        {},
      ),
    [flavorTexts],
  );

  return (
    <Box flexalign="flex-start" flexjustify="flex-start" flexgap="0.5em" {...rest}>
      <SectionTitle>Descriptions</SectionTitle>
      <Table>
        <tbody>
          {Object.entries(groupFlavorByVersionGroup).map(([groupKey, { flavor, games }], i) => (
            <tr key={`attack-flavor-${i}`}>
              <th>
                {games.map((gameGroup, j) => (
                  <Fragment key={`move-${groupKey}`}>
                    <BoldSpan>
                      {gameGroup.map(
                        (game, k) => `${game}${k < gameGroup.length - 1 ? ' / ' : ''}`,
                      )}
                    </BoldSpan>
                    {j < games.length - 1 && <br />}
                  </Fragment>
                ))}
              </th>
              <td>{flavor}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default MoveFlavorText;
