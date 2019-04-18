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
    height: 240,
    // background: "pink",
  },
}))

const SprinklerPage = () => {
  const {
    globalDispatch,
    lawn,
    addLawn,
    hasDataAndForecast,
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
          >
            <Typography variant="h6">Type: {state.name}</Typography>
          </Box>

          {/* Images */}
          <Box display="flex" mx={-2} height="230px" mb={6}>
            <GridList className={classes.gridList} cols={1.3}>
              {sprinklers.map(sprinkler => {
                const { name, img, isSelected } = sprinkler
                return (
                  <GridListTile key={name} style={{ height: 232 }}>
                    <ImageSprinkler src={img} />
                    <GridListTileBar
                      style={{ background: theme.palette.primary.main }}
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

          <Box my={4} border={1} px={1} borderRadius={8}>
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
                label="Custom Sprinkler Nozzle"
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
              <Typography variant="h6">Time: </Typography>
            </Box>
            <Box flexGrow={6}>
              <Slider
                min={0}
                step={1}
                max={120}
                value={state.minutes}
                onChange={minutes =>
                  localDispatch({ type: "setMinutes", minutes })
                }
                trackStyle={{ backgroundColor: theme.palette.primary.main }}
                handleStyle={sliderStyles}
              />
            </Box>
            <Box flexGrow={1}>
              <Typography variant="subtitle1" color="secondary" align="right">
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
              <Typography variant="h6">Rate: </Typography>
            </Box>

            <Box flexGrow={6}>
              <Slider
                disabled={isCustom ? false : true}
                min={0}
                step={0.05}
                max={2}
                value={state.rate}
                onChange={rate => localDispatch({ type: "setRate", rate })}
                trackStyle={{ backgroundColor: theme.palette.primary.main }}
                handleStyle={sliderStyles}
              />
            </Box>
            <Box flexGrow={1}>
              <Typography variant="subtitle1" color="secondary" align="right">
                {state.rate.toFixed(2)} <small>in/hr</small>
              </Typography>
            </Box>
          </Box>
        </Box>

        <StyledButton
          to={hasDataAndForecast ? "/lawn/" : "/sprinkler/"}
          disabled={hasDataAndForecast ? false : true}
          onClick={() => {
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
          }}
        >
          Create Entry
        </StyledButton>
      </GridContainer>
    </Layout>
  )
}

export default SprinklerPage
