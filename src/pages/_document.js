import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v3.10.0/mapbox-gl.css"
          rel="stylesheet"
        />
        <script
          defer
          data-domain="flujos-rgv"
          src="https://plausible.io/js/script.js"
        ></script>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
