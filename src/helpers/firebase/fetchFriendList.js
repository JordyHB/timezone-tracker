import { db, auth } from '../../firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'

async function fetchFriendList(requestedUser) {

    const collectionRef = collection(db, 'users', requestedUser, 'friends')

    try {
        const querySnapshot = await getDocs(collectionRef)
        return querySnapshot.docs.map(doc => doc.data())
    } catch (e) {
        console.error(e)
    }
}

export default fetchFriendList;