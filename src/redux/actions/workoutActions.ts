import firebase from "./../../firebase/firebase";
import WorkoutActionTypes from "../types/workoutTypes";
import { Dispatch } from "redux";
export const fetchWorkoutsStart = () => ({
  type: WorkoutActionTypes.FETCH_WORKOUTS_START,
});
export const fetchWorkoutsSuccess = (workoutsMap: any) => ({
  type: WorkoutActionTypes.FETCH_WORKOUTS_SUCCESS,
  payload: workoutsMap,
});
export const fetchWorkoutsFailure = (errorMessage: any) => ({
  type: WorkoutActionTypes.FETCH_WORKOUTS_FAILURE,
  payload: errorMessage,
});
export const fetchWorkoutsStartAsync = () => {
  return (dispatch: Dispatch) => {
    const workoutsRef = firebase.firebaseDb().collection("workouts");
    dispatch(fetchWorkoutsStart());
    workoutsRef
      .get()
      .then((snapshot: any) => {
        const workoutsMap = firebase.convertWorkoutsSnapshotToMap(snapshot);
        dispatch(fetchWorkoutsSuccess(workoutsMap));
      })
      .catch((error: any) => dispatch(fetchWorkoutsFailure(error.message)));
  };
};
