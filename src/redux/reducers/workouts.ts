import WorkoutActionTypes from "../types/workoutTypes";

const INITIAL_STATE = {
  collections: null,
  isFetching: false,
  errorMessage: undefined,
};

const workoutReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case WorkoutActionTypes.FETCH_WORKOUTS_START:
      return {
        ...state,
        isFetching: true,
      };
    case WorkoutActionTypes.FETCH_WORKOUTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        collections: action.payload,
      };
    case WorkoutActionTypes.FETCH_WORKOUTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    case WorkoutActionTypes.ADD_WORKOUT:
      console.log("add workout reducer");
      console.log(action.payload);
      return {
        ...state,
        collections: action.payload,
      };
    default:
      return state;
  }
};

export default workoutReducer;
