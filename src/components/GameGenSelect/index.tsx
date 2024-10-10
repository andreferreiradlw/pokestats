'use client';

import { useContext } from 'react';
// helpers
import type { GameValue } from '@/helpers';
import { useUmami } from '@/hooks';
import { GameVersionContext } from '@/context';
// components
import DropdownV2 from '../DropdownV2';

const GameGenSelect = (): JSX.Element | null => {
  // analytics
  const { track } = useUmami();

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
        track('Game Version Select', { gameVersion: value });
      }}
    />
  );
};

export default GameGenSelect;
