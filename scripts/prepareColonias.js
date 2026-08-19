import { readFile, writeFile, mkdir, rm } from "fs/promises"
import { join } from "path"
import { centroid } from "@turf/centroid"

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

const parsedColonias = parsedItems
  .map(({ properties, geometry, type }, i) => {
    const d = properties
    const id = `_${
      d["SUBD_ID"]?.trim() ||
      d["MNUMBER"]?.trim() ||
      d["MNUMBER_1"]?.trim() ||
      `AUTOID${i}`
    }`
    return {
      id,
      type,
      geometry,
      properties: {
        id,
        common_name: d["COMM_NM"]?.trim(),
        colonia_name: d["COLONIA_NM"]?.trim(),
        pop: parseInt(d["ESTIMATEDP"] || d["EST_POP"]) || "",
        county: d["COUNTY"]?.trim(),
        coordinates: d.coordinates,
      },
    }
  })
  .filter((d) => parseFloat(d.properties.coordinates.latitude) < 27)

await writeFile(
  join(process.env.PWD, "public", "data", "colonias.json"),
  JSON.stringify(parsedColonias.map((d) => d.properties)),
  "utf8"
)

await rm(join(process.env.PWD, "public", "data", "colonias"), {
  recursive: true,
  force: true,
})
await mkdir(join(process.env.PWD, "public", "data", "colonias"))

await writeFile(
  join(process.env.PWD, "public", "data", "colonias", "all.json"),
  JSON.stringify(parsedColonias.map((d) => d.properties)),
  "utf8"
)

await Promise.all(
  parsedColonias.map((colonia) => {
    return writeFile(
      join(process.env.PWD, "public", "data", "colonias", colonia.id + ".json"),
      JSON.stringify(colonia),
      "utf8"
    )
  })
)
