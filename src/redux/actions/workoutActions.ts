import firebase from "./../../firebase/firebase";
import WorkoutActionTypes from "../types/workoutTypes";
import { Dispatch } from "redux";
const workoutsRef = firebase.firebaseDb().collection("workouts");
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
export const addWorkout = ({
  id = "",
  title = "",
  description = "",
  routeName = "",
  imageUrl = "https://firebasestorage.googleapis.com/v0/b/ptagnes.appspot.com/o/defaultImage.jpg?alt=media&token=352cd091-29e7-4ba2-af89-ce9ff0094d97",
  level = "beginner",
  equipment = [],
  category = "",
  workoutCategory = "",
  exerciseitems = [],
} = {}) => async (dispatch: Dispatch) => {
  console.log("add workout to firestore");
  console.log(
    id,
    title,
    description,
    routeName,
    imageUrl,
    level,
    equipment,
    category,
    workoutCategory,
    exerciseitems
  );
  // workoutsRef
  //   .add({
  //     id: id,
  //     title: title,
  //     description: description,
  //     routeName: routeName,
  //     imageUrl: imageUrl,
  //     level: level,
  //     equipment: equipment,
  //     category: category,
  //    workoutCategory: workoutCategory,
  //     exerciseitems: exerciseitems,
  //   })
  //   .then(() => {
  //     dispatch({
  //       type: WorkoutActionTypes.ADD_WORKOUT,
  //     });
  //   });
};
