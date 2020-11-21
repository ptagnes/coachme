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
    // this.storage = app.storage();
    // this.auth = app.auth();
    // this.db = app.firestore();
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
  createUserProfileDocument = async (userAuth: any, additionalData: any) => {
    console.log("userAuth");
    console.log(userAuth);
    if (!userAuth) return;
    const userRef = app.firestore().doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if (!snapShot.exists) {
      const { displayName, email, role } = userAuth;
      const createdAt = new Date();
      console.log("createuser");
      console.log(userRef);
      console.log(additionalData);
      try {
        await userRef.set({
          displayName,
          email,
          role,
          createdAt,
          ...additionalData,
        });
        console.log("user added?");
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
  async register(name: string, email: string, password: string) {
    //const newUser = await this.auth.createUserWithEmailAndPassword(
    const newUser = await app
      .auth()
      .createUserWithEmailAndPassword(email, password);
    if (newUser.user !== null) {
      return await newUser.user.updateProfile({
        displayName: name,
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
  }
  async resetPassword(email: string) {
    //await this.auth.sendPasswordResetEmail(email);
    await app.auth().sendPasswordResetEmail(email);
  }
}

const firebase = new Firebase();
export default firebase;
