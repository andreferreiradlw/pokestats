import type { ReactNode } from 'react';
import LayoutV2 from '@/components/LayoutV2';

interface EggGroupLayoutProps {
  children: ReactNode;
  params: { eggGroupName: string };
}

const EggGroupLayout = ({ children, params }: EggGroupLayoutProps) => {
  const customKey = `egg-group-${params.eggGroupName}-page`;

  return (
    <LayoutV2 withHeader customKey={customKey}>
      {children}
    </LayoutV2>
  );
};

export default EggGroupLayout;
