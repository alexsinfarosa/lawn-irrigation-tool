import React from "react";

import { makeStyles, useTheme } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "../components/Link";

const useStyles = makeStyles(theme => ({
  root: {
    display: "grid",
    height: "100vh",
    gridTemplateRows: "auto 1fr"
  },
  header: {
    display: "grid",
    gridTemplateColumns: "auto 1fr auto",
    alignItems: "center",
    justifyItems: "center",
    padding: theme.spacing(4),
    background: theme.palette.background.default,
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 1000
  },
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: theme.spacing(2),
    paddingTop: theme.spacing(10)
  }
}));

const Fields = ({ handleMainPageIdx }) => {
  console.log("Fields");
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <FontAwesomeIcon
          icon="home"
          size="lg"
          onClick={() => handleMainPageIdx(1)}
        />
        <FontAwesomeIcon
          icon="grip-horizontal"
          size="lg"
          color={theme.palette.secondary.main}
        />
        <Link to="/location" variant="button" color="inherit">
          <FontAwesomeIcon icon="plus" size="lg" />
        </Link>
      </header>

      <main className={classes.main}>
        <Paper style={{ marginLeft: 10, marginBottom: 24 }} elevation={1}>
          <List component="nav" style={{ paddingTop: 22 }}>
            <ListItem button>
              <div style={{ marginLeft: -24 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  style={{ width: 75 }}
                >
                  water
                </Button>
              </div>

              <ListItemText
                primary={"114 Cayuga St."}
                secondary={"2018-08-09"}
              />

              <ListItemSecondaryAction>
                <IconButton aria-label="Delete">
                  <FontAwesomeIcon icon="trash" size="xs" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Paper>

        <Paper style={{ marginLeft: 10 }} elevation={1}>
          <List component="nav" style={{ paddingTop: 22 }}>
            <ListItem button>
              <div style={{ marginLeft: -24 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  style={{ width: 75 }}
                >
                  OK
                </Button>
              </div>

              <ListItemText
                primary={"698 Madison AV."}
                secondary={"2018-11-29"}
              />

              <ListItemSecondaryAction>
                <IconButton aria-label="Delete">
                  <FontAwesomeIcon icon="trash" size="xs" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Paper>
      </main>
    </div>
  );
};

export default React.memo(Fields);
