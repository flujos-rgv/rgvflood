import * as dialog from "@zag-js/dialog"
import { useMachine, normalizeProps, Portal } from "@zag-js/react"
import { useEffect, useId } from "react"

import { useTranslationStore } from "@/utils/useTranslation"
import { useDisclaimerStore } from "@/utils/useDisclaimer"

export default function DisclaimerDialog() {
  const content = useTranslationStore((state) => state.content)

  const seen = useDisclaimerStore((state) => state.seen)
  const setSeen = useDisclaimerStore((state) => state.setSeen)

  const [state, send] = useMachine(
    dialog.machine({
      id: useId(),
      open: false,
      closeOnEscape: false,
      closeOnInteractOutside: false,
      onOpenChange: ({ open }) => {
        if (!open) setSeen(true)
      },
    })
  )

  const api = dialog.connect(state, send, normalizeProps)

  const { style: positionerStyle, ...positionerProps } =
    api.getPositionerProps()

  useEffect(() => {
    if (typeof window === "undefined") return undefined
    api.setOpen(!seen)
  }, [seen])

  return api.open ? (
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
          style={{
            width: "100%",
            maxHeight: "100%",
            overflowY: "scroll",
            padding: "15vh 1.25rem",
            pointerEvents: "all",
          }}
        >
          <div
            {...api.getContentProps()}
            style={{
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
            <h2
              {...api.getTitleProps()}
              style={{ fontSize: "1.5rem", fontWeight: 700 }}
            >
              {content.disclaimer2.title}
            </h2>
            <div
              {...api.getDescriptionProps()}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <p>{content.disclaimer2.content}</p>
            </div>
            <button {...api.getCloseTriggerProps()} className="btn">
              {content.confirmation}
            </button>
          </div>
        </div>
      </div>
    </Portal>
  ) : null
}
