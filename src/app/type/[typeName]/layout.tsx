import type { ReactNode } from 'react';
import LayoutV2 from '@/components/LayoutV2';

interface TypeLayoutProps {
  children: ReactNode;
  params: { typeId: string };
}

const TypeLayout = ({ children, params }: TypeLayoutProps) => {
  const customKey = `type-${params.typeId}-page`;

  return (
    <LayoutV2 withHeader customKey={customKey}>
      {children}
    </LayoutV2>
  );
};

export default TypeLayout;
