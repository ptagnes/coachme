import { combineReducers } from "redux";
import moviesReducer from "./movies";
import exercisesReducer from "./exercises";
import fitnessToolsReducer from "./fitnesstools";
import workoutReducer from "./workouts";
import directoryReducer from "./directory";

// export interface Exercises {
//   title: string,
//   ....
// }
export interface StoreState {
  moviesState: any;
  exercisesState: any;
  fitnessToolsState: any;
  workoutState: any;
  directoryState: any;
}

export const reducers = combineReducers<StoreState>({
  moviesState: moviesReducer,
  exercisesState: exercisesReducer,
  fitnessToolsState: fitnessToolsReducer,
  workoutState: workoutReducer,
  directoryState: directoryReducer,
});
