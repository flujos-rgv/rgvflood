import { readFile } from "node:fs/promises"
import { join } from "node:path"

const content = await readFile(
  join(process.env?.PWD || "", "data", "perm_water_final_final_compact.json"),
  "utf8"
).then(JSON.parse)

console.log(content)
