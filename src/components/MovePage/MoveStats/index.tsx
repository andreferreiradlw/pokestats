// types
import type { Move } from 'pokenode-ts';
// helpers
import { capitalise, removeDash } from '@/helpers';
// styles
import { BoldSpan, SectionSubTitle, Table } from '@/BaseStyles';
// components
import Box, { BoxProps } from '@/components/Box';

interface MoveStatsProps extends BoxProps {
  move: Move;
  moveName: string;
}

const MoveStats = ({ move, moveName, ...rest }: MoveStatsProps): JSX.Element => {
  // data
  const { name, stat_changes } = move;

  return (
    <Box flexalign="flex-start" flexjustify="flex-start" flexgap="0.5em" {...rest}>
      <SectionSubTitle>Stat Changes</SectionSubTitle>
      {stat_changes?.length > 0 ? (
        <Table>
          <tbody>
            {stat_changes.map(({ change, stat }, i) => (
              <tr key={`stat-change-${name}-${stat.name}-${i}`}>
                <th>{capitalise(removeDash(stat.name))}</th>
                <td>{change}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>
          <BoldSpan>{moveName}</BoldSpan>
          {` doesn't affect any stats when used.`}
        </p>
      )}
    </Box>
  );
};

export default MoveStats;
