import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import CssBaseline from "@material-ui/core/CssBaseline"
import { ThemeProvider } from "@material-ui/styles"
import theme from "../../src/theme"

import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"

import { AppProvider } from "../../src/appContext"

export default function TopLayout(props) {
  return (
    <React.Fragment>
      <Helmet>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <AppProvider>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            {props.children}
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </AppProvider>
    </React.Fragment>
  )
}

TopLayout.propTypes = {
  children: PropTypes.node,
}
