import { useMemo } from 'react';
import { styled } from '@mui/material';

interface HeadbuttGridItemProps {
  encounterRate: number;
  x: number;
  y: number;
  scale: number;
}

const Cell = styled('div')`
  margin: 0;
  padding: 0;
  border: 1px solid #888888;
  font-weight: bold;
  opacity: 0.7;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: absolute;
  z-index: 2;
`;

const getTreeSymbol = (encounterRate: number): string => {
  if (encounterRate === 80) return '★'; // Star for rare encounters
  if (encounterRate === 50) return '●'; // Circle for normal encounters
  return ''; // Unmarked for low encounters
};

const HeadbuttGridItem = ({ encounterRate, x, y, scale }: HeadbuttGridItemProps): JSX.Element => {
  const itemSize = useMemo(() => 16 * scale, [scale]);
  const symbol = useMemo(() => getTreeSymbol(encounterRate), [encounterRate]);

  return (
    <Cell
      sx={{
        top: `${y * itemSize}px`,
        left: `${x * itemSize}px`,
        height: `${itemSize}px`,
        width: `${itemSize}px`,
        fontSize: `${12 * scale}px`,
      }}
    >
      {symbol}
    </Cell>
  );
};

export default HeadbuttGridItem;
