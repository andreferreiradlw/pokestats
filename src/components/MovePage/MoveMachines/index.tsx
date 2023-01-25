import { Fragment } from 'react';
// helpers
import { NamedAPIResource } from 'pokenode-ts';
// styles
import { BoldSpan, SectionTitle, Table } from '@/BaseStyles';
// components
import Box, { BoxProps } from '@/components/Box';
import { MovePageProps } from '..';

interface MoveMachinesProps extends BoxProps {
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
    <Box flexalign="flex-start" flexjustify="flex-start" flexgap="0.5em" {...rest}>
      <SectionTitle>Machines</SectionTitle>
      {machines ? (
        <Table>
          <tbody>
            {Object.keys(machines).map((currKey, i) => (
              <tr key={`move-machine-${i}`}>
                <th>
                  {machines[currKey].groups.map((currMachine, i) => (
                    <Fragment key={`machine-${currKey}-${i}`}>
                      <BoldSpan style={{ whiteSpace: 'normal' }}>
                        {currMachine.map(
                          (machine, i) => `${machine}${currMachine.length > i + 1 ? ' / ' : ''}`,
                        )}
                      </BoldSpan>
                      {machines[currKey].groups.length > 1 && <br />}
                    </Fragment>
                  ))}
                </th>
                <td>
                  <Box
                    flexdirection="row"
                    flexjustify="flex-end"
                    width="100%"
                    flexmargin="0 auto"
                    flexgap="0.1em"
                  >
                    <span>{machines[currKey].machine}</span>
                    <img
                      src={`https://raw.githubusercontent.com/msikma/pokesprite/master/items/${
                        machines[currKey].machine.includes('hm') ? 'hm' : 'tm'
                      }/${moveType}.png`}
                      alt={moveType}
                      width="30"
                    />
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>
          <BoldSpan>{moveName}</BoldSpan>
          {` has no machine names in any version.`}
        </p>
      )}
    </Box>
  );
};

export default MoveMachines;
