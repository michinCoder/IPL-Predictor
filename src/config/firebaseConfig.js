import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"; 


const firebaseConfig = {
  apiKey: "AIzaSyAAUTrfq-pxSfXvLwMldPkN6Ik2M5FCt9Y",
   authDomain: "iplpredictor-a562c.firebaseapp.com",
    projectId: "iplpredictor-a562c",
    storageBucket: "iplpredictor-a562c.appspot.com",
    messagingSenderId: "46612133472",
    appId: "1:46612133472:web:5810679ae084fd6d333505",
    measurementId: "G-W284J2YCDB"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);