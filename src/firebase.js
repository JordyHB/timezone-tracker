import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBC6BUsrga6lPplNbbm8GAP9pGAt3YfvZc",
}

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);