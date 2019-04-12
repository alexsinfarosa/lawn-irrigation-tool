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
import DialogTitle from "@material-ui/core/DialogTitle"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import IconButton from "@material-ui/core/IconButton"
import Box from "@material-ui/core/Box"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import AppContext from "../appContext"

const Primary = ({ address }) => {
  return <Typography variant="body1">{address}</Typography>
}

const Secondary = ({ rate, time }) => {
  return (
    <>
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
  const { lawns, deleteLawn } = React.useContext(AppContext)
  const [lawnId, setLawnId] = React.useState(0)

  // STATE ----------------------------------------------
  const [isDialog, setIsDialog] = React.useState(false)

  return (
    <Layout>
      <SEO title="Lawns Page" />
      <MainContainer>
        <CompaniesLogos />

        <Link to="/location">
          <Box textAlign="center" mb={2}>
            <Fab color="primary" aria-label="Add Lawn">
              <FontAwesomeIcon icon="plus" size="lg" color="#fff" />
            </Fab>
          </Box>
        </Link>

        <List component="nav">
          {lawns.map(lawn => {
            console.log(lawn)
            return (
              <div key={lawn.id}>
                <ListItem
                  button
                  onClick={() => navigate("/lawn")}
                  style={{ borderRadius: 8 }}
                >
                  <FontAwesomeIcon
                    icon="tint"
                    color={theme.deficit.color}
                    size="2x"
                  />
                  <ListItemText
                    primary={<Primary address={lawn.address} />}
                    secondary={
                      <Secondary
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
                        setIsDialog(true)
                      }}
                      style={{ padding: 24 }}
                    >
                      <FontAwesomeIcon
                        icon={["fa", "trash"]}
                        size="sm"
                        color={theme.palette.grey[600]}
                      />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider variant="inset" />
              </div>
            )
          })}
        </List>

        {/* DIALOG -----------------------------*/}
        <Dialog
          open={isDialog}
          onClose={() => setIsDialog(false)}
          aria-labelledby="alert-dialog-delete-lawn"
          aria-describedby="alert-dialog-delete-selected-lawn"
        >
          <DialogTitle id="alert-dialog-title">
            <Typography variant="body2">
              Are you sure you want to delete it?
            </Typography>
          </DialogTitle>

          <DialogActions>
            <Button onClick={() => setIsDialog(false)} color="secondary">
              Undo
            </Button>
            <Button
              onClick={() => {
                deleteLawn(lawnId)
                setIsDialog(false)
              }}
              color="secondary"
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </MainContainer>

      <Box mx={-2}>
        <Navigation />
      </Box>
    </Layout>
  )
}

export default LawnsPage
