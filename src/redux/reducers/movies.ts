const moviesReducer = (state = {}, action: any) => {
  switch (action.type) {
    case "SORT_MOVIES":
      return state;
    case "GET_MOVIES":
      return {
        // keep the old state
        ...state,
        moviesState: Object.values(action.payload),
      };
    default:
      return state;
  }
};
export default moviesReducer;
