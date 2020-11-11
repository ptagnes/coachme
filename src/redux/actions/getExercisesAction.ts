import firebase from "../../firebase";
import { Dispatch } from "redux";

const exerciseListRef = firebase
  .firebaseDb()
  .collection("exerciselist")
  .orderBy("createdAt", "desc");

const getExercisesAction = () => async (dispatch: Dispatch) => {
  exerciseListRef.onSnapshot((snapshot: any) => {
    const payload = snapshot.docs.map((doc: any) => {
      // console.log(doc.id, doc.data());
      return { id: doc.id, ...doc.data() };
    });
    dispatch({
      type: "GET_EXERCISES",
      payload: payload,
    });
  });
};
export default getExercisesAction;
