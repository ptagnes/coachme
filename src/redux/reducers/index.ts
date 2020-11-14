import { combineReducers } from "redux";
import moviesReducer from "./movies";
import exercisesReducer from "./exercises";
import fitnessToolsReducer from "./fitnesstools";

// export interface Exercises {
//   title: string,
//   ....
// }
export interface StoreState {
  moviesState: any;
  exercisesState: any;
  fitnessToolsState: any;
}

export const reducers = combineReducers<StoreState>({
  moviesState: moviesReducer,
  exercisesState: exercisesReducer,
  fitnessToolsState: fitnessToolsReducer,
});
