import { readFile, writeFile } from "fs/promises"
import { centroid } from "@turf/centroid"
import { join } from "path"

const gj = await readFile(
  join(process.env.PWD, "data", "colonias-geo.json"),
  "utf8"
).then((res) => JSON.parse(res.trim()))

const parsedItems = gj.features.map((item) => {
  const { geometry } = centroid(item.geometry)
  const [longitude, latitude] = geometry.coordinates
  item.properties.coordinates = { longitude, latitude }
  return item
})

await writeFile(
  join(process.env.PWD, "public", "data", "colonias-geo.json"),
  JSON.stringify(parsedItems.map(({ properties }) => properties)),
  "utf8"
)
