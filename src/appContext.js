import React, { createContext, useState, useReducer } from "react"

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
        sprinklerType: action.name,
        sprinklerRate: action.rate,
        sprinklerMinutes: action.minutes,
      }
    case "reset":
      return initialLawn
    default:
      throw new Error()
  }
}

const AppProvider = ({ children }) => {
  const [lawns, setLawns] = useState([])

  // ADD Lawn -------------------------
  function addLawn(newLawn) {
    const newLawns = [newLawn, ...lawns]
    setLawns(newLawns)
  }

  // DELETE Lawn ----------------------
  function deleteLawn(id) {
    const newLawns = lawns.filter(l => l.id !== id)
    setLawns(newLawns)
  }
  console.log(lawns)
  const [lawn, dispatchLawn] = useReducer(reducer, initialLawn)
  console.log(lawn)
  return (
    <AppContext.Provider
      value={{ lawn, dispatchLawn, lawns, setLawns, addLawn, deleteLawn }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContext
export { AppProvider }
