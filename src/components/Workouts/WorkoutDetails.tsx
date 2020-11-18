import React from "react";
import Exercise from "../Exercises/Exercise";
import Typography from "@material-ui/core/Typography";
import { selectCollection } from "../../redux/selectors/workoutSelectors";
import { connect } from "react-redux";

function WorkoutDetails({ workoutItem, ...otherProps }: { workoutItem: any }) {
  console.log(workoutItem);
  console.log(otherProps);
  const { exerciseitems, imageUrl } = workoutItem;
  return (
    <div className="bp">
      <div
        style={{
          flexDirection: "column",
          padding: "2rem",
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/${imageUrl})`,
        }}
      >
        <div>Go back button</div>
        <Typography variant="h6">{workoutItem.title}</Typography>
        <Typography variant="body1">
          <span>60 minutes</span>
          <span>8 Exercises</span>
          <span>Other info</span>
        </Typography>
      </div>

      <div>
        <Typography variant="h6">Exercise list</Typography>
        {exerciseitems &&
          exerciseitems.map((item: any) => (
            <Exercise
              key={item.id}
              id={item.id}
              title={item.name}
              image={item.imageUrl}
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
