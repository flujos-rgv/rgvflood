import * as select from "@zag-js/select"
import { useMachine, normalizeProps } from "@zag-js/react"
import { useId } from "react"

import { GlobeIcon, CheckIcon, ChevronDownIcon } from "@/components/Icon"
import { useTranslationStore } from "@/utils/useTranslation"

export default function LanguageSwitch() {
  const language = useTranslationStore((state) => state.language)
  const languages = useTranslationStore((state) => state.languages)
  const setLanguage = useTranslationStore((state) => state.setLanguage)

  const collection = select.collection({
    items: languages,
    itemToString: (item) => item.label,
    itemToValue: (item) => item.id,
  })

  const [state, send] = useMachine(
    select.machine({
      id: useId(),
      collection,
      positioning: { placement: "bottom-end" },
      value: language.id,
      onValueChange: ({ value }) => {
        const lang = languages.find((s) => s.id === value[0])
        if (!lang) return
        setLanguage(lang)
      },
    })
  )

  const api = select.connect(state, send, normalizeProps)

  const { style: positionerStyle, ...positionerProps } =
    api.getPositionerProps()

  return (
    <div {...api.getRootProps()} style={{ zIndex: 1 }}>
      <div {...api.getControlProps()}>
        <button {...api.getTriggerProps()} className="btn">
          <GlobeIcon />
          {api.valueAsString || language.label || "Select language..."}
          <ChevronDownIcon />
        </button>
      </div>
      <div
        {...positionerProps}
        style={{
          ...positionerStyle,
          background: "#FFF",
          borderRadius: "0.375rem",
          zIndex: 999,
          boxShadow: "0 0.5rem 0.5rem rgba(0,0,0,0.2)",
        }}
      >
        <ul
          {...api.getContentProps()}
          style={{ listStyle: "none", padding: "0.25rem 0", outline: "none" }}
        >
          {languages.map((item) => {
            const itemProps = api.getItemProps({ item })
            const isHighlighted = itemProps["data-highlighted"] === ""
            return (
              <li
                key={item.id}
                {...itemProps}
                style={{
                  padding: "0.25rem 0.5rem 0.25rem 1rem",
                  display: "flex",
                  flexDirection: "row",
                  gap: "0.75rem",
                  justifyContent: "space-between",
                  minWidth: "10rem",
                  cursor: "pointer",
                  background: isHighlighted ? "#06F" : "#FFF",
                  color: isHighlighted ? "#FFF" : "inherit",
                  borderRadius: "0.375rem",
                  margin: "0 0.25rem",
                }}
              >
                <span>{item.label}</span>
                <span {...api.getItemIndicatorProps({ item })}>
                  <CheckIcon />
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
