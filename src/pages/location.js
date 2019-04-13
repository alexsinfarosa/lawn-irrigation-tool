import React from "react"

import { useTheme } from "@material-ui/styles"
import TextField from "@material-ui/core/TextField"
import Divider from "@material-ui/core/Divider"
import InputAdornment from "@material-ui/core/InputAdornment"
import IconButton from "@material-ui/core/IconButton"
import FormGroup from "@material-ui/core/FormGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Header from "../components/header"
import ButtonLink from "../components/styled/buttonLink"
import { GridContainer } from "../components/styled/sharedComponents"

// GOOGLE API
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete"
import hideVirtualKeyboard from "hide-virtual-keyboard"

// UTILS ---------------------------------
import { fetchForecastData } from "../utils/api"

import AppContext from "../appContext"

// Initial State --------------------------------------------------
const initialState = {
  address: "",
  lat: null,
  lng: null,
  streetNumber: null,
  isStreetNumberRequired: false,
}

// REDUCER ---------------------------------------------------------
function reducer(state, action) {
  switch (action.type) {
    case "setAddress":
      return { ...state, address: action.address }
    case "setLatLng":
      return { ...state, lat: action.lat, lng: action.lng }
    case "setStreetNumber":
      return { ...state, streetNumber: action.streetNumber }
    case "toggleIsStreetNumberRequired":
      return {
        address: "",
        lat: null,
        lng: null,
        streetNumber: null,
        isStreetNumberRequired: !state.isStreetNumberRequired,
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

const LocationPage = () => {
  // console.log("LocationPage")
  const theme = useTheme()

  // CONTEXT -----------------------------------------------
  const { setLoading, globalDispatch } = React.useContext(AppContext)

  // STATE ------------------------------------------------
  const [state, localDispatch] = React.useReducer(reducer, initialState)
  const [errorMessage, setErrorMessage] = React.useState("")

  // Handle address change --------------------------------
  const handleAddressChange = address => {
    localDispatch({ type: "setAddress", address })
    setErrorMessage("")
  }

  // Determine street number if checkbox is selected
  const determineStreetNumber = address => {
    const arr = address.split(" ")
    const streetNumber = +arr[0]
    if (!isNaN(streetNumber)) {
      localDispatch({ type: "setStreetNumber", streetNumber })
    }
  }

  // Click on one of the suggested addresses of the list
  const handleSelectAddress = address => {
    localDispatch({ type: "setAddress", address })
    geocodeByAddress(address)
      .then(results => {
        const formattedAddress = results[0].formatted_address
        if (state.isStreetNumberRequired) {
          determineStreetNumber(formattedAddress)
        }
        return getLatLng(results[0])
      })
      .then(({ lat, lng }) => {
        if (!(lat >= 37.2 && lat <= 47.6) || !(lng >= -82.7 && lng <= -66.1)) {
          setErrorMessage("ZERO_RESULTS")
        } else {
          localDispatch({ type: "setLatLng", lat, lng })
          hideVirtualKeyboard()
        }
      })
      .catch(error => console.error("Error", error))
  }

  // Returns error if address is not valid
  const handleError = async (status, clearSuggestions) => {
    // console.log("Error from Google Maps API", status);
    setErrorMessage(status)
    clearSuggestions()
  }

  return (
    <Layout>
      <SEO title="Location" />

      <GridContainer>
        <Header icon="chevron-left" title="Create Location - (step 1/3)" />

        <Box my={2}>
          <Box mb={4} align="center">
            <Typography variant="h6" gutterBottom>
              Enter Your Location
            </Typography>
          </Box>

          <Box mb={2}>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.isStreetNumberRequired}
                    color="primary"
                    onChange={() =>
                      localDispatch({ type: "toggleIsStreetNumberRequired" })
                    }
                  />
                }
                label="My street number follows the odd/even irrigation ordinance"
              />
            </FormGroup>
          </Box>

          {/* Google places input */}
          <Box>
            <PlacesAutocomplete
              value={state.address}
              onChange={handleAddressChange}
              onSelect={handleSelectAddress}
              shouldFetchSuggestions={state.address.length > 2}
              onError={handleError}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <>
                  <form noValidate autoComplete="off">
                    <TextField
                      autoComplete="off"
                      id="address"
                      label="Address"
                      placeholder="Type your address"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      color="secondary"
                      SelectProps={{ native: true }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="delete typed address"
                              onClick={() => localDispatch({ type: "reset" })}
                            >
                              <small>&#10005;</small>
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      {...getInputProps({ className: "location-search-input" })}
                    />
                  </form>

                  {/* SUGGESTIONS */}
                  <div>
                    {loading && (
                      <Box align="center">
                        <Typography variant="caption">Loading...</Typography>
                      </Box>
                    )}

                    {!loading &&
                      state.address.length > 0 &&
                      errorMessage === "ZERO_RESULTS" && (
                        <Box align="center">
                          <Typography variant="caption" color="error">
                            Address is not valid
                          </Typography>
                        </Box>
                      )}

                    {suggestions.map(suggestion => {
                      const className = suggestion.active
                        ? "suggestion-item--active"
                        : "suggestion-item"

                      const style = suggestion.active
                        ? {
                            backgroundColor: theme.palette.primary.main,
                            borderRadius: 4,
                            color: "#fff",
                            padding: 16,
                            cursor: "pointer",
                          }
                        : {
                            backgroundColor: "#fff",
                            padding: 16,
                            cursor: "pointer",
                          }
                      return (
                        <div {...getSuggestionItemProps(suggestion)}>
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                            })}
                          >
                            <Typography variant="caption" color="inherit">
                              {suggestion.description}
                            </Typography>
                          </div>
                          <Divider />
                        </div>
                      )
                    })}
                  </div>
                </>
              )}
            </PlacesAutocomplete>
          </Box>
        </Box>

        <Box mx={-2}>
          <ButtonLink
            to="/irrigation"
            variant="contained"
            color="primary"
            disabled={state.lat ? false : true}
            onClick={async () => {
              setLoading(true)
              const forecast = await fetchForecastData(state.lat, state.lng)
              globalDispatch({ type: "setLocation", ...state })
              globalDispatch({ type: "setForecast", forecast })
              setLoading(false)
            }}
          >
            Continue &rarr;
          </ButtonLink>
        </Box>
      </GridContainer>
    </Layout>
  )
}

export default LocationPage
