import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";


class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* async CSS loading for next css chunks */}

          {/* <Script
            id="defer-css"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
        document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
        if (!link.hasAttribute('data-critical')) {
          link.media = 'print';
          link.onload = () => (link.media = 'all');
        }
      });
      `,
            }} /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
