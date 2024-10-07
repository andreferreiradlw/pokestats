import type { ReactNode } from 'react';
import LayoutV2 from '@/components/LayoutV2';

interface MoveLayoutProps {
  children: ReactNode;
  params: { moveId: string };
}

const MoveLayout = ({ children, params }: MoveLayoutProps) => {
  const customKey = `move-${params.moveId}-page`;

  return (
    <LayoutV2 withHeader customKey={customKey}>
      {children}
    </LayoutV2>
  );
};

export default MoveLayout;
