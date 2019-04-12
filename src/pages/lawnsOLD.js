import React from "react"
import { navigate } from "@reach/router"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Navigation from "../components/navigation"

import { MainContainer } from "../components/styled/sharedComponents"
import CompaniesLogos from "../components/companiesLogos"

import { useTheme } from "@material-ui/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import Fab from "@material-ui/core/Fab"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import IconButton from "@material-ui/core/IconButton"
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
    default:
      throw new Error()
  }
}

const Primary = ({ address }) => {
  return <Typography variant="body1">{address}</Typography>
}

const Secondary = ({ type, rate, time }) => {
  return (
    <>
      <Typography variant="caption" color="textSecondary">
        Type: {type}
      </Typography>
      <br />
      <Typography variant="caption" color="textSecondary">
        Rate: {rate} in/hr
      </Typography>
      <br />
      <Typography variant="caption" color="textSecondary">
        Time: {time} min
      </Typography>
    </>
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
  const { loading, lawns, deleteLawn, dispatchLawn } = React.useContext(
    AppContext
  )

  // STATE ----------------------------------------------
  const [state, dispatch] = React.useReducer(reducer, {})
  const [isDeleteDialog, setIsDeleteDialog] = React.useState(false)
  const [isEditDialog, setIsEditDialog] = React.useState(false)
  const [lawnId, setLawnId] = React.useState(0)
  console.log(state)
  // Loading --------------------------------------------
  if (loading) return <Loading />

  return (
    <Layout>
      <SEO title="Lawns Page" />
      <MainContainer>
        <CompaniesLogos />

        <Box textAlign="center" mb={2}>
          <Link to="/location">
            <Fab color="primary" aria-label="Add Lawn">
              <FontAwesomeIcon icon="plus" size="lg" color="#fff" />
            </Fab>
          </Link>
        </Box>

        <List component="nav">
          {lawns.map(lawn => {
            return (
              <div key={lawn.id}>
                <ListItem
                  button
                  onClick={() => {
                    dispatchLawn({ type: "setLawn", lawn })
                    navigate("/lawn")
                  }}
                  style={{ borderRadius: 8 }}
                >
                  <FontAwesomeIcon
                    icon="tint"
                    color={theme.palette.deficit.color}
                    size="2x"
                  />
                  <ListItemText
                    primary={<Primary address={lawn.address} />}
                    secondary={
                      <Secondary
                        type={lawn.sprinklerType}
                        rate={lawn.sprinklerRate}
                        time={lawn.sprinklerMinutes}
                      />
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      aria-label="delete lawn"
                      onClick={() => {
                        setLawnId(lawn.id)
                        setIsDeleteDialog(true)
                      }}
                      style={{ padding: 24 }}
                    >
                      <FontAwesomeIcon
                        icon={["fa", "trash"]}
                        size="sm"
                        color={theme.palette.grey[600]}
                      />
                    </IconButton>

                    <IconButton
                      aria-label="edit lawn"
                      onClick={() => {
                        dispatch({ type: "setLawn", lawn })
                        setIsEditDialog(true)
                      }}
                      style={{ padding: 24, paddingLeft: 32, paddingRight: 32 }}
                    >
                      <FontAwesomeIcon
                        icon={["fa", "ellipsis-v"]}
                        size="sm"
                        color={theme.palette.grey[600]}
                      />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider variant="inset" />

                {/* EDIT DIALOG -----------------------------*/}
                {isEditDialog && (
                  <Dialog
                    open={isEditDialog}
                    onClose={() => setIsEditDialog(false)}
                    aria-labelledby="alert-dialog-edit-lawn"
                    aria-describedby="edit lawn parameters"
                  >
                    <DialogTitle id="alert-edit-dialog-title">
                      <Typography variant="h6">
                        Modify Sprinkler Parameters
                      </Typography>
                      {/* HACK! */}
                      <Box color="white">123456789101112131415161718</Box>
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        {/* Minutes Slider */}
                        <Box
                          mb={1}
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
                        <Box
                          mt={8}
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Box flexGrow={1}>
                            <Typography variant="h6">Rate: </Typography>
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
                              {state.sprinklerRate.toFixed(2)}{" "}
                              <small>in/hr</small>
                            </Typography>
                          </Box>
                        </Box>
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions style={{ marginTop: 24 }}>
                      <Button
                        onClick={() => setIsEditDialog(false)}
                        color="primary"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => setIsEditDialog(false)}
                        color="primary"
                        autoFocus
                      >
                        Save
                      </Button>
                    </DialogActions>
                  </Dialog>
                )}

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
                    <Button
                      onClick={() => setIsDeleteDialog(false)}
                      color="secondary"
                    >
                      Undo
                    </Button>
                    <Button
                      onClick={() => {
                        deleteLawn(lawnId)
                        setIsDeleteDialog(false)
                      }}
                      color="secondary"
                      autoFocus
                    >
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            )
          })}
        </List>
      </MainContainer>

      <Box mx={-2}>
        <Navigation />
      </Box>
    </Layout>
  )
}

export default LawnsPage
