import { useMemo } from 'react';
import { styled, Tooltip } from '@mui/material';

interface HeadbuttGridItemProps {
  encounterRate: number;
  x: number;
  y: number;
  scale: number;
}

const Cell = styled('div')(({ theme }) => ({
  margin: 0,
  padding: 0,
  border: `1px solid ${theme.palette.secondary.main}`,
  fontWeight: 'bold',
  opacity: 0.7,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
  position: 'absolute',
  zIndex: 2,
  cursor: 'pointer',
}));

// Function to determine the tree symbol and its corresponding rarity
const getTreeSymbol = (encounterRate: number): { symbol: string; rarity: string } => {
  if (encounterRate === 80) return { symbol: '★', rarity: 'Rare' }; // Star for rare encounters
  if (encounterRate === 50) return { symbol: '●', rarity: 'Normal' }; // Circle for normal encounters
  return { symbol: '', rarity: 'Low' }; // Unmarked for low encounters
};

const HeadbuttGridItem = ({ encounterRate, x, y, scale }: HeadbuttGridItemProps): JSX.Element => {
  const itemSize = useMemo(() => 16 * scale, [scale]);
  const { symbol, rarity } = useMemo(() => getTreeSymbol(encounterRate), [encounterRate]);

  return (
    <Tooltip title={rarity}>
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
    </Tooltip>
  );
};

export default HeadbuttGridItem;
