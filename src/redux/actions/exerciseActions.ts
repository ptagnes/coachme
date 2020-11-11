import firebase from "../../firebase";
import { Dispatch } from "redux";
const exerciseListRef = firebase.firebaseDb().collection("exerciselist");

export const addExercise = ({
  id = "",
  title = "",
  description = "",
  url = "",
  videourl = "",
  image = "https://firebasestorage.googleapis.com/v0/b/ptagnes.appspot.com/o/defaultImage.jpg?alt=media&token=352cd091-29e7-4ba2-af89-ce9ff0094d97",
  level = "beginner",
  equipment = "",
  mechanics = "compound",
  musclegroup = "",
  createdAt = new Date(),
} = {}) => async (dispatch: Dispatch) => {
  exerciseListRef
    .add({
      id: id,
      title: title,
      description: description,
      url: url,
      videourl: videourl,
      image: image,
      level: level,
      equipment: equipment,
      mechanics: mechanics,
      musclegroup: musclegroup,
      createdAt: createdAt,
    })
    .then(() => {
      dispatch({
        type: "ADD_EXERCISE",
      });
    });
};

export const removeExercise = (id: string) => async (dispatch: Dispatch) => {
  exerciseListRef.onSnapshot((snapshot: any) => {
    const data = snapshot.docs.map((doc: any) => {
      return { id: doc.id, ...doc.data() };
    });
    console.log("id and data from removeExerciseAction:");
    console.log(id);
    console.log(data);
    const payload = data.filter((exercises: any) => exercises.id !== id);
    console.log("payload from removeExerciseAction:");
    console.log(payload);
    exerciseListRef
      .where("id", "==", id)
      .get()
      .then((querySnapshot) => {
        console.log("querySnapshot:");
        console.log(querySnapshot);
        console.log(querySnapshot.docs[0]);
        if (querySnapshot.docs[0] !== undefined) {
          querySnapshot.docs[0].ref
            .delete()
            .then(function () {
              console.log("Document successfully deleted!");
            })
            .catch(function (error) {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
            });
        }
      });
    dispatch({
      type: "REMOVE_EXERCISE",
      payload: payload,
    });
  }); //onSnapshot end
};
interface ExerciseUpdates {
  id: string;
  updates: any;
}
export const editExercise = (id: string, updates: any) => async (
  dispatch: Dispatch
) => {
  var executed = false;
  exerciseListRef.onSnapshot((snapshot: any) => {
    const payload = snapshot.docs.map((doc: any) => {
      return { id: doc.id, ...doc.data() };
    });
    console.log("updates from exercise action : editExercises................");
    console.log(updates);
    console.log(payload); //**payload is for the global state to keep track of exercises
    //***updating document in firestore at the specified id
    exerciseListRef
      .where("id", "==", id)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs[0] !== undefined) {
          if (!executed) {
            executed = true;
            querySnapshot.docs[0].ref
              .update({
                title: updates.title,
                description: updates.description,
                url: updates.url,
                image: updates.image,
                level: updates.level,
                equipment: updates.equipment,
                mechanics: updates.mechanics,
                musclegroup: updates.musclegroup,
                videourl: updates.videourl,
              })
              .then(function () {
                console.log("Document successfully updated!");
              })
              .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
              });
          }
        }
      });
    dispatch({
      type: "EDIT_EXERCISE",
      payload: payload,
    });
  }); //onSnapshot end
};
export const editExerciseAction = (id: string, updates: any) => ({
  type: "EDIT_EXERCISE",
  id,
  updates,
});