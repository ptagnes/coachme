import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Directory from "./Directory_nu";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function Workouts() {
  const classes = useStyles();

  return (
    <div className="bp">
      <h2>Workouts</h2>
      <Grid className={classes.root} container spacing={3}>
        <Directory />
      </Grid>
    </div>
  );
}
