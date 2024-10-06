import type { ReactNode } from 'react';
import LayoutV2 from '@/components/LayoutV2';

interface ItemLayoutProps {
  children: ReactNode;
  params: { itemName: string };
}

const ItemLayout = ({ children, params }: ItemLayoutProps) => {
  const customKey = `item-${params.itemName}-page`;

  return (
    <LayoutV2 withHeader customKey={customKey}>
      {children}
    </LayoutV2>
  );
};

export default ItemLayout;
