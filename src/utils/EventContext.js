import { createContext, useContext } from "react"

export const EventContext = createContext({ eventId: "" })

export const EventProvider = EventContext.Provider

export const useEventContext = () => {
  const ctx = useContext(EventContext)
  return ctx
}
