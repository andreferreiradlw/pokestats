import 'styled-components';
import type { ThemeType } from '../src/components/Theme/theme'; // Import type from above file

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends ThemeType {}
}
