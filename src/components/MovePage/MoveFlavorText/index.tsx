import { SectionTitle, Table } from '@/BaseStyles';
import Box, { BoxProps } from '@/components/Box';
import { formatFlavorText, mapGroupToGeneration } from '@/helpers';
import { MoveFlavorText as PokenodeMoveFlavorText } from 'pokenode-ts';

interface MoveFlavorTextProps extends BoxProps {
  flavorTexts: PokenodeMoveFlavorText[];
}

const MoveFlavorText = ({ flavorTexts, ...rest }: MoveFlavorTextProps): JSX.Element => {
  return (
    <Box flexalign="flex-start" flexjustify="flex-start" flexgap="1em" {...rest}>
      <SectionTitle>Descriptions</SectionTitle>
      <Table>
        <tbody>
          {flavorTexts.map(({ version_group, flavor_text }, i) => (
            <tr key={`attack-flavor-${i}`}>
              <th>{mapGroupToGeneration(version_group.name)}</th>
              <td>{formatFlavorText(flavor_text)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default MoveFlavorText;
