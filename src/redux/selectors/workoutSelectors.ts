import { createSelector } from "reselect";
const selectWorkout = (state: any) => state.workoutState;
export const selectCollections = createSelector(
  [selectWorkout],
  (workoutState) => workoutState.collections
);
//top categories such as 'strength', 'hiit' etc
export const selectCollectionsForTopWorkoutCategories = createSelector(
  [selectCollections],
  (collections) =>
    collections ? Object.keys(collections).map((key) => collections[key]) : []
);
//selects a specific collection of the state by a specific parameter, such as path="/workouts/:collectionId"
export const selectCollection = (collectionUrlParam: any) =>
  createSelector([selectCollections], (collections) =>
    collections ? collections[collectionUrlParam] : null
  );
export const selectIsCollectionFetching = createSelector(
  [selectWorkout],
  (workoutState) => workoutState.isFetching
);
export const selectIsCollectionsLoaded = createSelector(
  [selectWorkout],
  (workoutState) => !!workoutState.collections
);
