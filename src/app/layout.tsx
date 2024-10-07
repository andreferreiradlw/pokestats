import type { ReactNode } from 'react';
import Providers from './providers'; // Importing the Providers component

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="en">
    <body>
      <Providers>{children}</Providers>
    </body>
  </html>
);

export default RootLayout;
