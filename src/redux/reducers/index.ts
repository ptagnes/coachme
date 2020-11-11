import { combineReducers } from "redux";
import moviesReducer from "./movies";
import exercisesReducer from "./exercises";

// export interface Movies {
//   title: string,
//   ....
// }
// export interface Exercises {
//   title: string,
//   ....
// }
export interface StoreState {
  moviesState: any;
  exercisesState: any;
}

export const reducers = combineReducers<StoreState>({
  moviesState: moviesReducer,
  exercisesState: exercisesReducer,
});
