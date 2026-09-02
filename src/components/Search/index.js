import { useEffect, useState } from "react"

import { CloseIcon, ChevronDownIcon } from "@/components/Icon"
import { useCombobox } from "./useCombobox"
import { useTranslationStore } from "@/utils/useTranslation"

export default function Search() {
  const [colonias, setColonias] = useState([])
  const content = useTranslationStore((state) => state.content)

  const { api, options } = useCombobox({ data: colonias })

  const { style: positionerStyle, ...positionerProps } =
    api.getPositionerProps()

  useEffect(() => {
    if (typeof window === "undefined") return undefined
    fetch("/data/colonias/all.json")
      .then((res) => res.json())
      .then((data) => {
        const searchIndex = data.map((d) => ({
          code: d.id,
          label: d.common_name || d.id,
          group: "colonias",
          data: d,
        }))
        setColonias(searchIndex)
      })
  }, [])

  const coloniaResults = options.filter((d) => d.group === "colonias")
  const mapboxResults = options.filter((d) => d.group === "mapbox")

  return (
    <div style={{ position: "relative" }}>
      <div {...api.getRootProps()}>
        <label {...api.getLabelProps()} className="sr-only">
          {"Search"}
        </label>
        <div
          {...api.getControlProps()}
          style={{
            display: "grid",
            gridTemplateColumns: "auto minmax(0, min-content)",
            position: "relative",
          }}
        >
          <input
            {...api.getInputProps()}
            placeholder={content.search}
            style={{
              position: "relative",
              height: "3rem",
              gridColumn: "1 / -1",
              gridRow: "1 / span 1",
              background: "#FFF",
              borderRadius: "0.375rem",
              padding: "0 5.75rem 0 1.25rem",
              boxShadow: "0 0.5rem 0.5rem rgba(0,0,0,0.2)",
            }}
          />
          <div
            style={{
              gridColumn: "-2 / -1",
              gridRow: "1 / span 1",
              display: "flex",
              flexDirection: "row",
              gap: "0.25rem",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 0.25rem",
              position: "relative",
            }}
          >
            <button
              {...api.getClearTriggerProps()}
              className="btn"
              style={{ width: "2.5rem" }}
            >
              <CloseIcon />
            </button>
            <button
              {...api.getTriggerProps()}
              className="btn"
              style={{ width: "2.5rem" }}
            >
              <ChevronDownIcon />
            </button>
          </div>
        </div>
      </div>
      <div
        {...positionerProps}
        style={{
          ...positionerStyle,
          background: "#FFF",
          zIndex: 999,
          borderRadius: "0.375rem",
          boxShadow: "0 0.5rem 0.5rem rgba(0,0,0,0.2)",
        }}
      >
        {options.length > 0 && (
          <ul
            {...api.getContentProps()}
            style={{ listStyle: "none", padding: "0.25rem 0" }}
          >
            {coloniaResults?.map((item) => {
              const itemProps = api.getItemProps({ item })
              const isHighlighted = itemProps["data-highlighted"] === ""
              return (
                <li
                  key={`col-${item.code}`}
                  {...itemProps}
                  style={{
                    background: isHighlighted ? "#06F" : "transparent",
                    color: isHighlighted ? "#FFF" : "inherit",
                    padding: "0.375rem 1rem",
                    margin: "0 0.25rem",
                    borderRadius: "0.375rem",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: "0.75rem",
                    cursor: "pointer",
                  }}
                >
                  <span>{item.label}</span>
                  {item.place_formatted && (
                    <span
                      style={{
                        flex: "1",
                        color: "#999",
                        overflow: "hidden",
                        textWrap: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.place_formatted}
                    </span>
                  )}
                  {item.group !== "mapbox" && (
                    <span style={{ color: "#999" }}>{item.group}</span>
                  )}
                </li>
              )
            })}

            {coloniaResults.length && mapboxResults.length ? (
              <hr style={{ borderColor: "#DDD", margin: "0.25rem 0" }} />
            ) : (
              ""
            )}

            {mapboxResults?.map((item) => {
              const itemProps = api.getItemProps({ item })
              const isHighlighted = itemProps["data-highlighted"] === ""
              return (
                <li
                  key={`mb-${item.code}`}
                  {...itemProps}
                  style={{
                    background: isHighlighted ? "#06F" : "transparent",
                    color: isHighlighted ? "#FFF" : "inherit",
                    padding: "0.375rem 1rem",
                    margin: "0 0.25rem",
                    borderRadius: "0.375rem",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: "0.75rem",
                    cursor: "pointer",
                  }}
                >
                  <span>{item.label}</span>
                  {item.place_formatted && (
                    <span
                      style={{
                        flex: "1",
                        color: "#999",
                        overflow: "hidden",
                        textWrap: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.place_formatted}
                    </span>
                  )}
                  {item.group !== "mapbox" && (
                    <span style={{ color: "#999" }}>{item.group}</span>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
