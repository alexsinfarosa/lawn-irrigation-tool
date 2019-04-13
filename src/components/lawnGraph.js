import React from "react"

import { useTheme } from "@material-ui/styles"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"

// CONTEXT --------------------------
import AppContext from "../appContext"

// API -------------------------------
import { mainFunction } from "../utils/api"

export default function LawnGraph() {
  const theme = useTheme()

  // CONTEXT ---------------------------------
  const { lawn } = React.useContext(AppContext)

  const results = mainFunction(lawn)
  console.log(results)
  const todayFromResults = results[results.length - 3]

  return (
    <Box height="100%">
      {/* MESSAGE */}
      <Box
        height="70px"
        bgcolor={
          todayFromResults.shouldWater
            ? theme.palette.background.deficit
            : theme.palette.background.noDeficit
        }
        display="flex"
        justifyContent="center"
        alignItems="center"
        color="white"
        mb={3}
      >
        <Typography variant="h5">
          {todayFromResults.shouldWater ? "Water!" : "Do Not Water!"}
        </Typography>
      </Box>

      {/* ADRESS */}
      <Box textAlign="center" mb={3}>
        <Typography>{lawn.address}</Typography>
      </Box>

      {/* GRAPH */}
      <Box>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque
          placeat qui velit odio neque ducimus, commodi tempora, nam blanditiis
          saepe consectetur maxime laudantium, doloribus illo minus omnis
          sapiente id eaque?
        </p>
      </Box>
    </Box>
  )
}
