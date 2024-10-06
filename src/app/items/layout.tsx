import type { ReactNode } from 'react';
import LayoutV2 from '@/components/LayoutV2';

const ItemsLayout = ({ children }: { children: ReactNode }) => (
  <LayoutV2 withHeader customKey="item-list-page">
    {children}
  </LayoutV2>
);

export default ItemsLayout;
