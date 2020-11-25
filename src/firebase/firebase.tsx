import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";
import firebaseConfig from "./config";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();
export class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
  }
  firebaseStorage() {
    return app.storage();
  }
  firebaseAuth() {
    return app.auth();
  }
  firebaseDb() {
    return app.firestore();
  }
  ref() {
    return app.database().ref();
  }
  createUserProfileDocument = async (
    userAuth: any,
    displayName: string,
    lastName: string,
    email: string,
    role: number
  ) => {
    console.log("userAuth from createUserProfileDocument");
    console.log(userAuth.user.uid);
    if (!userAuth) return;
    const userRef = app.firestore().doc(`users/${userAuth.user.uid}`);
    console.log("userRef");
    console.log(userRef);
    const snapShot = await userRef.get();
    console.log("snapShot");
    console.log(snapShot);
    if (!snapShot.exists) {
      // const { displayName, email, role } = userAuth;
      const createdAt = new Date();
      console.log("createuser");
      console.log(userRef);
      try {
        await userRef.set({
          displayName,
          lastName,
          email,
          role,
          createdAt,
        });
        console.log("user added successfully!");
      } catch (error) {
        console.log("error creating user", error.message);
      }
    }
    return userRef;
  };
  convertWorkoutsSnapshotToMap = (collections: any) => {
    const transformedCollection = collections.docs.map((doc: any) => {
      const { title, items, imageUrl } = doc.data();
      return {
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items,
        imageUrl,
      };
    });
    return transformedCollection.reduce((accumulator: any, collection: any) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    }, {});
  };
  async register(
    name: string,
    lastName: string,
    email: string,
    password: string,
    role: number
  ) {
    const newUser = await app
      .auth()
      .createUserWithEmailAndPassword(email, password);
    if (newUser.user !== null) {
      this.createUserProfileDocument(newUser, name, lastName, email, role);
      return await newUser.user.updateProfile({
        displayName: name,
        //photoUrl
      });
    }
  }
  async login(email: string, password: string) {
    // return await this.auth.signInWithEmailAndPassword(email, password);
    return await app.auth().signInWithEmailAndPassword(email, password);
  }
  async logout() {
    //await this.auth.signOut();
    await app.auth().signOut();
    history.push("/");
    window.location.reload();
  }
  async resetPassword(email: string) {
    //await this.auth.sendPasswordResetEmail(email);
    await app.auth().sendPasswordResetEmail(email);
  }
}

const firebase = new Firebase();
export default firebase;
