import { useContext } from 'react';
// helpers
import { usePlausible } from 'next-plausible';
import { GameVersionContext } from '@/context';
// components
import DropdownV2 from '../DropdownV2';

const GameGenSelect = (): JSX.Element => {
  // analytics
  const plausible = usePlausible();
  // context
  const { gameVersion, setGameVersion, dropdownOptions } = useContext(GameVersionContext);

  return (
    <DropdownV2
      label="Game Version"
      value={gameVersion}
      options={dropdownOptions}
      minWidth="170px"
      onChange={e => {
        setGameVersion(e.target.value as string);
        plausible('Game Version Select');
      }}
    />
  );
};

export default GameGenSelect;
