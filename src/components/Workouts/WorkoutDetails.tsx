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
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { paddingTop: "3.7rem" },
    fixedDiv: {
      position: "absolute",
      width: "100%",
      height: "30.1vh",
      background: "black",
      left: "0",
      top: "59px",
      zIndex: 0,
      opacity: "0.7",
    },
    imageStyle: {
      flexDirection: "column",
      height: "30vh",
      backgroundSize: "cover",
    },
    textOnTop: {
      position: "relative",
      zIndex: 1,
      padding: "0 1rem",
    },
    woAvatar: {
      margin: "0.3rem",
      backgroundColor: "#4b4d86",
    },
  })
);

function WorkoutDetails({ workoutItem, ...otherProps }: { workoutItem: any }) {
  const classes = useStyles();
  const { exerciseitems, imageUrl, category, level, equipment } = workoutItem;
  let history = useHistory();
  const handleClick = () => {
    history.goBack();
  };
  console.log("workoutItem");
  console.log(workoutItem);
  return (
    <div className={classes.root}>
      <div
        className={classes.imageStyle}
        style={{
          // backgroundImage: `url(${process.env.PUBLIC_URL}/images/${imageUrl})`,
          backgroundImage: `url(${imageUrl})`,
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
          <Typography variant="h6" gutterBottom={true}>
            {workoutItem.title}
          </Typography>
          {/* <Chip
            avatar={<Avatar style={{ backgroundColor: "#292b4f" }}>T</Avatar>}
            label="60 minutes"
            className={classes.woAvatar}
          /> */}
          <Chip
            avatar={<Avatar style={{ backgroundColor: "#292b4f" }}>C</Avatar>}
            label={`Category: ${category}`}
            className={classes.woAvatar}
          />
          <Chip
            avatar={<Avatar style={{ backgroundColor: "#292b4f" }}>C</Avatar>}
            label={`Level: ${level}`}
            className={classes.woAvatar}
          />
          <Chip
            avatar={<Avatar style={{ backgroundColor: "#292b4f" }}>Nr</Avatar>}
            label={`${exerciseitems.length} exercises`}
            className={classes.woAvatar}
          />
          <Typography variant="body1"></Typography>
        </div>
      </div>

      <div style={{ padding: "1rem 1rem 5rem 1rem" }}>
        <Typography variant="h5" gutterBottom={true}>
          Workout description
        </Typography>
        <Typography variant="body2" gutterBottom={true}>
          {workoutItem.description}
        </Typography>
        <Typography
          variant="body2"
          gutterBottom={true}
          style={{ color: "#8285be" }}
        >
          Equipment:
        </Typography>
        {equipment &&
          equipment.map((item: any) => (
            <Chip
              label={item}
              style={{ marginRight: "0.5rem", backgroundColor: "#3d3e6f" }}
              key={item}
            />
          ))}
        <hr
          style={{ margin: "1.5rem 0 1rem 0", border: "1px solid #3a3c6d" }}
        />
        <Typography variant="h6" gutterBottom={true}>
          Exercise list
        </Typography>
        {exerciseitems &&
          exerciseitems.map((item: any) => (
            <Exercise
              key={item.id}
              id={item.id}
              title={item.name}
              fileUrl={item.fileUrl}
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
  ].items.find((x: any) => x.id === ownProps.match.params.id),
});

export default connect(mapStateToProps)(WorkoutDetails);
