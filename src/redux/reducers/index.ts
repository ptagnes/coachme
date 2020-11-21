import { combineReducers } from "redux";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import moviesReducer from "./movies";
import exercisesReducer from "./exercises";
import fitnessToolsReducer from "./fitnesstools";
import workoutReducer from "./workouts";
import directoryReducer from "./directory";

// export interface Exercises {
//   title: string,
//   ....
// }

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["workoutState"],
};
export interface StoreState {
  moviesState: any;
  exercisesState: any;
  fitnessToolsState: any;
  workoutState: any;
  directoryState: any;
}

const reducers = combineReducers<StoreState>({
  moviesState: moviesReducer,
  exercisesState: exercisesReducer,
  fitnessToolsState: fitnessToolsReducer,
  workoutState: workoutReducer,
  directoryState: directoryReducer,
});

export default persistReducer(persistConfig, reducers);
