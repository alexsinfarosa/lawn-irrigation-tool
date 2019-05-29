import React, { createContext, useState, useReducer } from "react"
import axios from "axios"

// utils ------------------------------------------------
import { addRemoveWater, mainFunction } from "./utils/api"
import differenceInMinutes from "date-fns/differenceInMinutes"
import { navigate } from "gatsby"

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
        sprinklerType: action.name,
        sprinklerRate: action.rate,
        sprinklerMinutes: action.minutes,
        distributionUniformity: action.distributionUniformity,
        sprayEfficiencyFactor: action.sprayEfficiencyFactor,
        id: action.id,
        updated: action.updated,
      }
    case "setForecast":
      return { ...state, forecast: action.forecast }
    case "setPETData":
      return { ...state, updated: Date.now(), data: action.petData }
    case "setLawn":
      return { ...action.lawn }
    case "setUserHasWatered":
      return { ...state, data: action.newData }
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

function readUserId() {
  if (typeof window !== "undefined") {
    const userIdStorage = window.localStorage.getItem(
      "lawn-irrigation-tool-userId"
    )
    return userIdStorage !== null ? userIdStorage : null
  }
}
// Local Storage -------------------------------------------

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [countRef, setCountRef] = useState(0)
  const [lawns, setLawns] = useState(readFromLS)
  const [version] = useState("v0.9.4")

  // ADD Lawn -------------------------
  async function addLawn(newLawn) {
    let newLawnCopy = { ...lawn, ...newLawn }
    if (newLawnCopy.irrigationDate) {
      const irrigationDateIdx = newLawnCopy.data.dates.findIndex(
        date => date === newLawnCopy.irrigationDate
      )
      newLawnCopy = addRemoveWater(newLawnCopy, irrigationDateIdx)
    }
    const newLawns = [newLawnCopy, ...lawns]

    if (hasDataAndForecast) {
      // console.log("hasDataAndForecast")
      writeToLS(newLawns)
    }

    setLawns(newLawns)
    updateUser(newLawns)
  }

  // DELETE Lawn ----------------------
  function deleteLawn(id) {
    const newLawns = lawns.filter(l => l.id !== id)

    newLawns.length === 0 ? removeAllLS() : writeToLS(newLawns)
    setLawns(newLawns)
  }

  // UPDATE Lawn -----------------------
  function updateLawn(lawn) {
    // globalDispatch({ type: "setLawn", lawn })

    let lawnsCopy = [...lawns]
    const idx = lawns.findIndex(l => l.id === lawn.id)
    lawnsCopy[idx] = lawn

    writeToLS(lawnsCopy)
    setLawns(lawnsCopy)
    updateUser(lawnsCopy)
  }

  // State
  const [lawn, globalDispatch] = useReducer(reducer, initialLawn(lawns))
  const [userId, setUserId] = React.useState(readUserId)
  // Make sure the data array and the forecast object are not empy

  const hasDataAndForecast =
    lawn.data.length !== 0 && Object.keys(lawn.forecast).length !== 0

  // Fetching -------------------------------------------------------
  async function createUser(lawns = []) {
    // console.log("createUser CALLED!")
    const url = `https://stage.lawnwatering.org/v0/user`
    // const url = `/v0/user`
    const payload = { id: "", lawns }
    return axios
      .post(url, payload)
      .then(res => {
        setUserId(res.data.id)
        window.localStorage.setItem(`${lsKey}-userId`, res.data.id)
      })
      .catch(err => console.log("Failed to create or update user", err))
  }

  async function fetchDataFromServer(id, lon, lat, hasUserWatered = null) {
    const url = `https://stage.lawnwatering.org/v0/forecast`
    // const url = `/v0/forecast`

    const payload = {
      id,
      lon: Number(lon.toFixed(2)),
      lat: Number(lat.toFixed(2)),
      year: new Date().getFullYear(),
    }

    return axios
      .post(url, payload)
      .then(res => {
        // console.log(res.data)
        setLoading(true)
        const { forecast, irrigation } = res.data

        const datesNoYears = [
          ...irrigation.dates_precip,
          ...irrigation.dates_precip_fcst,
        ]

        const dates = datesNoYears.map(d =>
          new Date(`${d}/${new Date().getFullYear()}`).toLocaleDateString()
        )
        let pcpns = [...irrigation.precip, ...irrigation.precip_fcst]
        const pets = [...irrigation.pet, ...irrigation.pet_fcst]
        let petData = { dates, pcpns, pets }

        if (hasUserWatered) {
          // console.log("UPDATING...")
          const newDays =
            lawn.data.dates.length - lawn.data.hasUserWatered.length

          const start = lawn.data.pcpns.length
          const newPcpns = pcpns.slice(start)

          const updatedPcpns = [...lawn.data.pcpns, ...newPcpns]
          // console.log(hasUserWatered.length, newDays)
          const updatedHasUserWatered = [
            ...hasUserWatered,
            ...new Array(newDays).fill(false),
          ]

          petData = {
            dates,
            pets,
            pcpns: updatedPcpns,
            hasUserWatered: updatedHasUserWatered,
          }
        }

        globalDispatch({ type: "setForecast", forecast })
        globalDispatch({ type: "setPETData", petData })

        setLoading(false)
      })
      .catch(err => console.log("Failed to fetch data from server", err))
  }

  function createHasUserWatered(selDate) {
    const newData = { ...lawn.data }
    newData["hasUserWatered"] = new Array(newData.dates.length).fill(false)
    if (selDate) {
      const selectedDateIdx = newData.dates.findIndex(date => date === selDate)
      newData["hasUserWatered"][selectedDateIdx] = "firstDate"
    }
    globalDispatch({ type: "setUserHasWatered", newData })
  }

  async function updateDataAndForecast(lawn) {
    const minutes = differenceInMinutes(Date.now(), new Date(lawn.updated))
    // console.log(minutes)
    if (minutes > 360) {
      // console.log("Fetching forecast and PET data...")
      fetchDataFromServer(userId, lawn.lng, lawn.lat, lawn.data.hasUserWatered)
    }
  }

  const updateUser = lawns => {
    // console.log("updateUser Called!")
    const lawnsCopy = [...lawns]
    const metrics = lawnsCopy.map(l => {
      return {
        data: {
          dates: l.data.dates,
          hasUserWatered: l.data.hasUserWatered,
          shouldWater: mainFunction(l).map(d => d.shouldWater),
        },
        id: l.id,
        lat: Number(l.lat.toFixed(2)),
        lng: Number(l.lng.toFixed(2)),
        sprinklerMinutes: l.sprinklerMinutes,
        sprinklerRate: l.sprinklerRate,
        sprinklerType: l.sprinklerType,
        hasOddEvenWaterOrdinance: l.streetNumber === null ? false : true,
      }
    })

    // console.log(metrics)

    // const url = `https://stage.lawnwatering.org/v0/user`
    const url = `/v0/user`
    const payload = { id: userId, lawns: metrics }
    return axios
      .post(url, payload)
      .then(res => res.data)
      .catch(err => console.log("Failed to create or update user", err))
  }

  React.useEffect(() => {
    if (lawns.length === 0) {
      // First time the app is opened the useId is and the count are created
      const userIdRef = window.localStorage.getItem(`${lsKey}-userId`)
      if (userIdRef === null) {
        createUser()
        // window.localStorage.setItem(`${lsKey}-userId`, userId)
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
      updateLawn(lawn)
    }
    setLoading(false)
  }, [])

  // console.log(lawn)
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
        userId,
        setUserId,
        fetchDataFromServer,
        createHasUserWatered,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContext
export { AppProvider }
