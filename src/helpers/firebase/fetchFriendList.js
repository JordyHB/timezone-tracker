import { db, auth } from '../../firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'

async function fetchFriendList() {

    const collectionRef = collection(db, 'users', auth.currentUser.displayName, 'friends')

    try {
        const querySnapshot = await getDocs(collectionRef)
        const friendList = querySnapshot.docs.map(doc => doc.data())
        console.log(friendList)
        return friendList
    } catch (e) {
        console.error(e)
    }
}

export default fetchFriendList;