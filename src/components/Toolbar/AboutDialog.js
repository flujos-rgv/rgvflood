import * as dialog from "@zag-js/dialog"
import { useMachine, normalizeProps, Portal } from "@zag-js/react"
import { useId } from "react"

import { QuestionIcon, CloseIcon } from "@/components/Icon"
import { useTranslationStore } from "@/utils/useTranslation"

export default function AboutDialog() {
  const content = useTranslationStore((state) => state.content)

  const [state, send] = useMachine(dialog.machine({ id: useId() }))

  const api = dialog.connect(state, send, normalizeProps)

  const { style: positionerStyle, ...positionerProps } =
    api.getPositionerProps()

  return (
    <>
      <button className="btn" {...api.getTriggerProps()} style={{ zIndex: 2 }}>
        <QuestionIcon />
      </button>
      {api.open && (
        <Portal>
          <div
            {...api.getBackdropProps()}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              zIndex: 2,
            }}
          />
          <div
            {...positionerProps}
            style={{
              ...positionerStyle,
              position: "fixed",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 3,
            }}
          >
            <div
              className="about-modal-inner"
              style={{
                width: "100%",
                maxHeight: "100%",
                overflowY: "scroll",
                pointerEvents: "all",
              }}
            >
              <div
                {...api.getContentProps()}
                style={{
                  position: "relative",
                  background: "#FFF",
                  borderRadius: "0.375rem",
                  padding: "2rem",
                  width: "100%",
                  maxWidth: "45rem",
                  margin: "0 auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                <button
                  {...api.getCloseTriggerProps()}
                  className="btn"
                  style={{
                    position: "absolute",
                    top: "0.5rem",
                    right: "0.5rem",
                  }}
                >
                  <span>{content.close}</span>
                  <CloseIcon size="1.25rem" />
                </button>
                <h2
                  {...api.getTitleProps()}
                  style={{ fontSize: "1.5rem", fontWeight: 700 }}
                >
                  {content.about[0]}
                </h2>
                <div
                  {...api.getDescriptionProps()}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                >
                  {content.about.slice(1).map((d, i) => {
                    const dd = d.slice(1)
                    return (
                      <p key={i}>
                        <strong>{d[0]}</strong>
                        {dd.map(([c, href], j) => {
                          return href ? (
                            <a
                              key={j}
                              href={href}
                              style={{
                                color: "#06F",
                                textDecoration: "underline",
                              }}
                            >
                              {c}
                            </a>
                          ) : (
                            <span key={j}>{c}</span>
                          )
                        })}
                      </p>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  )
}
