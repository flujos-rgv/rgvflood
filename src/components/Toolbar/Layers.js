import { VisibleIcon, InvisibleIcon } from "@/components/Icon"
import { useMapStore } from "@/components/Map/useMapStore"
import { useTranslationStore } from "@/utils/useTranslation"

export default function Layers() {
  const showSatellite = useMapStore((state) => state.showSatellite)
  const toggleSatellite = useMapStore((state) => state.toggleSatellite)
  const showFloodLayers = useMapStore((state) => state.showFloodLayers)
  const toggleFloodLayers = useMapStore((state) => state.toggleFloodLayers)

  const content = useTranslationStore((state) => state.content)

  const handleSatelliteToggle = () => {
    toggleSatellite()
  }

  const handleFloodsToggle = () => {
    toggleFloodLayers()
  }

  const showPermanentWater = useMapStore((state) => state.showPermanentWater)

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "0.5rem",
        position: "absolute",
        left: 0,
        right: 0,
        top: "100%",
        marginTop: "0.75rem",
      }}
    >
      <button
        className="btn"
        onClick={handleFloodsToggle}
        style={{ flex: "none", textTransform: "capitalize" }}
      >
        {showFloodLayers ? <VisibleIcon /> : <InvisibleIcon />}
        {content["flood"]}
        <div
          style={{
            background: "#06F",
            width: "1.25rem",
            height: "1.25rem",
            borderRadius: "100%",
            opacity: showFloodLayers ? 1 : 0.5,
          }}
        />
      </button>
      <button
        className="btn"
        onClick={handleSatelliteToggle}
        style={{ flex: "none", textTransform: "capitalize" }}
      >
        {showSatellite ? <VisibleIcon /> : <InvisibleIcon />}
        {content["satellite"]}
      </button>
      <div
        className="btn"
        disabled
        style={{
          flex: "none",
          textTransform: "capitalize",
          background: "#EEEEEE",
        }}
      >
        <div
          style={{
            background: "#026",
            width: "1.25rem",
            height: "1.25rem",
            borderRadius: "100%",
            opacity: showPermanentWater ? 1 : 0.5,
          }}
        />
        {content["water"]}
      </div>
    </div>
  )
}
