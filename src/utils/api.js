import { readdir } from "fs/promises"
import { join } from "path"

export const getEvents = async () => {
  const files = await readdir(join(process.env.PWD, "public", "tiles"))
  const events = files
    .filter((n) => n.startsWith("event-"))
    .map((eventName) => ({
      name: eventName.trim(),
      id: eventName.split("-")[1].trim(),
    }))
    .sort((a, b) => parseInt(a.id) - parseInt(b.id))

  return events
}
