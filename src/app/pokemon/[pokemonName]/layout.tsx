import type { ReactNode } from 'react';
import LayoutV2 from '@/components/LayoutV2';

interface PokemonLayoutProps {
  children: ReactNode;
  params: { pokemonId: string };
}

const PokemonLayout = ({ children, params }: PokemonLayoutProps) => {
  const customKey = `pokemon-${params.pokemonId}-page`;

  return (
    <LayoutV2 withHeader showGenSelect customKey={customKey}>
      {children}
    </LayoutV2>
  );
};

export default PokemonLayout;
