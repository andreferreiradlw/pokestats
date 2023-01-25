import { BoldSpan, SectionTitle, Table } from '@/BaseStyles';
import Box, { BoxProps } from '@/components/Box';
import { formatFlavorText, listGamesByGroup, listGenGroupsByGroup } from '@/helpers';
import { MoveFlavorText as PokenodeMoveFlavorText } from 'pokenode-ts';
import { useMemo, Fragment } from 'react';

interface MoveFlavorTextProps extends BoxProps {
  flavorTexts: PokenodeMoveFlavorText[];
}

const MoveFlavorText = ({ flavorTexts, ...rest }: MoveFlavorTextProps): JSX.Element => {
  // memo
  const groupFlavorByVersionGroup = useMemo(() => {
    let result = {};

    flavorTexts.forEach(({ version_group, flavor_text }) => {
      const currGenGroups = listGenGroupsByGroup(version_group.name);
      // check if gen group already has a key
      if (
        !result[version_group.name] &&
        !result[currGenGroups[0]] &&
        version_group.name === currGenGroups[0]
      ) {
        result[version_group.name] = {
          flavor: formatFlavorText(flavor_text),
          groups: currGenGroups.map(group => listGamesByGroup(group)),
        };
      }
    });

    return result;
  }, [flavorTexts]);

  return (
    <Box flexalign="flex-start" flexjustify="flex-start" flexgap="0.5em" {...rest}>
      <SectionTitle>Descriptions</SectionTitle>
      <Table>
        <tbody>
          {Object.keys(groupFlavorByVersionGroup).map((currKey, i) => (
            <tr key={`attack-flavor-${i}`}>
              <th>
                {groupFlavorByVersionGroup[currKey].groups.map((currGroup, i) => (
                  <Fragment key={`move-${currKey}-${i}`}>
                    <BoldSpan>
                      {currGroup.map(
                        (game, i) => `${game}${currGroup.length > i + 1 ? ' / ' : ''}`,
                      )}
                    </BoldSpan>
                    {groupFlavorByVersionGroup[currKey].groups.length > 1 && <br />}
                  </Fragment>
                ))}
              </th>
              <td>{groupFlavorByVersionGroup[currKey].flavor}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default MoveFlavorText;
