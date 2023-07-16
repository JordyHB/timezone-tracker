import {writeBatch, doc, getDoc} from "firebase/firestore";
import {db} from "../../firebaseConfig";

async function createGroup(user, groupName) {

    try {

        // checks if the group already exists
        const groupNameCheckRef = doc(db, 'groups', groupName)
        const docSnap = await getDoc(groupNameCheckRef)

        // if the group already exists, return an error
        if (docSnap.exists()) {
            console.log('group already exists')
            return 'group already exists'
        }

        // creates a batch request to change multiple documents at once
        const batch = writeBatch(db)

        // create group document where all group info will be stored
        const groupRef = doc(db, 'groups', groupName)
        batch.set(groupRef, {
            name: groupName,
        });

        // create group member info collection where all group members will be stored and adds the user as the first member
        const groupMembersRef = doc(db, 'groups', groupName, 'memberinfo', user.username)
        batch.set(groupMembersRef, {
            country: user.country,
            username: user.username,
            uid: user.uid,
            nickname: user.nickname,
            timezone: user.timezone,
        });

        // add group reference to user which will include a collection with all groups the user is a member of
        const userGroupRef = doc(db, 'users', user.username, 'groups', groupName)
        batch.set(userGroupRef, {
            groupname: groupName,
            grouplocation: groupRef,
            members: [user.username]
        });

        // sends the batch request to the database to change all documents at once
        await batch.commit()
        return 'group created successfully'
    } catch (e) {
        console.error(e)
        return 'something went wrong with the database'
    }
}

export default createGroup;