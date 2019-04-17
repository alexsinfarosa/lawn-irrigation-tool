import React from "react"
import { navigate } from "@reach/router"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Navigation from "../components/navigation"

import { MainContainer } from "../components/styled/sharedComponents"
import CompaniesLogos from "../components/companiesLogos"

import { useTheme } from "@material-ui/styles"
import Typography from "@material-ui/core/Typography"
import Fab from "@material-ui/core/Fab"
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogTitle from "@material-ui/core/DialogTitle"
import Button from "@material-ui/core/Button"
import Switch from "@material-ui/core/Switch"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Box from "@material-ui/core/Box"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Loading from "../components/loading"

// SLIDER ---------------------------------
import Slider from "rc-slider"
import "rc-slider/assets/index.css"

// API ------------------------------------
import { mainFunction } from "../utils/api"

import AppContext from "../appContext"

// REDUCER ---------------------------------
function reducer(state, action) {
  switch (action.type) {
    case "setMinutes":
      return { ...state, sprinklerMinutes: action.minutes }
    case "setRate":
      return { ...state, sprinklerRate: action.rate }
    case "setLawn":
      return { ...action.lawn }
    case "reset":
      return {}
    default:
      throw new Error()
  }
}

const Primary = ({ address, stateId, lawnId, theme, todayObj }) => {
  return (
    <Box display="flex" alignItems="center">
      <FontAwesomeIcon
        icon={["fa", "check"]}
        size="sm"
        color={
          stateId === lawnId
            ? todayObj.shouldWater
              ? theme.palette.background.deficit
              : theme.palette.background.noDeficit
            : "#fff"
        }
        style={{ marginRight: 5 }}
      />
      <Typography variant="subtitle1" color="inherit">
        {address}
      </Typography>
    </Box>
  )
}

const Secondary = ({ type, rate, time, unselected }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      ml={1}
      color={unselected ? "inherit" : "text.secondary"}
    >
      <Typography variant="caption">Type: {type}</Typography>
      <Typography variant="caption">Time: {time} min</Typography>
      <Typography variant="caption">Rate: {rate} in/hr</Typography>
    </Box>
  )
}

