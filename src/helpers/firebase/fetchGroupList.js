import {db} from '../../firebaseConfig'
import {collection, getDocs} from 'firebase/firestore'


async function fetchGroupList(requestedUser) {

    const collectionRef = collection(db, 'users', requestedUser, 'groups')

    try {
        const querySnapshot = await getDocs(collectionRef)
        return querySnapshot.docs.map(doc => doc.data())
    } catch (e) {
        console.error(e)
    }
}

export default fetchGroupList;