const exercisesReducer = (state = {}, action: any) => {
  switch (action.type) {
    case "SORT_EXERCISES":
      return state;
    case "FILTER_EXERCISES_BY_VALUE":
      return state;
    case "FILTER_FILTERED_EXERCISES_BY_VALUE":
      return state;
    case "ADD_EXERCISE":
      return state;
    case "REMOVE_EXERCISE":
      return state;
    case "EDIT_EXERCISE":
      return state;
    case "GET_EXERCISES":
      return {
        ...state,
        exercisesState: Object.values(action.payload),
      };
    default:
      return state;
  }
};
export default exercisesReducer;
