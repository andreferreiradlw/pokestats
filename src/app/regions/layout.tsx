import type { ReactNode } from 'react';
import LayoutV2 from '@/components/LayoutV2';

interface RegionsLayoutProps {
  children: ReactNode;
}

const RegionsLayout = ({ children }: RegionsLayoutProps) => (
  <LayoutV2 withHeader customKey="region-page">
    {children}
  </LayoutV2>
);
export default RegionsLayout;