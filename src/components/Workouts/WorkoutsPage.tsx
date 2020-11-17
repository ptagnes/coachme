import React from "react";
import { Route } from "react-router-dom";
import WorkoutsOverview from "./WorkoutsOverview";
import WorkoutPageCollection from "./workoutPageCollection";

const WorkoutsPage = ({ match }: { match: any }) => {
  return (
    <div className="workouts-page">
      <Route exact path="/workouts/strength" component={WorkoutsOverview} />
      {/* <Route exact path={`${match.path}`} component={WorkoutsOverview} /> */}
      {/* <Route
        path={`${match.path}/:collectionId`}
        component={WorkoutPageCollection}
      /> */}
      <Route path="/workouts/strength" component={WorkoutPageCollection} />
    </div>
  );
};

export default WorkoutsPage;
