const notesReducer = (state = {}, action: any) => {
  switch (action.type) {
    case "GET_MOVIES":
      // console.log(state);
      // console.log(action.movies);
      return action.movies;
    default:
      return state;
  }
};

export { notesReducer as default };
