import {collection, getDocs} from "firebase/firestore";
import {db} from "../../firebaseConfig";

// checks if the username is available
async function checkNameAvailability(name, nameType) {

    // checks if the name is a group name or a username
    if (nameType === 'group') {
        const collectionRef = collection(db, 'groups')
        try {
            // gets all group names from the database and checks if the name is already taken
            const querySnapshot = await getDocs(collectionRef)
            const groupNames = querySnapshot.docs.map(doc => doc.id)
            return !groupNames.includes(name)
        } catch (e) {
            console.error(e)
        }
    }

    // checks if the name is a username
    else if (nameType === 'username') {

        const collectionRef = collection(db, 'users')

        try {
            const querySnapshot = await getDocs(collectionRef)
            const userNames = querySnapshot.docs.map(doc => doc.id)
            return !userNames.includes(name)
        } catch (e) {
            console.error(e)
        }
    }
}

export default checkNameAvailability;