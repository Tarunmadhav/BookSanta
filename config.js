import firebase from "firebase"
require("@firebase/firestore")
var firebaseConfig = {
    apiKey: "AIzaSyCvw3xFYCvL6fbHsc2j6w_5mexYH0t41Yw",
    authDomain: "booksanta-f5f5e.firebaseapp.com",
    databaseURL: "https://booksanta-f5f5e.firebaseio.com",
    projectId: "booksanta-f5f5e",
    storageBucket: "booksanta-f5f5e.appspot.com",
    messagingSenderId: "235807473851",
    appId: "1:235807473851:web:2b527d03ffb68eeac6e99e"
  };
  firebase.initializeApp(firebaseConfig);
export default firebase.firestore()