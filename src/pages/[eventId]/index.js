import Head from "next/head"

import Toolbar from "@/components/Toolbar"
import FloodEventNavigation from "@/components/FloodEventNavigation"
import { getEvents } from "@/utils/api"
import { useTranslationStore } from "@/utils/useTranslation"

export default function EventPage({ eventId, events }) {
  const content = useTranslationStore((state) => state.content)
  const title = `${content?.home?.title || ""} | ${content["event-" + eventId]?.label || ""}`
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content.home.subtitle} />
      </Head>
      <Toolbar title={title} />
      <div
        style={{
          gridColumn: "1 / -1",
          gridRow: "2 / -1",
          padding: "1.25rem",
          zIndex: 2,
          position: "relative",
          pointerEvents: "none",
        }}
      >
        <FloodEventNavigation currentEvent={eventId} events={events} />
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const events = await getEvents()
  return {
    paths: events.map(({ id }) => ({ params: { eventId: id } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const events = await getEvents()
  return { props: { eventId: params.eventId, events } }
}
