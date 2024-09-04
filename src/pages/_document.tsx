import { Html, Head, Main, NextScript, DocumentProps, DocumentContext } from 'next/document';
import {
  DocumentHeadTags,
  DocumentHeadTagsProps,
  documentGetInitialProps,
} from '@mui/material-nextjs/v14-pagesRouter';
import generateTheme from '@/MuiTheme';

interface MyDocumentProps extends DocumentProps, DocumentHeadTagsProps {
  themeColor: string;
}

export default function MyDocument(props: MyDocumentProps) {
  return (
    <Html lang="en">
      <Head>
        {/* PWA primary color */}
        <meta name="theme-color" content={props.themeColor} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,700;1,700&family=Montserrat:wght@400;500;600;700&family=Quicksand:wght@600;700&display=swap"
          rel="stylesheet"
          id="generate-googlefonts-css"
          crossOrigin=""
        />
        <DocumentHeadTags {...props} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const initialProps = await documentGetInitialProps(ctx);

  // Generate the theme and get the primary color
  const theme = generateTheme('light');
  const themeColor = theme.palette.primary.main;

  return {
    ...initialProps,
    themeColor, // Pass the primary color to the document props
  };
};
