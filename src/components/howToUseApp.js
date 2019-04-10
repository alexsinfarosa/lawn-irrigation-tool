import React from "react"

// import { makeStyles } from "@material-ui/styles"
import Typography from "@material-ui/core/Typography"
// import Box from "@material-ui/core/Box"

// const useStyles = makeStyles(theme => ({}))

export default function HowToUseApp() {
  // const classes = useStyles()
  return (
    <>
      <Typography variant="h6" color="secondary" gutterBottom>
        Top Bar
      </Typography>
      <Typography paragraph align="justify">
        At the top of the application there is a colored bar, which displays the
        recommendation messages. The messages within this bar should be used to
        determine whether or not to water the lawn.
      </Typography>

      <Typography variant="h6" color="secondary" gutterBottom>
        Address
      </Typography>
      <Typography paragraph align="justify">
        This is the address provided by the user. It is required to obtain
        weather related data. On the right side of the address there is a
        question mark icon. Tapping this icon will trigger the current pop-up
        on/off.
      </Typography>

      <Typography variant="h6" color="secondary" gutterBottom>
        Graph
      </Typography>
      <Typography paragraph align="justify">
        The left part of the graph shows the dates. The first two dates from the
        top are forecast dates, the colored date, which can be orange or blue,
        depending on the deficit status, is the current date. Going down we have
        dates in the past which go back a full week.
      </Typography>

      <Typography paragraph align="justify">
        The center part of the graph contains the colored bars. A single bar
        represents the water deficit of a given day, it can be orange or blue.
        An orange bar is displayed when there is water deficit, hence the lawn
        is dry.
        <br />A blue bar is displayed when there is no deficit, the lawn is wet.
        The length of the bar gives the user a guidance on the relative amount
        of dryiness or wettness the lawn is.
      </Typography>

      <Typography paragraph align="justify">
        The right part of the graph containing the icons is the area where the
        user interacts with the app. The first two forecast icons from the top
        are not clickable and are there to inform the user of the probability of
        precipitation.
      </Typography>

      <Typography paragraph align="justify">
        The drop shaped icons can be tapped by the user. Tapping the icon, will
        changes its color. Blue color indicates that the lawn has been watered.
        Untapping the icon, which makes it gray indicates that no water was
        applied on the lawn.
      </Typography>

      <Typography variant="h6" color="secondary" gutterBottom>
        Example
      </Typography>

      <Typography paragraph align="justify">
        When water deficit reaches a certain level, the top colored bar (in this
        case orange) will inform the user to water their lawn. The user at this
        point should follow the app’s recommendation by watering their lawn and
        by tapping the drop icon relative to the current date.
      </Typography>

      <Typography paragraph align="justify">
        In doing so, the user informs the app that the recommendation has been
        followed and consequently the newly added water will be used to
        recalculate the deficit.
      </Typography>

      <Typography paragraph align="justify">
        Tapping on any of the drop icons simply adds or removes water. The
        amount of water is calculated by the rate of the sprinkler head and the
        amount of time, in minutes that it runs.
      </Typography>
    </>
  )
}
