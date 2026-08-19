import Map from "../Map"

export default function FloodMap() {
  return (
    <div
      style={{
        gridColumn: "1 / -1",
        gridRow: "1 / -1",
        background: "#EEE",
        position: "relative",
      }}
    >
      <Map />
    </div>
  )
}
