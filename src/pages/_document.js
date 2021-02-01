import Document, { Html, Head, Main, NextScript } from 'next/document'
// styled ssr
import { ServerStyleSheet } from 'styled-components'

class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    // https://dev.to/aprietof/nextjs--styled-components-the-really-simple-guide----101c
    // https://github.com/vercel/next.js/blob/master/examples/with-styled-components/pages/_document.js

    // create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet()

    // retrieve styles from components in the page
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    )

    // extract the styles as <style> tags
    const styleTags = sheet.getStyleElement()

    // seal
    sheet.seal()

    // pass styleTags as a prop
    return { ...page, styleTags }
  }

  render() {
    return (
      <Html lang="en">
        {/** inject the server side rendered styles into the head */}
        <Head>{this.props.styleTags}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
