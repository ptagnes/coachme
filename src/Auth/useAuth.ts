import React from "react";
import firebase from "../firebase";

function useAuth() {
  const [authUser, setAuthUser] = React.useState<null | object>();
  React.useEffect(() => {
    const unsubscribe = firebase.firebaseAuth().onAuthStateChanged((user) => {
      console.log('on auth state change')
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
