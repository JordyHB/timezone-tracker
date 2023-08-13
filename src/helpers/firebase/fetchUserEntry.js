import {doc, getDoc} from "firebase/firestore";
import {db} from "../../firebaseConfig";


async function fetchUserEntry(username) {

    const docRef = doc(db, "users", username);

    try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            //returns the user entry from the firestore database
            return docSnap.data();
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export default fetchUserEntry;