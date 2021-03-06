import React, { createContext, useState, useReducer } from "react"
import axios from "axios"

// utils ------------------------------------------------
import { addRemoveWater, mainFunction } from "./utils/api"
import differenceInMinutes from "date-fns/differenceInMinutes"
import { navigate } from "gatsby"

import format from "date-fns/format"
import addDays from "date-fns/addDays"

const AppContext = createContext({})

// const baseUrl = `https://stage.lawnwatering.org`
// let GATSBY_URL_CREATE_USER = `${baseUrl}/v0/user`
// let urlFetchDataFromServer = `${baseUrl}/v0/forecast`
// let urlUpdateUser = `${baseUrl}/v0/user`

// const production = false
// console.log(process.env.GATSBY_URL_FETCH_DATA_FROM_SERVER)
// if (production) {
//   GATSBY_URL_CREATE_USER = `/v0/user`
//   urlFetchDataFromServer = `/v0/forecast`
//   urlUpdateUser = `/v0/user`
// }

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
    case "updated":
      return { ...state, updated: action.now }
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
    const userIdRef = window.localStorage.getItem("lawn-irrigation-tool-userId")
    const isUserId = userIdRef !== "null" || userIdRef !== "undefined"
    if (isUserId) {
      return userIdRef
    }
  }
}

// Local Storage -------------------------------------------
const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [countRef, setCountRef] = useState(0)
  const [lawns, setLawns] = useState(readFromLS)
  const [version] = useState("v1.5")

  // ADD Lawn -------------------------
  function addLawn(newLawn) {
    let newLawnCopy = { ...lawn, ...newLawn }

    if (newLawnCopy.irrigationDate) {
      const irrigationDateIdx = newLawnCopy.data.dates.findIndex(
        date => date === newLawnCopy.irrigationDate
      )
      newLawnCopy = addRemoveWater(newLawnCopy, irrigationDateIdx)
    }

    const newLawns = [newLawnCopy, ...lawns]

    if (hasDataAndForecast) {
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
    updateUser(newLawns)
  }

  // UPDATE Lawn -----------------------
  function updateLawn(lawn) {
    let lawnCopy = { ...lawn }
    lawnCopy.updated = Date.now()

    let lawnsCopy = [...lawns]
    const idx = lawnsCopy.findIndex(l => l.id === lawnCopy.id)
    lawnsCopy[idx] = lawnCopy

    writeToLS(lawnsCopy)
    setLawns(lawnsCopy)
    updateUser(lawnsCopy)
  }

  function updateLawns(lawns) {
    // console.log(lawns)
    globalDispatch({ type: "setLawn", lawn: lawns[0] })
    writeToLS(lawns)
    setLawns(lawns)
    updateUser(lawns)
  }

  // State
  const [lawn, globalDispatch] = useReducer(reducer, initialLawn(lawns))
  const [userId, setUserId] = React.useState(readUserId)

  const hasDataAndForecast =
    lawn.data.length !== 0 && Object.keys(lawn.forecast).length !== 0

  // Fetching -------------------------------------------------------
  function createUser(lawns = []) {
    // console.log("createUser CALLED!")
    const payload = { id: "", lawns }
    return axios
      .post(process.env.GATSBY_URL_CREATE_USER, payload)
      .then(res => {
        // console.log(res)
        setUserId(res.data.id)
        window.localStorage.setItem(`${lsKey}-userId`, res.data.id)
      })
      .catch(err => console.log("Failed to create or update user", err))
  }

  function fetchDataFromServer(id, lon, lat, hasUserWatered = null) {
    const payload = {
      id,
      lon: Number(lon.toFixed(2)),
      lat: Number(lat.toFixed(2)),
      year: new Date().getFullYear(),
    }

    return axios
      .post(process.env.GATSBY_URL_FETCH_DATA_FROM_SERVER, payload)
      .then(res => {
        // console.log(res)
        // setLoading(true)
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
            irrigation.dates_pet.length +
            irrigation.dates_pet_fcst.length -
            lawn.data.hasUserWatered.length

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

        return { forecast, petData }
      })
      .catch(err => {
        console.log("Failed to fetch data from server", err)
      })
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
    const minutes = differenceInMinutes(Date.now(), lawn.updated)
    // console.log(minutes, lawn.address)
    if (minutes > 360) {
      setLoading(true)
      // console.log("Updating forecast and PET data...")
      const { forecast, petData } = await fetchDataFromServer(
        userId,
        lawn.lng,
        lawn.lat,
        lawn.data.hasUserWatered
      )

      const today = format(new Date(), "M/d/yyyy")
      const tomorrow = format(addDays(new Date(), 1), "M/d/yyyy")
      const dayAfterTomorrow = format(addDays(new Date(), 2), "M/d/yyyy")

      const dataIsOk =
        petData.dates.includes(today) &&
        petData.dates.includes(tomorrow) &&
        petData.dates.includes(dayAfterTomorrow)

      // console.log(today, tomorrow, dayAfterTomorrow, dataIsOk)
      // console.log(petData.dates)

      const lawnCopy = { ...lawn }

      if (dataIsOk) {
        lawnCopy.forecast = forecast
        lawnCopy.data = petData
        lawnCopy.updated = Date.now()
      }

      setLoading(false)
      return lawnCopy
    } else {
      // console.log(lawn)
      setLoading(false)
      return lawn
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
        // address: l.address, // Testing only...
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

    const payload = { id: userId, lawns: metrics }
    return axios
      .post(process.env.GATSBY_URL_UPDATE_USER, payload)
      .then(res => res.data)
      .catch(err => console.log("Failed to create or update user", err))
  }

  const updateAllLawns = async lawns => {
    setLoading(true)
    return await Promise.all(
      lawns.map(lawn => updateDataAndForecast(lawn))
    ).catch(err => {
      console.log(err)
      updateUser(lawns)
      setTimeout(() => {
        updateAllLawns(lawns)
      }, 4000)
    })
  }

  React.useEffect(() => {
    // Reset data every year
    const years = lawns.map(location => {
      const date = location.data.dates[0]
      return +date.split("/")[2]
    })

    const mustDeleteData = years.some(year => year < new Date().getFullYear())
    // console.log(years, mustDeleteData, !readUserId())
    if (
      lawns === "undefined" ||
      lawns.includes(null) ||
      mustDeleteData ||
      !readUserId
    ) {
      console.log("localStorage is damaged! - Reset it")
      removeAllLS()
      setLoading(false)
      return
    }

    if (lawns.length === 0) {
      // First time the app is opened the useId is and the count are created
      if (!userId) {
        createUser()
        window.localStorage.setItem(`${lsKey}-count`, 1)
      }
      setLoading(false)
    } else {
      // Incrementing number of times app was opened
      const countRef = JSON.parse(window.localStorage.getItem(`${lsKey}-count`))
      if (!countRef) {
        const count = Number(countRef + 1)
        setCountRef(count)
        window.localStorage.setItem(`${lsKey}-count`, JSON.stringify(count))
      }

      updateAllLawns(lawns).then(results => {
        // console.log(results)
        updateLawns(results)
      })
      // setLoading(false)

      navigate("/lawn/")
    }
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
