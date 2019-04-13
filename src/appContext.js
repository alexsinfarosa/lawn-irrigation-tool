import React, { createContext, useState, useReducer } from "react"

// UTILS ---------------------------------
// import { fetchForecastData } from "./utils/api"

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
      return { ...state, updated: Date.now(), forecast: action.forecast }
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
    const newLawns = [newLawn, ...lawns]
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

  const [lawn, dispatchLawn] = useReducer(reducer, initialLawn)
  return (
    <AppContext.Provider
      value={{
        lawn,
        dispatchLawn,
        lawns,
        setLawns,
        addLawn,
        deleteLawn,
        loading,
        setLoading,
        updateLawn,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContext
export { AppProvider }
