import Link from "next/link"

import Search from "@/components/Search"
import Layers from "@/components/Toolbar/Layers"
import AboutDialog from "@/components/Toolbar/AboutDialog"
import LanguageSwitch from "@/components/Toolbar/LanguageSwitch"
import DisclaimerDialog from "@/components/Toolbar/DisclaimerDialog"

export default function Toolbar({ title }) {
  return (
    <div className="toolbar-grid">
      <Link className="site-logo" href="/">
        <div
          style={{
            width: "2.5rem",
            height: "2.5rem",
            borderRadius: "100%",
            background: "#06F",
            border: "0.125rem solid #FFF",
          }}
        />
        <div>
          <div style={{ fontSize: "0.875rem", lineHeight: "1", color: "#06F" }}>
            {"FLUJOS RGV "}
          </div>
          <div style={{ fontSize: "0.75rem", lineHeight: "1" }}>
            {"flood database"}
          </div>
          {title && <h1 className="sr-only">{title}</h1>}
        </div>
      </Link>
      <div className="search" style={{ position: "relative" }}>
        <Search />
        <Layers />
      </div>
      <div
        className="settings"
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "0.25rem",
          justifyContent: "flex-end",
        }}
      >
        <LanguageSwitch />
        <AboutDialog />
        <DisclaimerDialog />
      </div>
    </div>
  )
}
