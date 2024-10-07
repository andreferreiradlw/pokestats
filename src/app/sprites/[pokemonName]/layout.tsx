import type { ReactNode } from 'react';
import LayoutV2 from '@/components/LayoutV2';

interface PokemonSpritesLayoutProps {
  children: ReactNode;
  params: { pokemonName: string };
}

const PokemonSpritesLayout = ({ children, params }: PokemonSpritesLayoutProps) => {
  const customKey = `pokemon-sprites-${params.pokemonName}-page`;

  return (
    <LayoutV2 withHeader customKey={customKey}>
      {children}
    </LayoutV2>
  );
};

export default PokemonSpritesLayout;
