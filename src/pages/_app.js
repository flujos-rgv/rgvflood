import "../utils/globals.css"

import FloodMap from "@/components/FloodMap"
import { EventProvider } from "@/utils/EventContext"

export default function App({ Component, pageProps }) {
  return (
    <>
      <EventProvider value={{ eventId: pageProps.eventId || "" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gridTemplateRows: "minmax(0, min-content) auto",
            gridGap: 0,
            height: "100vh",
          }}
        >
          <FloodMap eventId={pageProps.eventId} />
          <Component {...pageProps} />
        </div>
      </EventProvider>
    </>
  )
}
