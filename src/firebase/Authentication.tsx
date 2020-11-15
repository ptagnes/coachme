import React, { useEffect, useState } from "react";
import app from "./firebase";
export const AuthContext = React.createContext<any | null>({ user: null });
export const AuthProvider = ({ children }: { children: any }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [pending, setPending] = useState(true);
  useEffect(() => {
    app.firebaseAuth().onAuthStateChanged((user: any) => {
      setCurrentUser(user);
      setPending(false);
    });
  }, []);
  if (pending) {
    return <>Please wait...</>;
  }
  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
