import UsersActionTypes from "../types/usersTypes";

const INITIAL_STATE = {
  users: null,
  isFetching: false,
  errorMessage: undefined,
};

const usersReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case UsersActionTypes.FETCH_USERS_START:
      return {
        ...state,
        isFetching: true,
      };
    case UsersActionTypes.FETCH_USERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        users: action.payload,
      };
    case UsersActionTypes.FETCH_USERS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    case UsersActionTypes.EDIT_USERS:
      console.log("users reducer EDIT_USERS action.payload");
      console.log(action.payload);
      return state;
    case UsersActionTypes.ADD_USER_ACTIVITY:
      console.log("add user activity");
      console.log(action.payload);
      return state;
    default:
      return state;
  }
};

export default usersReducer;
