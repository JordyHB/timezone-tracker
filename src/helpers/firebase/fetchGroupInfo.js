import { db } from '../../firebaseConfig'
import {collection,getDocs,} from 'firebase/firestore'

async function fetchGroupInfo(requestedGroup) {

    const groupRef = collection(db, 'groups', requestedGroup, 'memberinfo')

    try {
        const querySnapshot = await getDocs(groupRef)
        return querySnapshot.docs.map(doc => doc.data())
    } catch (e) {
        console.error(e)
    }
}

export default fetchGroupInfo;