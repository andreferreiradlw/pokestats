import '@mui/material';

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

  interface TypographyVariants {
    mainHeading: React.CSSProperties;
    pageHeading: React.CSSProperties;
    sectionTitle: React.CSSProperties;
    sectionSubTitle: React.CSSProperties;
    sectionMessage: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    mainHeading?: React.CSSProperties;
    pageHeading?: React.CSSProperties;
    sectionTitle?: React.CSSProperties;
    sectionSubTitle?: React.CSSProperties;
    sectionMessage?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    mainHeading: true;
    pageHeading: true;
    sectionTitle: true;
    sectionSubTitle: true;
    sectionMessage: true;
  }
}
