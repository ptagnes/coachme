import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Exercise from "./Exercise";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      overflow: "hidden",
    },
  })
);

const Exercises = (props: any) => {
  const { data } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Fab color="primary" aria-label="add">
        <Link to={`/addexercise`} style={{ color: "#fff", lineHeight: 1 }}>
          <AddIcon />
        </Link>
      </Fab>
      {data && data.length ? (
        data.map((prop: any, key: number) => (
          <Exercise
            key={key}
            title={prop.title}
            image={prop.image}
            id={prop.id}
          />
        ))
      ) : (
        <div
          style={{ margin: "auto", display: "flex", justifyContent: "center" }}
        >
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default Exercises;
