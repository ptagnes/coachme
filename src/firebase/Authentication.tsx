import React, { useEffect, useState } from "react";
import app from "./firebase";
export const AuthContext = React.createContext<any | null>({ user: null });

/*
10 - USER
99 - ADMINISTRATOR
*/
export const AuthProvider = ({ children }: { children: any }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [pending, setPending] = useState(true);
  const id = "2xT2T9CqfjgU5TQGn06VL920Tkp2";
  useEffect(() => {
    const unsubscribe = app.firebaseAuth().onAuthStateChanged((user: any) => {
      if (user) {
        setIsAdmin(user.uid === id);
      }
      setCurrentUser(user);
      setPending(false);
    });
    return () => unsubscribe();
  }, []);
  if (pending) {
    return <>Please wait...</>;
  }
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
