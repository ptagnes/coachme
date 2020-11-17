import WORKOUT_DATA from "../routinedata";

const INITIAL_STATE = {
  collections: WORKOUT_DATA,
};

const workoutReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default workoutReducer;
