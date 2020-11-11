const exercisesReducer = (state = {}, action: any) => {
  switch (action.type) {
    case "SORT_EXERCISES":
      console.log("sorting ", action.payload);
      return state;
    case "ADD_EXERCISE":
      console.log("adding", action);
      console.log(state);
      return state;
    case "REMOVE_EXERCISE":
      // const newState = state.filter(({ id }) => id !== action.id);
      // return newState;
      console.log("removing", action);
      return state;
    case "EDIT_EXERCISE":
      console.log("editing", action);
      return state;
    case "GET_EXERCISES":
      // console.log("getting ", action.payload);
      return {
        // keep the old state
        ...state,
        // add all the exercises from the database
        // they will come in a json format,
        // so we need to convert them to array
        exercisesState: Object.values(action.payload),
      };
    default:
      return state;
  }
};
export default exercisesReducer;
