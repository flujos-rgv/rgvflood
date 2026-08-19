import { useRouter } from "next/router"

import * as select from "@zag-js/select"
import { useMachine, normalizeProps } from "@zag-js/react"
import { useId } from "react"

import { useTranslationStore } from "@/utils/useTranslation"
import { ChevronDownIcon, CheckIcon } from "@/components/Icon"

export default function FloodEventNavigation({ currentEvent, events }) {
  const content = useTranslationStore((state) => state.content)
  const router = useRouter()

  const floodEvents = events.map((ev) => {
    return {
      ...ev,
      label: [content[ev.name]?.label || ev.name],
      eventId: ev.id,
    }
  })

  const currentFloodEvent =
    floodEvents.find((s) => `${s.eventId}` === `${currentEvent}`) || null

  const collection = select.collection({
    items: floodEvents,
    itemToString: (item) => {
      return content[`event-${item.eventId}`]?.label || item.label?.join(" ")
    },
    itemToValue: (item) => item.eventId,
  })

  const [state, send] = useMachine(
    select.machine({
      id: useId(),
      collection,
      value: [currentFloodEvent?.eventId || ""],
      onValueChange: ({ value }) => {
        router.push(`/${value[0]}`)
      },
    })
  )

  const api = select.connect(state, send, normalizeProps)

  const { style: positionerStyle, ...positionerProps } =
    api.getPositionerProps()

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        padding: "0 1.25rem",
        bottom: "1.25rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "all",
      }}
    >
      <div
        {...api.getRootProps()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "32rem",
        }}
      >
        <div {...api.getControlProps()}>
          <label {...api.getLabelProps()} className="sr-only">
            {"Select a flood event"}
          </label>
          <button
            {...api.getTriggerProps()}
            style={{
              width: "100%",
              background: "#FFF",
              borderRadius: "0.375rem",
              height: "3rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 1.125rem 0 1.25rem",
              fontWeight: 600,
              border: "0.125rem solid #DDD",
            }}
          >
            <span>
              {content[`event-${api.value}`]?.label ||
                api.valueAsString ||
                content.selectAction ||
                "Select a flood event..."}
            </span>
            <ChevronDownIcon />
          </button>
        </div>

        <div style={{ width: "100%" }}>
          <div
            {...positionerProps}
            style={{
              ...positionerStyle,
              width: "100%",
              background: "#FFF",
              borderRadius: "0.375rem",
            }}
          >
            <ul
              {...api.getContentProps()}
              style={{
                listStyle: "none",
                padding: "0.25rem 0",
                outline: "none",
                maxHeight: "50lvh",
                overflowY: "scroll",
              }}
            >
              {floodEvents.map((item) => {
                const itemProps = api.getItemProps({ item })
                const isHighlighted = itemProps["data-highlighted"] === ""
                const isImportant = ["2", "6", "10", "14"].includes(
                  item.eventId
                )
                return (
                  <li
                    key={item.eventId}
                    {...itemProps}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "0.375rem 0.875rem 0.375rem 1.25rem",
                      cursor: "pointer",
                      margin: "0 0.25rem",
                      borderRadius: "0.375rem",
                      background: isHighlighted ? "#06F" : "transparent",
                      color: isHighlighted ? "#FFF" : "inherit",
                      fontWeight: isImportant ? 700 : 400,
                    }}
                  >
                    <span>{item.label.join(" ")}</span>
                    <span {...api.getItemIndicatorProps({ item })}>
                      <CheckIcon />
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
