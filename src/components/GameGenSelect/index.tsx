import { useContext } from 'react';
// helpers
import { usePlausible } from 'next-plausible';
import { GameVersionContext } from '@/context';
// components
import DropdownV2 from '../DropdownV2';
import type { GameValue } from '@/helpers';

const GameGenSelect = (): JSX.Element | null => {
  // analytics
  const plausible = usePlausible();
  // context
  const { gameVersion, setGameVersion, dropdownOptions } = useContext(GameVersionContext);

  if (!gameVersion) return null;

  return (
    <DropdownV2<GameValue>
      label="Game Version"
      value={gameVersion}
      options={dropdownOptions}
      minWidth="185px"
      onChange={value => {
        setGameVersion(value);
        plausible('Game Version Select');
      }}
    />
  );
};

export default GameGenSelect;
