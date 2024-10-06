import type { ReactNode } from 'react';
import LayoutV2 from '@/components/LayoutV2';

export default function BerriesLayout({ children }: { children: ReactNode }) {
  return (
    <LayoutV2 withHeader customKey="berry-list-page">
      {children}
    </LayoutV2>
  );
}
