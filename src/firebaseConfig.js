import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBC6BUsrga6lPplNbbm8GAP9pGAt3YfvZc",
    authDomain: "timezone-tracker-3f997.firebaseapp.com",
    databaseURL: "https://timezone-tracker-3f997-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "timezone-tracker-3f997",
    storageBucket: "timezone-tracker-3f997.appspot.com",
    messagingSenderId: "303849955039",
    appId: "1:303849955039:web:7316a6b7bbb293959ed36a"
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);







