import type { ReactNode } from 'react';
import LayoutV2 from '@/components/LayoutV2';

const MovesLayout = ({ children }: { children: ReactNode }) => (
  <LayoutV2 withHeader customKey="moves-list-page">
    {children}
  </LayoutV2>
);

export default MovesLayout;
