const functions = require("firebase-functions");
const LINKS_PER_PAGE = 5;

const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://ptagnes.firebaseio.com",
});
const db = admin.firestore();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/
//
exports.exercisesPagination = functions.https.onRequest((request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  let exercisesRef = db.collection("exercises");
  const offset = Number(request.query.offset);
  exercisesRef
    .orderBy("created", "desc")
    .limit(LINKS_PER_PAGE)
    .offset(offset)
    .get()
    .then((snapshot) => {
      const exercises = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      response.json(exercises);
    });
});
