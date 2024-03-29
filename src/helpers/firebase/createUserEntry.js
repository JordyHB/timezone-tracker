import {doc, setDoc} from "firebase/firestore";
import {db} from "../../firebaseConfig";


// makes a new entry in the users collection in the firestore database on registration
async function createUserEntry(user) {

    const docRef = doc(db, "users", user.displayName);

    try {
        await setDoc(docRef,
            {
                username: user.displayName,
                uid: user.uid,
                email: user.email,
            }
        );
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export default createUserEntry;

