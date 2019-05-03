import React from "react"

import { makeStyles, useTheme } from "@material-ui/styles"
import GridList from "@material-ui/core/GridList"
import GridListTile from "@material-ui/core/GridListTile"
import GridListTileBar from "@material-ui/core/GridListTileBar"
import IconButton from "@material-ui/core/IconButton"
import Checkbox from "@material-ui/core/Checkbox"
import Typography from "@material-ui/core/Typography"
import FormGroup from "@material-ui/core/FormGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogTitle from "@material-ui/core/DialogTitle"
import Box from "@material-ui/core/Box"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Header from "../components/header"

import { GridContainer } from "../components/styled/sharedComponents"
import { StyledButton } from "../components/styled/sharedComponents"

import ImageSprinkler from "../components/imgSprinkler"

// SPRINKER IMAGES------------------------
import FixedSpray from "../images/fixedSpray-spr.png"
import KcRotor from "../images/kcRotor-spr.png"
import RotaryNozzle from "../images/rotaryNozzle-spr.png"
import ManualNozzle from "../images/manual-nozzle-spr.png"

// SLIDER ---------------------------------
import Slider from "rc-slider"
import "rc-slider/assets/index.css"

// CONTEXT -------------------------------
import AppContext from "../appContext"

// SPRINKLERS -----------------------------
const sprinklers = [
  {
    name: "Fixed Spray Nozzle",
    img: FixedSpray,
    rate: 1.5, // in/hr
    minutes: 19,
    isSelected: false,
  },
  {
    name: "Rotor Nozzle",
    img: KcRotor,
    rate: 0.75, // in/hr
    minutes: 28,
    isSelected: false,
  },
  {
    name: "Hi Efficiency Nozzle",
    img: RotaryNozzle,
    rate: 0.5, // in/hr
    minutes: 40,
    isSelected: false,
  },
  {
    name: "Manual Nozzle",
    img: ManualNozzle,
    rate: 1, // in/hr
    minutes: 24,
    isSelected: false,
  },
]

// Initial state ---------------------------
const initialState = sprinklers[0]

// REDUCER ---------------------------------
function reducer(state, action) {
  switch (action.type) {
    case "setSprinkler":
      return {
        name: action.name,
        img: action.img,
        rate: action.rate,
        minutes: action.minutes,
        isSelected: action.isSelected,
      }
    case "setName":
      return { ...state, img: null, name: action.name }
    case "setMinutes":
      return { ...state, minutes: action.minutes }
    case "setRate":
      return { ...state, rate: action.rate }
    case "setIsSelected":
      return { ...state, isSelected: !state.isSelected }
    case "reset":
      return initialState
    default:
      throw new Error()
  }
}

const useStyles = makeStyles(theme => ({
  gridList: {
    flexWrap: "nowrap",
    width: "100%",
    height: 280,
    overflowY: "hidden",
  },
}))

