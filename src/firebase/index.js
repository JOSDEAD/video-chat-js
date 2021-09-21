import firebase from "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyAUlJCuWrYCHh_Gme1GcRUFGn7kvK2SXu4",
  authDomain: "video-chat-js.firebaseapp.com",
  projectId: "video-chat-js",
  storageBucket: "video-chat-js.appspot.com",
  messagingSenderId: "842755507224",
  appId: "1:842755507224:web:81548a339bc52e0048ef6d"
};
let firestore;
if(firebase) {
    firebase.initializeApp(config);
    firestore = firebase.firestore();
}
export { firestore };
