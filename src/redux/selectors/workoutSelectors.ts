import { createSelector } from "reselect";

const selectWorkout = (state: any) => state.workoutState;

export const selectCollections = createSelector(
  [selectWorkout],
  (workoutState) => workoutState.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  (collections) => Object.keys(collections).map((key) => collections[key])
);

export const selectCollection = (collectionUrlParam: any) =>
  createSelector(
    [selectCollections],
    (collections) => collections[collectionUrlParam]
  );
