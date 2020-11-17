import { createSelector } from "reselect";

const selectDirectory = (state: any) => state.directoryState;

export const selectDirectorySections = createSelector(
  [selectDirectory],
  (directoryState) => directoryState.sections
);
