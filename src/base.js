
import Rebase from "re-base";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAaO5ousnXKEUyC_FADbnGRQljSIf8V3z0",
  authDomain: "catch-of-the-day-store-e501f.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-store-e501f-default-rtdb.firebaseio.com",
  projectId: "catch-of-the-day-store-e501f",
  storageBucket: "catch-of-the-day-store-e501f.appspot.com",
  messagingSenderId: "1012851551651",
  appId: "1:1012851551651:web:d320c047ffc303b2397e16",
  measurementId: "G-LN48N00T9L"
});

// database is a functionthat will return an actual database that we have 
const base = Rebase.createClass(firebaseApp.database());
// This is a named export
export { firebaseApp };
// this is a default export
export default base;