import React from "react";
import firebase from "../firebase";
// import app from "../firebase/firebase";

function useAuth() {
  const [authUser, setAuthUser] = React.useState<null | object>();
  React.useEffect(() => {
    //const FirebaseContext = React.createContext<any|null>(null);
    // const userRef = app.createUserProfileDocument(userAuth);
    const unsubscribe = firebase.firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => unsubscribe();
  }, []);
  return authUser;
}
export default useAuth;
