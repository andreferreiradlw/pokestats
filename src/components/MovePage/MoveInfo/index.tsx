import { useMemo } from 'react';
// types
import type { Move } from 'pokenode-ts';
// helpers
import { type GameGenValue, mapGeneration, removeDash } from '@/helpers';
// styles
import { Table } from '@/BaseStyles';
// components
import type { Grid2Props } from '@mui/material';
import { Grid2, Typography } from '@mui/material';

interface MoveInfoProps extends Grid2Props {
  move: Move;
}

const MoveInfo = ({ move, ...rest }: MoveInfoProps): JSX.Element => {
  // data
  const { damage_class, accuracy, power, pp, priority, generation } = move;
  // memo
  const generationName = useMemo(
    () => mapGeneration(generation.name as GameGenValue),
    [generation.name],
  );

  return (
    <Grid2 {...rest}>
      <Table>
        <tbody>
          <tr>
            <th>Category</th>
            <Typography textTransform="capitalize" component="td">
              {removeDash(damage_class?.name)}
            </Typography>
          </tr>
          <tr>
            <th>Power</th>
            <td>{power ? power : '-'}</td>
          </tr>
          <tr>
            <th>Accuracy</th>
            <td>{accuracy ? `${accuracy}%` : '-'}</td>
          </tr>
          <tr>
            <th>PP</th>
            <td>{pp ? `${pp} (max ${(pp * 8) / 5})` : 'No info.'}</td>
          </tr>
          <tr>
            <th>Priority</th>
            <td>{priority}</td>
          </tr>
          <tr>
            <th>Introduced</th>
            <td>{generationName}</td>
          </tr>
        </tbody>
      </Table>
    </Grid2>
  );
};

export default MoveInfo;
