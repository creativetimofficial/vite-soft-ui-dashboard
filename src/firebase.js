import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
import 'firebase/storage';

// Your web app's Firebase configuration
export const firebaseApp = initializeApp({
    apiKey: "AIzaSyClTB5_5JXF2OWQMSwJTuV43fyA53zST4M",
    authDomain: "cinematheater-2a12a.firebaseapp.com",
    projectId: "cinematheater-2a12a",
    storageBucket: "cinematheater-2a12a.appspot.com",
    messagingSenderId: "551527580682",
    appId: "1:551527580682:web:1e316d546636d8d5b74bf3",
    measurementId: "G-WHT21WKD4W"
});
  
// used for the firestore refs
const db = getFirestore(firebaseApp)

// here we can export reusable database references
export const todosRef = collection(db, 'todos')
