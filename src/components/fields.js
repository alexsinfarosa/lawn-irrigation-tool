import React from "react";

import { makeStyles, useTheme } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "../components/Link";

// utils ------------
import format from "date-fns/format";

const useStyles = makeStyles(theme => ({
  root: {
    display: "grid",
    gridTemplateRows: "80px auto",
    height: "100vh"
  },
  header: {
    display: "grid",
    gridTemplateColumns: "auto 1fr auto",
    alignItems: "center",
    justifyItems: "center",
    padding: theme.spacing(0, 4),
    background: theme.palette.background.default
  },
  main: {
    overflow: "auto",
    height: "calc(100vh - 80px)"
  },
  paper: {
    margin: theme.spacing(2, 4),
    marginBottom: theme.spacing(3)
  }
}));

const Fields = ({ handleMainPageIdx, fields, runModel }) => {
  console.log("Fields");
  const classes = useStyles();
  const theme = useTheme();

  const [isDialog, setIsDialog] = React.useState(false);

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
        {fields.map(field => {
          return (
            <Paper
              key={field.irrigationDate}
              className={classes.paper}
              elevation={1}
            >
              <List component="nav" style={{ paddingTop: 22 }}>
                <ListItem
                  button
                  onClick={() => {
                    runModel(field);
                    handleMainPageIdx(1);
                  }}
                >
                  <div style={{ marginLeft: -32 }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      style={{ width: 75 }}
                    >
                      water!
                    </Button>
                  </div>

                  <ListItemText
                    primary={field.address}
                    secondary={format(
                      new Date(field.irrigationDate),
                      "MMMM dd, yyyy"
                    )}
                  />

                  <ListItemSecondaryAction>
                    <IconButton
                      aria-label="Delete"
                      onClick={() => setIsDialog(true)}
                    >
                      <FontAwesomeIcon icon="trash" size="xs" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </Paper>
          );
        })}
      </main>

      {/* DIALOG -----------------------------*/}
      <Dialog
        open={isDialog}
        onClose={() => setIsDialog(false)}
        aria-labelledby="alert-dialog-delete-lawn"
        aria-describedby="alert-dialog-delete-selected-lawn"
        // hideBackdrop={true}
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
              // deleteField(fieldId);
              setIsDialog(false);
            }}
            color="secondary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default React.memo(Fields);
