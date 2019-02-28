import React, { useState } from "react";

import { makeStyles, useTheme } from "@material-ui/styles";
import Link from "../components/Link";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import ButtonGLink from "../components/buttonGLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import hideVirtualKeyboard from "hide-virtual-keyboard";

// GOOGLE API
import PlacesAutocomplete from "react-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

const useStyles = makeStyles(theme => ({
  root: {
    display: "grid",
    height: "100vh",
    gridTemplateRows: "auto 1fr auto"
  },
  header: {
    display: "grid",
    gridTemplateColumns: "auto 1fr auto",
    alignItems: "center",
    padding: theme.spacing(2)
  },
  main: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  },
  label: { color: "red" },
  footer: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(7)
  },
  btnBig: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    background: theme.palette.primary.light,
    color: "#fff"
  }
}));

// Initial State ---------------------------
const initialState = () => {
  return {
    address: "",
    isStreetNumber: true,
    lat: null,
    lng: null,
    streetNumber: null
  };
};

// REDUCER ---------------------------------
function reducer(state, action) {
  switch (action.type) {
    case "setAddress":
      return { ...state, address: action.address };
    case "toggleStreetNumber":
      return { ...state, isStreetNumber: !state.isStreetNumber };
    case "setLatLng":
      return { ...state, lat: action.lat, lng: action.lng };
    case "setStreetNumber":
      return { ...state, streetNumber: action.streetNumber };
    case "reset":
      return {
        address: "",
        isStreetNumber: true,
        lat: null,
        lng: null,
        streetNumber: null
      };
    default:
      throw new Error();
  }
}

function FieldLocationPage() {
  console.log("FieldLocationPage");
  const classes = useStyles();
  const theme = useTheme();

  // STATE --------------------------------------------------------
  const [state, dispatch] = React.useReducer(reducer, initialState());
  const [errorMessage, setErrorMessage] = useState("");

  // Side effects --------------------------------------------------
  React.useEffect(() => {
    window.localStorage.setItem("LIT_location", JSON.stringify(state));
  }, [state]);

  // Handle address change ------------------------------------------
  const handleAddressChange = address => {
    dispatch({ type: "setAddress", address });
    setErrorMessage("");
  };

  // Determine street number if checkbox is selected
  const determineStreetNumber = address => {
    const arr = address.split(" ");
    const streetNumber = +arr[0];
    if (!isNaN(streetNumber)) {
      dispatch({ type: "setStreetNumber", streetNumber });
    }
  };

  // Click on one of the suggested addresses of the list
  const handleSelectAdress = address => {
    dispatch({ type: "setAddress", address });
    geocodeByAddress(address)
      .then(results => {
        const formattedAddress = results[0].formatted_address;
        if (state.isStreetNumber) {
          determineStreetNumber(formattedAddress);
        }
        return getLatLng(results[0]);
      })
      .then(({ lat, lng }) => {
        if (!(lat >= 37.2 && lat <= 47.6) || !(lng >= -82.7 && lng <= -66.1)) {
          setErrorMessage("ZERO_RESULTS");
        } else {
          dispatch({ type: "setLatLng", lat, lng });
          hideVirtualKeyboard();
        }
      })
      .catch(error => console.error("Error", error));
  };

  // Returns error if address is not valid
  const handleError = async (status, clearSuggestions) => {
    // console.log("Error from Google Maps API", status);
    setErrorMessage(status);
    clearSuggestions();
  };

  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <Link
          to="/"
          variant="button"
          style={{ padding: 8 }}
          onClick={() => dispatch({ type: "reset" })}
        >
          <FontAwesomeIcon icon="chevron-left" size="lg" />
        </Link>

        <Typography
          component="h1"
          variant="subtitle1"
          align="center"
          style={{ marginLeft: -31 }}
        >
          Create Location - <small>step(1/3)</small>
        </Typography>
      </header>
      <main className={classes.main}>
        <Typography variant="h6" align="center" gutterBottom>
          Enter Your Location
        </Typography>

        <br />
        <Typography variant="caption" align="justify" gutterBottom>
          Weather data is only available for Nassau County
        </Typography>

        <br />
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.isStreetNumber}
                onChange={() => dispatch({ type: "toggleStreetNumber" })}
              />
            }
            label="My street number follows the odd/even irrigation ordinance"
          />
        </FormGroup>
        <br />

        <PlacesAutocomplete
          value={state.address}
          onChange={handleAddressChange}
          onSelect={handleSelectAdress}
          shouldFetchSuggestions={state.address.length > 2}
          onError={handleError}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading
          }) => (
            <div>
              <form noValidate autoComplete="off">
                <TextField
                  autoComplete="off"
                  id="address"
                  label="Address"
                  placeholder="Type your address"
                  // helperText=""
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  SelectProps={{
                    native: true
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="delete address"
                          onClick={() => dispatch({ type: "reset" })}
                        >
                          <small>&#10005;</small>
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  {...getInputProps({ className: "location-search-input" })}
                />
              </form>
              <div
                className="autocomplete-dropdown-container"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  padding: 0,
                  margin: 0,
                  marginTop: -24
                }}
              >
                {loading && (
                  <Typography variant="caption" align="center">
                    Loading...
                  </Typography>
                )}
                {!loading &&
                  state.address.length > 0 &&
                  errorMessage === "ZERO_RESULTS" && (
                    <Typography variant="caption" align="center" color="error">
                      Address is not valid
                    </Typography>
                  )}

                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? {
                        backgroundColor: theme.palette.primary.light,
                        borderRadius: 4,
                        color: "#ffffff",
                        padding: theme.spacing(2),
                        cursor: "pointer"
                      }
                    : {
                        backgroundColor: theme.palette.background.default,
                        padding: theme.spacing(2),
                        cursor: "pointer"
                      };
                  return (
                    <div {...getSuggestionItemProps(suggestion)}>
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style
                        })}
                      >
                        <Typography variant="caption" color="inherit">
                          {suggestion.description}
                        </Typography>
                      </div>
                      <Divider />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </main>

      {/* FOOTER */}
      {errorMessage.length === 0 && state.lat && (
        <footer className={classes.footer}>
          <ButtonGLink
            to="/irrigationDate"
            state={{ ...state }}
            variant="contained"
            fullWidth
            classes={{ root: classes.btnBig }}
          >
            Continue
          </ButtonGLink>
        </footer>
      )}
    </div>
  );
}

export default FieldLocationPage;
