import { useRef, useEffect, useState } from "react"
import mapboxgl from "mapbox-gl"

import getStreetMapStyle from "./getStreetMapStyle"
import getSatelliteMapStyle from "./getSatelliteMapStyle"

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

import { useEventContext } from "@/utils/EventContext"
import { useMapStore } from "@/components/Map/useMapStore"

export default function MapboxMap() {
  const mapRef = useRef(null)
  const markerRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const { eventId } = useEventContext()

  const selectedItem = useMapStore((state) => state.selectedItem)
  const showSatellite = useMapStore((state) => state.showSatellite)
  const showFloodLayers = useMapStore((state) => state.showFloodLayers)
  const showNoFloodLayers = useMapStore((state) => state.showNoFloodLayers)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (mapRef.current) return
    if (isLoaded) return

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/light-v11",
      center: [-98.2, 26.3],
      zoom: 8,
      minZoom: 8,
      maxZoom: 16,
    })

    map.on("style.load", () => {
      setIsLoaded(true)

      map.addLayer({
        id: "add-3d-buildings",
        source: "composite",
        "source-layer": "building",
        filter: ["==", "extrude", "true"],
        type: "fill-extrusion",
        minzoom: 12,
        paint: {
          "fill-extrusion-color": "#aaa",
          "fill-extrusion-height": [
            "interpolate",
            ["linear"],
            ["zoom"],
            12,
            0,
            12.05,
            ["get", "height"],
          ],
          "fill-extrusion-base": [
            "interpolate",
            ["linear"],
            ["zoom"],
            12,
            0,
            12.05,
            ["get", "min_height"],
          ],
          "fill-extrusion-opacity": 0.9,
        },
      })
    })

    mapRef.current = map
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return undefined
    if (!mapRef.current) return undefined
    if (!isLoaded) return undefined
    if (!eventId) return undefined

    const map = mapRef.current

    function updateLayers(showFloodLayers = true, showNoFloodLayers = true) {
      const layers = map.getStyle().layers
      const labelLayerId = layers.find(
        (layer) => layer.type === "symbol" && layer.layout["text-field"]
      ).id

      const allLayerIds = layers.map((d) => d.id)

      if (allLayerIds.includes("flood-fill")) {
        try {
          map.removeLayer("flood-fill")
        } catch (err) {
          console.log("Couldn't remove flood-fill layer", err)
        }
      }

      if (allLayerIds.includes("noflood-fill")) {
        try {
          map.removeLayer("noflood-fill")
        } catch (err) {
          console.log("Couldn't remove noflood-fill layer", err)
        }
      }

      if (map.getSource("flood")) {
        try {
          map.removeSource("flood")
        } catch (err) {
          console.log("Couldn't remove flood source", err)
        }
      }

      if (map.getSource("noflood")) {
        try {
          map.removeSource("noflood")
        } catch (err) {
          console.log("Couldn't remove noflood source", err)
        }
      }

      if (!showFloodLayers) return

      map.addSource("flood", {
        type: "vector",
        tiles: [
          `${window.location.origin}/tiles/event-${eventId}/flood/{z}/{x}/{y}.pbf`,
        ],
        minzoom: 0,
        maxzoom: 12,
      })

      if (showNoFloodLayers) {
        map.addSource("noflood", {
          type: "vector",
          tiles: [
            `${window.location.origin}/tiles/event-${eventId}/noflood/{z}/{x}/{y}.pbf`,
          ],
          minzoom: 0,
          maxzoom: 12,
        })

        map.addLayer(
          {
            id: "noflood-fill",
            source: "noflood",
            "source-layer": `mergedgeonoflood`,
            type: "fill",
            paint: {
              "fill-color": "#B2F2BB",
              "fill-opacity": 0.7,
            },
          },
          labelLayerId
          // "water"
        )
      }

      map.addLayer(
        {
          id: "flood-fill",
          type: "fill",
          source: "flood",
          "source-layer": "floodlayer",
          paint: {
            "fill-color": "#0066FF",
            "fill-opacity": 0.7,
          },
        },
        "water"
      )
    }

    map.on("style.load", () => {
      updateLayers(showFloodLayers, showNoFloodLayers)
    })

    updateLayers(showFloodLayers, showNoFloodLayers)
  }, [eventId, isLoaded, showSatellite, showFloodLayers, showNoFloodLayers])

  useEffect(() => {
    if (!mapRef.current) return undefined

    const coloniaFill = mapRef.current.getLayer("colonia-fill")
    if (coloniaFill) mapRef.current.removeLayer(coloniaFill.id)

    const coloniaOutline = mapRef.current.getLayer("colonia-outline")
    if (coloniaOutline) mapRef.current.removeLayer(coloniaOutline.id)

    const coloniaSource = mapRef.current.getSource("colonia")
    if (coloniaSource) mapRef.current.removeSource(coloniaSource.id)

    if (!selectedItem) {
      markerRef.current?.remove?.()
      mapRef.current.flyTo({
        center: [-98.2, 26.3],
        zoom: 8,
        essential: true,
      })
      return undefined
    }

    const { latitude, longitude } = selectedItem.coordinates

    markerRef.current?.remove?.()
    markerRef.current = new mapboxgl.Marker({ color: "#06F" })
      .setLngLat([longitude, latitude])
      .addTo(mapRef.current)

    mapRef.current.flyTo({
      center: [longitude, latitude],
      zoom: 15,
      essential: true,
    })

    if (!selectedItem.id) return undefined

    fetch(`/data/colonias/${selectedItem.id}.json`)
      .then((res) => res.json())
      .then((colonia) => {
        const coloniaFill = mapRef.current.getLayer("colonia-fill")
        if (coloniaFill) mapRef.current.removeLayer(coloniaFill.id)

        const coloniaOutline = mapRef.current.getLayer("colonia-outline")
        if (coloniaOutline) mapRef.current.removeLayer(coloniaOutline.id)

        const coloniaSource = mapRef.current.getSource("colonia")
        if (coloniaSource) mapRef.current.removeSource(coloniaSource.id)

        const labelLayerId = mapRef.current
          .getStyle()
          .layers.find(
            (layer) => layer.type === "symbol" && layer.layout["text-field"]
          ).id

        mapRef.current.addSource("colonia", {
          "type": "geojson",
          "data": {
            "type": "Feature",
            "geometry": {
              "type": "Polygon",
              "coordinates": colonia.geometry.coordinates,
            },
          },
        })
        mapRef.current.addLayer(
          {
            "id": "colonia-fill",
            "type": "fill",
            "source": "colonia",
            "layout": {},
            "paint": {
              "fill-color": "#FFFFFF",
              "fill-opacity": 0.25,
            },
          },
          labelLayerId
        )
        mapRef.current.addLayer(
          {
            "id": "colonia-outline",
            "type": "line",
            "source": "colonia",
            "layout": {},
            "paint": {
              "line-color": "#FFF",
              "line-width": 4,
            },
          },
          labelLayerId
        )
      })
  }, [JSON.stringify(selectedItem)])

  useEffect(() => {
    if (typeof window === "undefined") return undefined
    if (!mapRef.current) return undefined
    if (showSatellite) {
      mapRef.current.setStyle(getSatelliteMapStyle())
    } else {
      mapRef.current.setStyle(getStreetMapStyle())
    }
  }, [showSatellite])

  const handleZoomIn = () => {
    const currentZoom = mapRef.current.getZoom()
    const zoom = Math.min(16, Math.round(currentZoom) + 1)
    mapRef.current.flyTo({ zoom })
  }

  const handleZoomOut = () => {
    const currentZoom = mapRef.current.getZoom()
    const zoom = Math.max(6, Math.round(currentZoom) - 1)
    mapRef.current.flyTo({ zoom })
  }

  const handleScreenshot = () => {
    function takeScreenshot(map) {
      return new Promise(function (resolve, reject) {
        map.once("render", function () {
          resolve(map.getCanvas().toDataURL())
        })
        map.setBearing(map.getBearing())
      })
    }
    takeScreenshot(mapRef.current).then(function (data) {
      var download = document.createElement("a")
      download.href = data
      download.download = "flujos-rgv-map.png"
      download.click()
    })
  }

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <div id="map" style={{ position: "absolute", inset: 0 }} />
      <div className="zoom-controls">
        <button onClick={handleZoomIn}>
          <svg viewBox="0 0 24 24" width="20" height="20">
            <title>{"Zoom in"}</title>
            <path
              d="M12,4L12,20M4,12L20,12"
              fill="none"
              strokeWidth={2}
              stroke="currentcolor"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </button>
        <button onClick={handleZoomOut}>
          <svg viewBox="0 0 24 24" width="20" height="20">
            <title>{"Zoom out"}</title>
            <path
              d="M4,12L20,12"
              fill="none"
              strokeWidth={2}
              stroke="currentcolor"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </button>
        <button onClick={handleScreenshot}>
          <svg viewBox="0 0 24 24" width="20" height="20">
            <title>{"Take screenshot"}</title>
            <path
              d="M10,10m4,0a4,4 0 1, 0 -8,0a4,4 0 1,0 8,0 M20 16a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3l2-3h6l2 3h3a2 2 0 0 1 2 2v11z"
              fill="none"
              strokeWidth={2}
              stroke="currentcolor"
              vectorEffect="non-scaling-stroke"
              transform="translate(2 3)"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
