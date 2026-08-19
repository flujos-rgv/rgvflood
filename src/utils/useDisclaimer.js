import { create } from "zustand"
import { persist } from "zustand/middleware"
// import _groupBy from "lodash/groupBy"
// import _sumBy from "lodash/sumBy"

export const useDisclaimerStore = create(
  persist(
    (set) => ({
      seen: false,
      setSeen: (seen) => {
        set({ seen })
      },
    }),
    { name: "_flujos-disclaimer-storage" }
  )
)