const SprinklerPage = () => {
  const {
    globalDispatch,
    lawn,
    addLawn,
    hasDataAndForecast,
    countRef,
  } = React.useContext(AppContext)
  const classes = useStyles()
  const theme = useTheme()

  const sliderStyles = {
    borderColor: theme.palette.primary.main,
    height: 28,
    width: 28,
    marginLeft: -14,
    marginTop: -12,
    backgroundColor: theme.palette.primary.main,
  }

  // State --------------------------------------------
  const [state, localDispatch] = React.useReducer(reducer, initialState)
  const [isCustom, setIsCustom] = React.useState(false)
  const [showDialog, setShowDialog] = React.useState(false)


  const hasAllRequiredFields = lawn.lat !== null && state.rate !== 0 && state.minutes !== 0
console.log(lawn.lat !== null && state.rate !== 0 && state.minutes !== 0)
  return (
    <Layout>
      <SEO title="Location" />

      <GridContainer>
        <Header icon="chevron-left" title="Sprinkler Type - (step 3/3)" />

        {/* Text */}
        <Box my={2}>
          <Box
            mb={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            {/* <Typography variant="h6">Type: {state.name}</Typography> */}
            <Typography variant="h6">
              Select the sprinkler head that most closely matches yours
            </Typography>
            <Typography variant="caption">
              if you have different types of sprinkler heads, choose the most
              common type
            </Typography>
          </Box>

          {/* Images */}
          <Box display="flex" mx={-2} mb={2}>
            <GridList className={classes.gridList} cols={1.3}>
              {sprinklers.map(sprinkler => {
                const { name, img, isSelected } = sprinkler
                return (
                  <GridListTile key={name} style={{ height: 280 }}>
                    <ImageSprinkler src={img} />
                    <GridListTileBar
                      title={name}
                      actionIcon={
                        <IconButton>
                          <Checkbox
                            checked={state.name === name}
                            onChange={() => {
                              localDispatch({
                                type: "setSprinkler",
                                ...sprinkler,
                                isSelected: !isSelected,
                              })
                              setIsCustom(false)
                            }}
                            value={name}
                            style={{ color: "#fff" }}
                          />
                        </IconButton>
                      }
                    />
                  </GridListTile>
                )
              })}
            </GridList>
          </Box>

          <Box mt={4} mb={6} border={1} px={1} borderRadius={8}>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isCustom}
                    color="primary"
                    onChange={() => {
                      setIsCustom(!isCustom)
                      localDispatch({ type: "setMinutes", minutes: 0 })
                      localDispatch({ type: "setRate", rate: 0 })
                      isCustom
                        ? localDispatch({
                            type: "setSprinkler",
                            ...sprinklers[0],
                          })
                        : localDispatch({
                            type: "setName",
                            name: "Custom Sprinkler Nozzle",
                          })
                    }}
                  />
                }
                label="Customize Application Duration and Rate"
              />
            </FormGroup>
          </Box>

          {/* Minutes Slider */}
          <Box
            mb={6}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box flexGrow={1}>
              <Typography variant="subtitle2">Select </Typography>
              <Typography variant="subtitle2">Duration: </Typography>
            </Box>
            <Box flexGrow={6}>
              <Slider
                min={0}
                step={1}
                max={90}
                value={state.minutes}
                onChange={minutes =>
                  localDispatch({ type: "setMinutes", minutes })
                }
                trackStyle={{ backgroundColor: theme.palette.primary.main }}
                handleStyle={sliderStyles}
              />
            </Box>
            <Box flexGrow={1}>
              <Typography variant="subtitle2" color="secondary" align="right">
                {state.minutes} <small>min</small>
              </Typography>
            </Box>
          </Box>

          {/* Rate Slider */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box flexGrow={1}>
              <Typography variant="subtitle2">
                {isCustom ? "Select" : "Default"}
              </Typography>
              <Typography variant="subtitle2">Rate: </Typography>
            </Box>

            <Box flexGrow={6}>
              <Slider
                disabled={isCustom ? false : true}
                min={0}
                step={0.1}
                max={2}
                value={state.rate}
                onChange={rate => localDispatch({ type: "setRate", rate })}
                trackStyle={{ backgroundColor: theme.palette.primary.main }}
                handleStyle={sliderStyles}
              />
            </Box>
            <Box flexGrow={1}>
              <Typography variant="subtitle2" color="secondary" align="right">
                {state.rate.toFixed(1)} <small>in/hr</small>
              </Typography>
            </Box>
          </Box>
        </Box>

        <StyledButton
          to={
            countRef === 0 && state.rate !== 0 && state.minutes !== 0
              ? "/info/"
              : hasDataAndForecast && hasAllRequiredFields
              ? "/lawn/"
              : "/sprinkler/"
          }
          disabled={hasDataAndForecast ? false : true}
          onClick={() => {
            if (hasAllRequiredFields) {
              const now = Date.now()
              const updatedLawn = {
                ...lawn,
                sprinklerType: state.name,
                sprinklerRate: state.rate,
                sprinklerMinutes: state.minutes,
                id: now,
                updated: now,
              }
              globalDispatch({ type: "setSprinkler", id: now, ...state })
              addLawn(updatedLawn)
            } else {
              setShowDialog(true)
            }
          }}
        >
          Create Entry
        </StyledButton>
      </GridContainer>

      <Dialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        aria-labelledby="alert-dialog-select-rate"
        aria-describedby="alert-dialog-select-rate"
      >
        <DialogTitle id="alert-select-rate">
          <Typography variant="subtitle1" component="p">
            Custom Duration or Custom Rate cannot be zero.
            <br />
            Please use sliders to modify their values.
          </Typography>
        </DialogTitle>

        <DialogActions>
          <Button onClick={() => setShowDialog(false)} color="secondary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  )
}

export default SprinklerPage
