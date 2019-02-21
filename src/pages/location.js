import React, { useState } from "react";

import { makeStyles, useTheme } from "@material-ui/styles";
import Link from "../components/Link";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";

import ButtonGLink from "../components/buttonGLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

function FieldLocationPage(props) {
  console.log("FieldLocationPage");
  const classes = useStyles();
  const theme = useTheme();

  // STATE --------------------------------------------------
  const [address, setAddress] = useState("");
  const [streetNumber, setStreetNumber] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddressChange = address => {
    setAddress(address);
    setErrorMessage("");
    setLatitude(null);
    setLongitude(null);
  };

  const determineStreetNumber = address => {
    const arr = address.split(" ");
    const streetNumber = +arr[0];
    if (!isNaN(streetNumber)) {
      // console.log("there is a street number!");
      setStreetNumber(streetNumber);
    }
  };

  const handleSelect = address => {
    setAddress(address);
    geocodeByAddress(address)
      .then(results => {
        const formattedAddress = results[0].formatted_address;
        determineStreetNumber(formattedAddress);
        return getLatLng(results[0]);
      })
      .then(({ lat, lng }) => {
        if (!(lat >= 37.2 && lat <= 47.6) || !(lng >= -82.7 && lng <= -66.1)) {
          setErrorMessage("ZERO_RESULTS");
        } else {
          setLatitude(lat);
          setLongitude(lng);
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

  // reset parameters
  const handleCloseClick = () => {
    console.log("fired!!!!");
    setAddress("");
    setLatitude(null);
    setLongitude(null);
    setErrorMessage("");
  };

  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <Link to="/" variant="button" style={{ padding: 8 }}>
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
          Note: Weather data are only available for Nassau County. We also
          consider the odd/even irrigation ordinance if an address number is
          provided.
        </Typography>

        <br />
        <PlacesAutocomplete
          value={address}
          onChange={handleAddressChange}
          onSelect={handleSelect}
          shouldFetchSuggestions={address.length > 2}
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
                  autocomplete="off"
                  id="address"
                  label="Address"
                  placeholder="Type your address"
                  // helperText=""
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="delete address"
                          onClick={handleCloseClick}
                        >
                          <small>&#10005;</small>
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  {...getInputProps()}
                />
              </form>
              <div
                className="autocomplete-dropdown-container"
                style={{ height: "100%", overflowY: "scroll" }}
              >
                {loading && (
                  <Typography
                    variant="caption"
                    align="center"
                    style={{ padding: theme.spacing(2) }}
                  >
                    Loading...
                  </Typography>
                )}
                {!loading &&
                  address.length > 0 &&
                  errorMessage === "ZERO_RESULTS" && (
                    <Typography
                      variant="caption"
                      align="center"
                      color="error"
                      style={{ padding: theme.spacing(2) }}
                    >
                      Address is not valid
                    </Typography>
                  )}
                <List component="nav">
                  {suggestions.map(suggestion => {
                    return (
                      <div {...getSuggestionItemProps(suggestion)}>
                        <ListItem
                          style={{
                            padding: theme.spacing(1.8, 0, 1.8, 1.8),
                            margin: 0,
                            background: theme.palette.background.default
                          }}
                        >
                          <ListItemText
                            primary={suggestion.formattedSuggestion.mainText}
                            secondary={
                              suggestion.formattedSuggestion.secondaryText
                            }
                          />
                        </ListItem>
                        <Divider />
                      </div>
                    );
                  })}
                </List>
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </main>

      {/* FOOTER */}
      {errorMessage.length === 0 && latitude && (
        <footer className={classes.footer}>
          <ButtonGLink
            to="/irrigationDate"
            state={{ address, streetNumber, latitude, longitude }}
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
