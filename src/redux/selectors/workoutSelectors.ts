import { createSelector } from "reselect";

const selectWorkout = (state: any) => state.workoutState;

export const selectCollections = createSelector(
  [selectWorkout],
  (workoutState) => workoutState.collections
);
//top categories such as 'strength', 'hiit' etc
export const selectCollectionsForTopWorkoutCategories = createSelector(
  [selectCollections],
  (collections) => Object.keys(collections).map((key) => collections[key])
);
//selects a specific collection of the state by a specific parameter, such as path="/workouts/:collectionId"
export const selectCollection = (collectionUrlParam: any) =>
  createSelector(
    [selectCollections],
    (collections) => collections[collectionUrlParam]
  );
//TODO
export const selectSpecificWorkout = (collectionUrlParam: any) =>
  createSelector(
    [selectCollectionsForTopWorkoutCategories],
    (collections) => collections[collectionUrlParam]
  );
