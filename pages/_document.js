import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100&display=swap" rel="stylesheet" />
        <link rel="shortcut icon" href="data:image/x-icon;," type="image/x-icon"></link>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin></link>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100&display=swap" rel="stylesheet"></link>
        <link rel="icon" href="/union.svg"></link>
        {/* <link rel="preload" href="emptyfv.svg" as="image"></link> */}
        <meta name='viewport' content='width=device-width' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
