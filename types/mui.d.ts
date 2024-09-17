import type { GameValue } from '@/helpers';
import '@mui/material';

// Extend the MUI BreakpointOverrides to include custom breakpoints
declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xxs: true;
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
  }

  // Extend the MUI TypographyVariants and TypographyVariantsOptions
  interface TypographyVariants {
    mainHeading: React.CSSProperties;
    pageHeading: React.CSSProperties;
    sectionTitle: React.CSSProperties;
    sectionSubTitle: React.CSSProperties;
    sectionMessage: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    mainHeading?: React.CSSProperties;
    pageHeading?: React.CSSProperties;
    sectionTitle?: React.CSSProperties;
    sectionSubTitle?: React.CSSProperties;
    sectionMessage?: React.CSSProperties;
  }

  // Extend the MUI Palette interface to add custom `types` colors and `games` colors
  interface Palette {
    types: {
      bug: string;
      dark: string;
      dragon: string;
      electric: string;
      fairy: string;
      fighting: string;
      fire: string;
      flying: string;
      ghost: string;
      grass: string;
      ground: string;
      ice: string;
      normal: string;
      poison: string;
      psychic: string;
      rock: string;
      shadow: string;
      steel: string;
      unknown: string;
      water: string;
    };
    games: Record<GameValue, string>;
  }

  // Extend the MUI PaletteOptions interface to add custom `types` colors and `games` colors
  interface PaletteOptions {
    types?: {
      bug?: string;
      dark?: string;
      dragon?: string;
      electric?: string;
      fairy?: string;
      fighting?: string;
      fire?: string;
      flying?: string;
      ghost?: string;
      grass?: string;
      ground?: string;
      ice?: string;
      normal?: string;
      poison?: string;
      psychic?: string;
      rock?: string;
      shadow?: string;
      steel?: string;
      unknown?: string;
      water?: string;
    };
    games?: Partial<Record<GameValue, string>>;
  }
}

// Update the Typography's variant prop options to include custom variants
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    mainHeading: true;
    pageHeading: true;
    sectionTitle: true;
    sectionSubTitle: true;
    sectionMessage: true;
  }
}