const LawnsPage = () => {
  const theme = useTheme()
  const sliderStyles = {
    borderColor: theme.palette.primary.main,
    height: 28,
    width: 28,
    marginLeft: -14,
    marginTop: -12,
    backgroundColor: theme.palette.primary.main,
  }

  // Context -------------------------------------------
  const {
    loading,
    lawns,
    deleteLawn,
    globalDispatch,
    updateLawn,
    lawn,
  } = React.useContext(AppContext)

  // STATE ----------------------------------------------
  const [state, localDispatch] = React.useReducer(reducer, lawn)
  const [showDialog, setShowDialog] = React.useState(false)
  const [editing, setEditing] = React.useState(false)
  const [expanded, setExpanded] = React.useState(false)

  const handleChange = panel => (event, isExpanded) => {
    const selectedLawn = lawns.find(l => l.id === panel)
    localDispatch({ type: "setLawn", lawn: selectedLawn })
    if (editing) {
      setExpanded(isExpanded ? panel : false)
    } else {
      globalDispatch({ type: "setLawn", lawn: selectedLawn })
      navigate("/lawn")
    }
  }
  // Loading --------------------------------------------
  if (loading) return <Loading />

  return (
    <Layout>
      <SEO title="Lawns Page" />
      <MainContainer>
        {/* LOGOS */}
        <CompaniesLogos />

        {/* TOP BUTTONS */}
        <Box
          mb={4}
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          minHeight="60px"
        >
          <Link to="/location">
            <Fab
              color="primary"
              aria-label="Add Lawn"
              style={{ marginRight: 16 }}
            >
              <FontAwesomeIcon icon="plus" size="lg" color="#fff" />
            </Fab>
          </Link>

          {lawn.id !== null && (
            <FormControlLabel
              control={
                <Switch
                  checked={editing}
                  onChange={e => {
                    if (!editing) {
                      setExpanded(state.id)
                    }
                    setEditing(e.target.checked)
                  }}
                />
              }
              label="Edit Lawn Parameters"
            />
          )}
        </Box>

        {lawns.map(lawn => {
          const unselected = editing && expanded !== lawn.id
          const results = mainFunction(lawn)
          const todayDate = new Date().toLocaleDateString()
          const todayObj = results.find(d => d.date === todayDate)

          return (
            <ExpansionPanel
              key={lawn.id}
              expanded={expanded === lawn.id}
              onChange={handleChange(lawn.id)}
              elevation={0}
            >
              <ExpansionPanelSummary
                expandIcon={
                  editing && (
                    <ExpandMoreIcon
                      style={{
                        color: unselected
                          ? theme.palette.grey[400]
                          : theme.palette.secondary.main,
                      }}
                    />
                  )
                }
                aria-controls={`${lawn.address}-panel-content`}
                id={`${lawn.address}-panel-header`}
              >
                <ExpansionHeader
                  lawn={lawn}
                  theme={theme}
                  unselected={unselected}
                  stateId={state.id}
                  todayObj={todayObj}
                />
              </ExpansionPanelSummary>
              {editing && (
                <ExpansionPanelDetails>
                  {Object.keys(state.lenght !== 0) && (
                    <Box width="100%">
                      <Box display="flex" alignItems="center" mb={4}>
                        <Box flexGrow={1}>
                          <Typography variant="subtitle1">Time: </Typography>
                        </Box>
                        <Box flexGrow={6}>
                          <Slider
                            min={0}
                            step={1}
                            max={120}
                            value={state.sprinklerMinutes}
                            onChange={minutes =>
                              localDispatch({ type: "setMinutes", minutes })
                            }
                            trackStyle={{
                              backgroundColor: theme.palette.primary.main,
                            }}
                            handleStyle={sliderStyles}
                          />
                        </Box>
                        <Box flexGrow={1}>
                          <Typography
                            variant="subtitle1"
                            color="secondary"
                            align="right"
                          >
                            {state.sprinklerMinutes} <small>min</small>
                          </Typography>
                        </Box>
                      </Box>

                      {/* Rate Slider */}
                      <Box display="flex" alignItems="center" mb={4}>
                        <Box flexGrow={1}>
                          <Typography variant="subtitle1">Rate: </Typography>
                        </Box>

                        <Box flexGrow={6}>
                          <Slider
                            disabled={
                              state.sprinklerType === "Custom" ? false : true
                            }
                            min={0}
                            step={0.05}
                            max={2}
                            value={state.sprinklerRate}
                            onChange={rate =>
                              localDispatch({ type: "setRate", rate })
                            }
                            trackStyle={{
                              backgroundColor: theme.palette.primary.main,
                            }}
                            handleStyle={sliderStyles}
                          />
                        </Box>
                        <Box flexGrow={1}>
                          <Typography
                            variant="subtitle1"
                            color="secondary"
                            align="right"
                          >
                            {state.sprinklerRate} <small>in/hr</small>
                          </Typography>
                        </Box>
                      </Box>

                      <Box display="flex" justifyContent="center">
                        <Button
                          variant="contained"
                          color="secondary"
                          style={{ marginRight: 32 }}
                          onClick={() => setShowDialog(true)}
                        >
                          DELETE
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => {
                            setEditing(false)
                            localDispatch({ type: "setLawn", lawn: state })
                            globalDispatch({ type: "setLawn", lawn: state })
                            updateLawn(state)
                          }}
                        >
                          UPDATE
                        </Button>
                      </Box>
                    </Box>
                  )}
                </ExpansionPanelDetails>
              )}
            </ExpansionPanel>
          )
        })}

        {/* DELETE DIALOG -----------------------------*/}
        <Dialog
          open={showDialog}
          onClose={() => setShowDialog(false)}
          aria-labelledby="alert-dialog-delete-lawn"
          aria-describedby="alert-dialog-delete-selected-lawn"
        >
          <DialogTitle id="alert-delete-dialog-title">
            Are you sure you want to delete it?
          </DialogTitle>

          <DialogActions>
            <Button onClick={() => setShowDialog(false)} color="secondary">
              Undo
            </Button>
            <Button
              onClick={() => {
                deleteLawn(state.id)
                setShowDialog(false)
                setEditing(false)
                localDispatch({ type: "reset" })
              }}
              color="secondary"
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </MainContainer>

      <Navigation />
    </Layout>
  )
}

const ExpansionHeader = ({ lawn, theme, unselected, stateId, todayObj }) => {
  return (
    <Box display="flex" flexDirection="column">
      <Primary
        address={lawn.address}
        stateId={stateId}
        lawnId={lawn.id}
        theme={theme}
        todayObj={todayObj}
      />

      <Box display="flex" mt={1} alignItems="center">
        <FontAwesomeIcon
          icon="tint"
          color={
            unselected
              ? theme.palette.grey[400]
              : todayObj.shouldWater
              ? theme.palette.background.deficit
              : theme.palette.background.noDeficit
          }
          size="2x"
          style={{ marginRight: 16 }}
        />
        <Secondary
          type={lawn.sprinklerType}
          rate={lawn.sprinklerRate}
          time={lawn.sprinklerMinutes}
          unselected={unselected}
        />
      </Box>
    </Box>
  )
}

export default LawnsPage
