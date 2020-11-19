import { createSelector } from "reselect";

const selectExercise = (state: any) => state.exercisesState;

export const selectExerciseCollection = createSelector(
  [selectExercise],
  (exercisesState) => exercisesState.collections
);
//
export const selectExerciseCollectionbyKey = createSelector(
  [selectExerciseCollection],
  (collections) => Object.keys(collections).map((key) => collections[key])
);
//
export const selectCollection = (collectionUrlParam: any) =>
  createSelector(
    [selectExerciseCollection],
    (collections) => collections[collectionUrlParam]
  );
