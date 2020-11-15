import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";
import firebaseConfig from "./config";

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
  }

  async resetPassword(email: string) {
    //await this.auth.sendPasswordResetEmail(email);
    await app.auth().sendPasswordResetEmail(email);
  }
}

const firebase = new Firebase();
export default firebase;
