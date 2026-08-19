import Head from "next/head"
import { getEvents } from "@/utils/api"

import { useTranslationStore } from "@/utils/useTranslation"
import FloodEventNavigation from "@/components/FloodEventNavigation"
import LanguageSwitch from "@/components/Toolbar/LanguageSwitch"

export default function IndexPage({ events }) {
  const content = useTranslationStore((state) => state.content)
  return (
    <>
      <Head>
        <title>{content.home?.title || ""}</title>
        <meta name="description" content={content.home?.subtitle || ""} />
      </Head>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gridColumn: "1 / -1",
          gridRow: "1 / -1",
          zIndex: 999,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,1) 90%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            alignItems: "center",
            padding: "2.5rem 1.25rem",
          }}
        >
          <h2
            style={{
              fontSize: "3.5rem",
              fontWeight: 700,
              lineHeight: "1.1",
              textAlign: "center",
              maxWidth: "40rem",
            }}
          >
            {content.home?.title || ""}
          </h2>
          <p
            style={{
              fontSize: "1.125rem",
              textAlign: "center",
              maxWidth: "32rem",
              color: "#000",
              fontWeight: 500,
            }}
          >
            {content.home?.subtitle || ""}
          </p>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "5.5rem",
              maxWidth: "40rem",
            }}
          >
            <FloodEventNavigation currentEvent="" events={events} />
          </div>
          <LanguageSwitch />
        </div>
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  const events = await getEvents()
  return {
    props: { events },
  }
}
