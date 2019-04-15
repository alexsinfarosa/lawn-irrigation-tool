import React, { createContext, useState, useReducer } from "react"

// utils ------------------------------------------------
import { addRemoveWater } from "./utils/api"

const AppContext = createContext({})

// Initial Lawn -----------------------------------------
const initialLawn = {
  address: "",
  lat: null,
  lng: null,
  streetNumber: null,
  irrigationDate: null,
  sprinklerType: "",
  sprinklerRate: null,
  sprinklerMinutes: null,
  id: null,
  updated: null,
  forecast: {},
  data: [],
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

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [lawns, setLawns] = useState([])

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
    setLawns(newLawns)
  }

  // DELETE Lawn ----------------------
  function deleteLawn(id) {
    const newLawns = lawns.filter(l => l.id !== id)
    setLawns(newLawns)
  }

  // UPDATE Lawn -----------------------
  function updateLawn(lawn) {
    let lawnsCopy = [...lawns]
    const idx = lawns.findIndex(l => l.id === lawn.id)
    lawnsCopy[idx] = lawn
    setLawns(lawnsCopy)
  }

  const [lawn, globalDispatch] = useReducer(reducer, initialLawn)

  const hasDataAndForecast =
    lawn.data.length !== 0 && Object.keys(lawn.forecast).length !== 0

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
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContext
export { AppProvider }
