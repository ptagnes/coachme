import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import WorkoutItems from "./WorkoutItems";
import { selectCollection } from "../../redux/selectors/workoutSelectors";
//Workout top category component path="/workouts/:collectionId"
const WorkoutPageCollection = ({
  collection,
  route,
}: {
  collection: any;
  route: string;
}) => {
  const { title, items } = collection;
  console.log(collection);
  return (
    <div className="bp">
      <h2>{title}</h2>
      <Grid>
        {items.map((item: any) => (
          <WorkoutItems key={item.id} item={item} route={route} />
        ))}
      </Grid>
    </div>
  );
};

const mapStateToProps = (state: any, ownProps: any) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
  route: ownProps.match.params.collectionId,
});

export default connect(mapStateToProps)(WorkoutPageCollection);
