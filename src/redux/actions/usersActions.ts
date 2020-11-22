import firebase from "./../../firebase";
import UsersActionTypes from "../types/usersTypes";
import { Dispatch } from "redux";

const usersRef = firebase.firebaseDb().collection("users");

export const fetchUserStart = () => ({
  type: UsersActionTypes.FETCH_USERS_START,
});
export const fetchUserSuccess = (workoutsMap: any) => ({
  type: UsersActionTypes.FETCH_USERS_SUCCESS,
  payload: workoutsMap,
});
export const fetchUserFailure = (errorMessage: any) => ({
  type: UsersActionTypes.FETCH_USERS_FAILURE,
  payload: errorMessage,
});
export const fetchUserStartAsync = (id: string) => {
  return (dispatch: Dispatch) => {
    dispatch(fetchUserStart());
    const user = usersRef.doc(id);
    user
      .get()
      .then(function (doc) {
        if (doc.exists) {
          // console.log("Document data:", doc.data());
          dispatch(fetchUserSuccess(doc.data()));
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        dispatch(fetchUserFailure(error));
        console.log("Error getting document:", error);
      });
  };
};
export const editUser = (id: string, updates: any) => async (
  dispatch: Dispatch
) => {
  var executed = false;
  usersRef.onSnapshot((snapshot: any) => {
    const payload = snapshot.docs.map((doc: any) => {
      return { id: doc.id, ...doc.data() };
    });
    console.log("updates from editUserAction");
    console.log(updates);
    const [userParam] = Object.keys(updates);
    const userVal = updates[Object.keys(updates)[0]];
    console.log(userParam);
    console.log(userVal);
    console.log("payload from editUserAction");
    console.log(payload);

    const user = usersRef.doc(id);
    console.log(user);
    if (!executed) {
      executed = true;
      user.update({
        [userParam]: userVal,
      });
    }
    dispatch({
      type: UsersActionTypes.EDIT_USERS,
      payload: payload,
    });
  }); //onSnapshot end
};
