const notesReducer = (state = {}, action: any) => {
  switch (action.type) {
    case "GET_MOVIES":
      return action.movies;
    default:
      return state;
  }
};

export { notesReducer as default };
