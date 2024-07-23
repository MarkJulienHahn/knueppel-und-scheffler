import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="de">
        <Head>
          <title>KNUEPPEL & SCHEFFLER</title>
          <meta
            name="description"
            content="Knueppel & Scheffler ist die Fullservice-Agentur für besondere Events, Award Shows und Markeninszenierungen."
          />
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
