import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

type Props = { env: string; lang: string }

class MyDocument extends Document<Props> {
  render() {
    return (
      <Html lang={'it'}>
        <Head>
          <meta charSet="utf-8" />
          <meta content="initial-scale=1, width=device-width" name="viewport" />
          <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
