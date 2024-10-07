import type { ReactNode } from 'react';
import LayoutV2 from '@/components/LayoutV2';

interface HeadbuttFinderLayoutProps {
  children: ReactNode;
}

const HeadbuttFinderLayout = ({ children }: HeadbuttFinderLayoutProps) => (
  <LayoutV2 withHeader customKey="headbutt-tree-finder-page">
    {children}
  </LayoutV2>
);

export default HeadbuttFinderLayout;
