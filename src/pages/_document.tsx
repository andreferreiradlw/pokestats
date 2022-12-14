import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  public static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  public render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <link rel="preload" href="/fonts/Montserrat-Regular.ttf" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/Montserrat-Medium.ttf" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/Quicksand-SemiBold.ttf" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/JosefinSans-Bold.ttf" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/JosefinSans-BoldItalic.ttf" as="font" crossOrigin="" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
