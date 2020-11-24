import React from "react";
import { AuthContext } from "../../firebase/Authentication";
import useStyles from "./theme.dashboard";
import Calendar from "../Calendar/index";

function WorkoutTracker(props: any) {
  const classes = useStyles();

  return (
    <AuthContext.Consumer>
      {(authUser: any) =>
        authUser ? (
          <div className={classes.root}>
            <Calendar firebase={props.firebase} authUser={authUser} />
          </div>
        ) : (
          <p>Not authorized.</p>
        )
      }
    </AuthContext.Consumer>
  );
}

export default WorkoutTracker;
