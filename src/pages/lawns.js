import React from "react"
import { navigate } from "@reach/router"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

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

const Primary = ({ address }) => {
  return <Typography variant="subtitle1">{address}</Typography>
}

const Secondary = ({ type, rate, time }) => {
  return (
    <Box display="flex" flexDirection="column" ml={1}>
      <Typography variant="caption" color="textSecondary">
        Type: {type}
      </Typography>

      <Typography variant="caption" color="textSecondary">
        Time: {time} min
      </Typography>

      <Typography variant="caption" color="textSecondary">
        Rate: {rate} in/hr
      </Typography>
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
    dispatchLawn,
    updateLawns,
  } = React.useContext(AppContext)

  // STATE ----------------------------------------------
  const [state, dispatch] = React.useReducer(reducer, {})
  const [isDeleteDialog, setIsDeleteDialog] = React.useState(false)
  const [isEdit, setIsEdit] = React.useState(false)

  // Loading --------------------------------------------
  if (loading) return <Loading />

  return (
    <Layout>
      <SEO title="Lawns Page" />
      <MainContainer>
        <CompaniesLogos />
        {/* TOP BUTTONS */}
        <Box mb={4} display="flex" justifyContent="space-around">
          <Link to="/location">
            <Fab
              color="primary"
              aria-label="Add Lawn"
              style={{ marginRight: 16 }}
            >
              <FontAwesomeIcon icon="plus" size="lg" color="#fff" />
            </Fab>
          </Link>
          <FormControlLabel
            control={
              <Switch
                checked={isEdit}
                onChange={e => setIsEdit(e.target.checked)}
              />
            }
            label="Edit Lawn Parameters"
          />
        </Box>

        {lawns.map(lawn => {
          return (
            <ExpansionPanel
              key={lawn.id}
              expanded={state.id === lawn.id}
              onChange={() => {
                if (!isEdit) {
                  dispatchLawn({ type: "setLawn", lawn })
                  navigate("/lawn")
                }
              }}
              elevation={0}
            >
              <ExpansionPanelSummary
                expandIcon={isEdit && <ExpandMoreIcon />}
                aria-controls={`${lawn.address}-panel-content`}
                id={`${lawn.address}-panel-header`}
                onClick={() => dispatch({ type: "setLawn", lawn })}
              >
                <ExpansionHeader lawn={lawn} theme={theme} />
              </ExpansionPanelSummary>
              {isEdit && (
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
                              dispatch({ type: "setMinutes", minutes })
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
                              dispatch({ type: "setRate", rate })
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
                          onClick={() => {
                            setIsDeleteDialog(true)
                          }}
                        >
                          DELETE
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => {
                            setIsEdit(false)
                            dispatchLawn({ type: "setLawn", lawn: state })
                            updateLawns(state)
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
          open={isDeleteDialog}
          onClose={() => setIsDeleteDialog(false)}
          aria-labelledby="alert-dialog-delete-lawn"
          aria-describedby="alert-dialog-delete-selected-lawn"
        >
          <DialogTitle id="alert-delete-dialog-title">
            Are you sure you want to delete it?
          </DialogTitle>

          <DialogActions>
            <Button onClick={() => setIsDeleteDialog(false)} color="secondary">
              Undo
            </Button>
            <Button
              onClick={() => {
                deleteLawn(state.id)
                setIsDeleteDialog(false)
                setIsEdit(false)
                dispatch({ type: "reset" })
              }}
              color="secondary"
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </MainContainer>
    </Layout>
  )
}

const ExpansionHeader = ({ lawn, theme }) => {
  return (
    <Box display="flex" flexDirection="column">
      <Primary address={lawn.address} />

      <Box display="flex" mt={1} alignItems="center">
        <FontAwesomeIcon
          icon="tint"
          color={theme.palette.deficit.color}
          size="2x"
          style={{ marginRight: 16 }}
        />
        <Secondary
          type={lawn.sprinklerType}
          rate={lawn.sprinklerRate}
          time={lawn.sprinklerMinutes}
        />
      </Box>
    </Box>
  )
}

export default LawnsPage
