import React, { createContext } from "react"

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
      return {
        address: "",
        lat: null,
        lng: null,
        streetNumber: null,
        isStreetNumberRequired: false,
      }
    default:
      throw new Error()
  }
}

const AppProvider = ({ children }) => {
  const [lawn, dispatchLawn] = React.useReducer(reducer, initialLawn)
  console.log(lawn)
  return (
    <AppContext.Provider value={{ lawn, dispatchLawn }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContext
export { AppProvider }
