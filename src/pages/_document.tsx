import { Html, Head, Main, NextScript, DocumentProps } from 'next/document';
import theme from '@/MuiTheme';
import { ServerStyleSheet } from 'styled-components';
import {
  DocumentHeadTags,
  DocumentHeadTagsProps,
  documentGetInitialProps,
} from '@mui/material-nextjs/v14-pagesRouter';
import createCache from '@emotion/cache';

// export default class MyDocument extends Document {
//   public render(props): JSX.Element {
//     return (
//       <Html lang="en">
//         <Head>
//           {/* PWA primary color */}
//           <meta name="theme-color" content={theme.palette.primary.main} />
//           <link rel="preconnect" href="https://fonts.googleapis.com" />
//           <link rel="preconnect" href="https://fonts.gstatic.com" />
//           <link
//             href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,700;1,700&family=Montserrat:wght@400;500;600;700&family=Quicksand:wght@600;700&display=swap"
//             rel="stylesheet"
//             id="generate-googlefonts-css"
//             crossOrigin=""
//           />
//           <DocumentHeadTags {...props} />
//         </Head>
//         <body>
//           <Main />
//           <NextScript />
//         </body>
//       </Html>
//     );
//   }
// }

export default function MyDocument(props: DocumentProps & DocumentHeadTagsProps) {
  return (
    <Html lang="en">
      <Head>
        {/* PWA primary color */}
        <meta name="theme-color" content={theme.palette.primary.main} />
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

// https://github.com/vercel/next.js/blob/master/examples/with-styled-components/pages/_document.js
// MyDocument.getInitialProps = async ctx => {
//   const sheet = new ServerStyleSheet();
//   const originalRenderPage = ctx.renderPage;

//   try {
//     ctx.renderPage = () =>
//       originalRenderPage({
//         enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
//       });

//     const initialProps = await Document.getInitialProps(ctx);
//     return {
//       ...initialProps,
//       styles: (
//         <>
//           {initialProps.styles}
//           {sheet.getStyleElement()}
//         </>
//       ),
//     };
//   } finally {
//     sheet.seal();
//   }
// };

MyDocument.getInitialProps = async ctx => {
  // const jssSheets = new JSSServerStyleSheets();
  const styledComponentsSheet = new ServerStyleSheet();

  try {
    const finalProps = await documentGetInitialProps(ctx, {
      emotionCache: createCache({ key: 'css' }),
      plugins: [
        {
          // styled-components
          enhanceApp: App => props => styledComponentsSheet.collectStyles(<App {...props} />),
          resolveProps: async initialProps => ({
            ...initialProps,
            // @ts-expect-error: test
            styles: [styledComponentsSheet.getStyleElement(), ...initialProps.styles],
          }),
        },
        // {
        //   // JSS
        //   enhanceApp: App => props => jssSheets.collect(<App {...props} />),
        //   resolveProps: async initialProps => {
        //     const css = jssSheets.toString();
        //     return {
        //       ...initialProps,
        //       styles: [
        //         ...initialProps.styles,
        //         <style
        //           id="jss-server-side"
        //           key="jss-server-side"
        //           // eslint-disable-next-line react/no-danger
        //           dangerouslySetInnerHTML={{ __html: css }}
        //         />,
        //         <style id="insertion-point-jss" key="insertion-point-jss" />,
        //       ],
        //     };
        //   },
        // },
      ],
    });
    return finalProps;
  } finally {
    styledComponentsSheet.seal();
  }
};
