import React from "react";
import Exercise from "../Exercises/Exercise";
import Typography from "@material-ui/core/Typography";
import { selectCollection } from "../../redux/selectors/workoutSelectors";
import { connect } from "react-redux";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { paddingTop: "3.7rem" },
    fixedDiv: {
      position: "fixed",
      width: "100%",
      height: "30vh",
      background: "black",
      left: "0",
      top: "59px",
      zIndex: 0,
      opacity: "0.1",
    },
    imageStyle: {
      flexDirection: "column",
      height: "30vh",
      backgroundSize: "cover",
    },
    textOnTop: {
      position: "relative",
      zIndex: 1,
      padding: "1rem",
    },
  })
);

function WorkoutDetails(props: any) {
  //{ workoutItem, ...otherProps }: { workoutItem: any }
  console.log("props");
  console.log(props);
  const classes = useStyles();
  const { exerciseitems, imageUrl, setsReps } = props.collection;
  let history = useHistory();
  const handleClick = () => {
    history.goBack();
  };
  let workout: any;
  if (props.workoutItem) {
    workout = props.workoutItem;
  } else {
    workout = props.collection;
  }

  return (
    <div className={classes.root}>
      <div
        className={classes.imageStyle}
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/${imageUrl})`,
        }}
      >
        <div className={classes.fixedDiv}></div>
        <div className={classes.textOnTop}>
          <Button
            style={{ marginRight: "10px", paddingLeft: "0", color: "#fff" }}
            color="primary"
            onClick={handleClick}
          >
            <ArrowBackIcon />
          </Button>
          <Typography variant="h6">{workout.title}</Typography>
          <Chip label="60 minutes" /> <Chip label="8 exercises" />
          <Typography variant="body1"></Typography>
        </div>
      </div>

      <div className="bp">
        <Typography variant="h6">Exercise list</Typography>
        {props.collection.items &&
          props.collection.items.map((item: any) => (
            <Exercise
              key={item.id}
              id={item.id}
              title={item.name}
              fileUrl={item.imageUrl}
              setsReps={item.setsReps}
            />
          ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state: any, ownProps: any) => ({
  collection: selectCollection(ownProps.match.params.route)(state),
  route: ownProps.match.params.route,
  itemKey: ownProps.match.params.id,
  items: state.workoutState.collections[ownProps.match.params.route].items,
  workoutItem: state.workoutState.collections[
    ownProps.match.params.route
  ].items.find((x: any) => x.id === parseInt(ownProps.match.params.id)),
});

export default connect(mapStateToProps)(WorkoutDetails);
