import React, { createContext, useState, useReducer } from "react"

// utils ------------------------------------------------
import { addRemoveWater, fetchForecastData, fetchPETData } from "./utils/api"
// import { window } from "browser-monads"
import differenceInMinutes from "date-fns/differenceInMinutes"
import { navigate } from "gatsby"

import uuidv5 from "uuid"
import { metricsOnServer } from "./utils/api"
const AppContext = createContext({})

// Initial Lawn -----------------------------------------
const initialLawn = lawns => {
  if (lawns.length === 0) {
    return {
      address: "",
      lat: null,
      lng: null,
      streetNumber: null,
      irrigationDate: null,
      sprinklerType: "",
      sprinklerRate: null,
      sprinklerMinutes: null,
      distributionUniformity: null,
      sprayEfficiencyFactor: null,
      id: null,
      updated: null,
      forecast: {},
      data: [],
    }
  } else {
    return lawns[0]
  }
}

// REDUCER ---------------------------------------------------------
function reducer(state, action) {
  switch (action.type) {
    case "setLocation":
      return {
        ...state,
        address: action.address,
        lat: action.lat,
        lng: action.lng,
        streetNumber: action.streetNumber,
      }
    case "setDate":
      return { ...state, irrigationDate: action.selectedDate }
    case "setSprinkler":
      return {
        ...state,
        id: action.id,
        sprinklerType: action.name,
        sprinklerRate: action.rate,
        sprinklerMinutes: action.minutes,
        distributionUniformity: action.distributionUniformity,
        sprayEfficiencyFactor: action.sprayEfficiencyFactor,
      }
    case "setForecast":
      return { ...state, forecast: action.forecast }
    case "setPETData":
      return { ...state, updated: Date.now(), data: action.petData }
    case "setLawn":
      return { ...state, ...action.lawn }
    case "reset":
      return initialLawn
    default:
      throw new Error()
  }
}

// Local Storage -----------------------------------------
const lsKey = `lawn-irrigation-tool`
function writeToLS(item) {
  window.localStorage.setItem(lsKey, JSON.stringify(item))
}
function readFromLS() {
  if (typeof window !== "undefined") {
    const datafromStorage = JSON.parse(window.localStorage.getItem(lsKey))
    return datafromStorage !== null ? datafromStorage : []
  } else {
    return []
  }
}
function removeAllLS() {
  window.localStorage.removeItem(lsKey)
  navigate("/")
}
// Local Storage -------------------------------------------

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [countRef, setCountRef] = useState(0)
  const [lawns, setLawns] = useState(readFromLS)
  const [version] = useState("v0.9.2")

  // ADD Lawn -------------------------
  async function addLawn(newLawn) {
    let newLawnCopy = { ...newLawn }
    if (newLawn.irrigationDate) {
      const todayIdx = newLawnCopy.data.dates.findIndex(
        d => d === newLawn.irrigationDate
      )
      newLawnCopy = addRemoveWater(newLawnCopy, todayIdx)
    }
    const newLawns = [newLawnCopy, ...lawns]

    if (hasDataAndForecast) {
      writeToLS(newLawns)
    }

    setLawns(newLawns)
  }

  // DELETE Lawn ----------------------
  function deleteLawn(id) {
    const newLawns = lawns.filter(l => l.id !== id)

    newLawns.length === 0 ? removeAllLS() : writeToLS(newLawns)
    setLawns(newLawns)
  }

  // UPDATE Lawn -----------------------
  function updateLawn(lawn) {
    let lawnsCopy = [...lawns]
    const idx = lawns.findIndex(l => l.id === lawn.id)
    lawnsCopy[idx] = lawn

    writeToLS(lawnsCopy)
    setLawns(lawnsCopy)
  }

  // State
  const [lawn, globalDispatch] = useReducer(reducer, initialLawn(lawns))

  // Make sure the data array and the forecast object are not empy
  const hasDataAndForecast =
    lawn.data.length !== 0 && Object.keys(lawn).length !== 0

  React.useEffect(() => {
    console.log(metricsOnServer("98cn2", 1, lawn))
    // console.log("ONE")
    // Navigating to the right route and making updates
    if (lawns.length === 0) {
      // First time the app is opened the useId is and the count are created
      const userIdRef = window.localStorage.getItem(`${lsKey}-userId`)
      if (userIdRef === null) {
        window.localStorage.setItem(`${lsKey}-userId`, uuidv5())
        window.localStorage.setItem(`${lsKey}-count`, 1)
      }
    } else {
      // Incrementing number of times app was opened
      const countRef = JSON.parse(window.localStorage.getItem(`${lsKey}-count`))
      if (countRef !== null) {
        const count = Number(countRef + 1)
        setCountRef(count)
        window.localStorage.setItem(`${lsKey}-count`, JSON.stringify(count))
      }

      updateDataAndForecast(lawn)
      navigate("/lawn/")
    }
    setLoading(false)
  }, [])

  async function updateDataAndForecast(lawn) {
    const minutes = differenceInMinutes(Date.now(), new Date(lawn.updated))
    // console.log(minutes, lawn.address)
    if (minutes > 760) {
      // console.log("Fetching forecast and PET data...")
      setLoading(true)

      const lawnCopy = { ...lawn }
      const forecast = await fetchForecastData(lawnCopy.lat, lawnCopy.lng)
      const data = await fetchPETData(lawnCopy.lat, lawnCopy.lng)

      if (Object.keys(forecast).length !== 0 && data.length !== 0) {
        lawnCopy.forecast = forecast

        // hasUserWatered is not updated since it containes user data
        lawnCopy.data.dates = data.dates
        lawnCopy.data.pcpns = data.pcpns
        lawnCopy.data.pets = data.pets
        lawnCopy.updated = Date.now()
        updateLawn(lawnCopy)
      }
      setLoading(false)
    }
  }

  return (
    <AppContext.Provider
      value={{
        lawn,
        globalDispatch,
        lawns,
        setLawns,
        addLawn,
        updateLawn,
        deleteLawn,
        loading,
        setLoading,
        hasDataAndForecast,
        countRef,
        setCountRef,
        updateDataAndForecast,
        version,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContext
export { AppProvider }
