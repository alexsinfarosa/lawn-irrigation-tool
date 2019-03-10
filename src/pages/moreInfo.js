import React from "react";
import { makeStyles, useTheme } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Link from "../components/Link";
const useStyles = makeStyles(theme => ({
  root: {
    display: "grid",
    height: "100vh",
    gridTemplateRows: "auto 1fr auto"
  },
  header: {
    display: "grid",
    gridTemplateColumns: "auto 1fr auto",
    alignItems: "center",
    padding: theme.spacing(2)
  },
  main: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2, 4)
  }
}));

const MoreInfo = () => {
  console.log("MoreInfoPage");
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <Link to="/main" variant="button" style={{ padding: 8 }}>
          <FontAwesomeIcon icon="chevron-left" size="lg" />
        </Link>

        <Typography
          variant="subtitle1"
          align="center"
          style={{ marginLeft: -31 }}
        >
          More Info
        </Typography>
      </header>

      <main className={classes.main}>
        <Typography paragraph gutterBottom>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi
          laboriosam deserunt dolorem tenetur fugiat! Quae doloribus dignissimos
          aperiam saepe aliquid ipsa sit officiis quasi dicta! Totam eum nemo
          numquam laboriosam.
        </Typography>

        <Typography paragraph gutterBottom>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi
          laboriosam deserunt dolorem tenetur fugiat! Quae doloribus dignissimos
          aperiam saepe aliquid ipsa sit officiis quasi dicta! Totam eum nemo
          numquam laboriosam.
        </Typography>

        <Typography paragraph gutterBottom>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi
          laboriosam deserunt dolorem tenetur fugiat! Quae doloribus dignissimos
          aperiam saepe aliquid ipsa sit officiis quasi dicta! Totam eum nemo
          numquam laboriosam.
        </Typography>
      </main>
    </div>
  );
};

export default MoreInfo;
