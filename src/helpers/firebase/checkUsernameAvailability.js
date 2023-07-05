import {collection, getDocs} from "firebase/firestore";
import {db} from "../../firebaseConfig";

// checks if the username is available
async function checkUsernameAvailability(username) {

        const collectionRef = collection(db, 'users')

        try {
            const querySnapshot = await getDocs(collectionRef)
            const userNames = querySnapshot.docs.map(doc => doc.id)
            console.log(userNames)
            return !userNames.includes(username)
        } catch (e) {
            console.error(e)
        }
}

export default checkUsernameAvailability;