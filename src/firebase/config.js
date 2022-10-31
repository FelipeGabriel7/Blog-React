
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyClag748NLhlzoHBX-UocrHEGaiz0oV7JE",
  authDomain: "miniblog-7303c.firebaseapp.com",
  projectId: "miniblog-7303c",
  storageBucket: "miniblog-7303c.appspot.com",
  messagingSenderId: "163279918930",
  appId: "1:163279918930:web:31b5bbbfff133240178c8b"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);