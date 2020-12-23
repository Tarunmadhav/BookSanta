import firebase from "firebase"
require("@firebase/firestore")
var firebaseConfig = {
  apiKey: "AIzaSyAEQdsaWusg3koajgy0iylxtq1rqvZy8ck",
  authDomain: "booksanta-1619e.firebaseapp.com",
  projectId: "booksanta-1619e",
  storageBucket: "booksanta-1619e.appspot.com",
  messagingSenderId: "820158376124",
  appId: "1:820158376124:web:57174004f3ed2926fcc8b9"
  };
  firebase.initializeApp(firebaseConfig);
export default firebase.firestore()