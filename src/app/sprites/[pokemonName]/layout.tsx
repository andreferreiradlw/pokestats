import type { ReactNode } from 'react';
import LayoutV2 from '@/components/LayoutV2';

interface EggGroupLayoutProps {
  children: ReactNode;
  params: { pokemonName: string };
}

const EggGroupLayout = ({ children, params }: EggGroupLayoutProps) => {
  const customKey = `pokemon-sprites-${params.pokemonName}-page`;

  return (
    <LayoutV2 withHeader customKey={customKey}>
      {children}
    </LayoutV2>
  );
};

export default EggGroupLayout;
