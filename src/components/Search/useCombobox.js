import { useState, useEffect, useId, useRef } from "react"
import * as combobox from "@zag-js/combobox"
import { useMachine, normalizeProps } from "@zag-js/react"
import { matchSorter } from "match-sorter"
import { SearchBoxCore, SessionToken } from "@mapbox/search-js-core"
import _debounce from "lodash/debounce"

import { useMapStore } from "@/components/Map/useMapStore"

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

export const useCombobox = ({ data, ...restProps }) => {
  const [options, setOptions] = useState(data)
  const searchRef = useRef(null)
  const sessionTokenRef = useRef(null)
  const referenceData = useRef([])

  const setSelectedItem = useMapStore((state) => state.setSelectedItem)

  useEffect(() => {
    referenceData.current = data
    const results = matchSorter(data, "A", {
      keys: ["label"],
      threshold: matchSorter.rankings.CONTAINS,
    })
    setOptions(results.slice(0, 6))
  }, [JSON.stringify(data)])

  const collection = combobox.collection({
    items: options,
    itemToValue: (item) => item.code,
    itemToString: (item) => item.label,
  })

  const [state, send] = useMachine(
    combobox.machine({
      id: useId(),
      collection,
      openOnClick: true,
      placeholder: "Search for a colonia or address",
      // selectionBehavior: "replace",
      // inputBehavior: "autohighlight",
      // onOpenChange({ open }) {
      //   const filtered = open
      //     ? matchSorter(data, this.inputValue, {
      //         keys: ["label", "code"],
      //         threshold: matchSorter.rankings.STARTS_WITH,
      //       })
      //     : data
      //   setOptions(filtered)
      // },
      onValueChange: async (d) => {
        const selectedItem = d?.items?.[0] || {}
        if (!selectedItem?.data) {
          setSelectedItem(null)
          return undefined
        }
        if (selectedItem.group === "mapbox") {
          searchRef.current
            .retrieve(selectedItem.data, {
              sessionToken: sessionTokenRef.current,
            })
            .then((d) => setSelectedItem(d))
        } else {
          setSelectedItem({ features: [{ properties: selectedItem.data }] })
        }
      },
      onInputValueChange: _debounce(async ({ inputValue }) => {
        // const filtered = data.filter((item) =>
        //   item.label.toLowerCase().includes(inputValue.toLowerCase())
        // )
        // setOptions(filtered.length > 0 ? filtered : data)

        if (!inputValue) {
          const results = matchSorter(referenceData.current, "A", {
            keys: ["label"],
            threshold: matchSorter.rankings.CONTAINS,
          })
          setOptions(results.slice(0, 6))
          return
        }

        const mapboxResults = await searchRef.current
          .suggest(inputValue, {
            sessionToken: sessionTokenRef.current,
          })
          .catch(() => ({ suggestions: [] }))

        const cleanMapboxResults = mapboxResults.suggestions.map((d) => {
          return {
            label: d.name,
            code: d.name,
            place_formatted: d.place_formatted,
            group: "mapbox",
            data: d,
          }
        })

        const results = matchSorter(referenceData.current, inputValue, {
          keys: ["label"],
          threshold: matchSorter.rankings.CONTAINS,
        })

        const combinedResults = [...results.slice(0, 6), ...cleanMapboxResults]

        setOptions(combinedResults)
      }, 300),
      ...restProps,
    }),
    {
      context: { collection },
    }
  )

  useEffect(() => {
    if (searchRef.current) return undefined
    if (sessionTokenRef.current) return undefined

    searchRef.current = new SearchBoxCore({
      accessToken,
      country: "US",
      proximity: ["-97.75", "26.25"],
      bbox: [
        [-100, 25.75],
        [-97, 27.75],
      ],
      types: ["place", "locality", "neighborhood", "street", "address"],
      limit: 6,
    })

    sessionTokenRef.current = new SessionToken()
  }, [])

  const api = combobox.connect(state, send, normalizeProps)

  return { api, options }
}
