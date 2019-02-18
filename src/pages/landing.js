import React from "react";

import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";

import Layout from "../components/layout";
import SEO from "../components/seo";

import ButtonGLink from "../components/ButtonGLink";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    padding: theme.spacing(2)
  },
  titleText: {
    color: theme.palette.text.secondary,
    fontWeight: "700",
    marginBottom: theme.spacing(6)
  }
}));

const LandingPage = () => {
  console.log("LandingPage");
  const classes = useStyles();

  return (
    <Layout>
      <SEO title="Landing Page" keywords={[`landing`]} />

      <div className={classes.root}>
        <div className={classes.titleText}>
          <Typography
            color="inherit"
            component="h1"
            variant="h4"
            align="left"
            gutterBottom
          >
            Lawn
          </Typography>
          <Typography
            color="inherit"
            component="h1"
            variant="h4"
            align="left"
            gutterBottom
          >
            Irrigation
          </Typography>

          <Typography
            color="inherit"
            component="h1"
            variant="h4"
            align="left"
            gutterBottom
          >
            Calculator
          </Typography>
        </div>

        <ButtonGLink
          to="/location"
          variant="outlined"
          color="secondary"
          size="large"
        >
          Get Started
        </ButtonGLink>
      </div>
    </Layout>
  );
};

export default LandingPage;
