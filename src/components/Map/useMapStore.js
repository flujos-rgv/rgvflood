import { create } from "zustand"

export const useMapStore = create((set) => ({
  selectedItem: null,
  setSelectedItem: (selectedItem) => {
    set({ selectedItem: selectedItem?.features[0]?.properties || null })
  },
  showSatellite: true,
  setShowSatellite: (showSatellite) => set({ showSatellite }),
  toggleSatellite: () =>
    set((state) => ({ showSatellite: !state.showSatellite })),
  showFloodLayers: true,
  toggleFloodLayers: () =>
    set((state) => {
      const showFloodLayers = !state.showFloodLayers
      return {
        showFloodLayers,
        showNoFloodLayers: showFloodLayers
          ? state.showNoFloodLayers
          : showFloodLayers,
      }
    }),
  showNoFloodLayers: false,
  toggleNoFloodLayers: () =>
    set((state) => {
      const showNoFloodLayers = !state.showNoFloodLayers
      return {
        showNoFloodLayers,
        showFloodLayers: showNoFloodLayers
          ? showNoFloodLayers
          : state.showFloodLayers,
      }
    }),
  showPermanentWater: true,
}))
