import {collection, doc, getDocs, writeBatch} from "firebase/firestore";
import {db} from "../../firebaseConfig";

async function addMemberToGroup(groupName, user) {

    console.log(groupName, user)
    // reference to the groups collection
    const groupCollectionRef = collection(db, "groups")
    // reference to the current group list to check if the user is already in the list
    const requestGroupMembersRef = collection(db, "groups", groupName, "memberinfo")

    try {
        //checks if the user is already in the group
        const currentMemberList = await getDocs(requestGroupMembersRef)
        // map through the current member list to get the usernames of the members
        const currentMemberListUsernames = currentMemberList.docs.map((doc) => doc.id);
        // if the user is already in the group, return a message and stop the function
        if (currentMemberListUsernames.includes(user.username)) {
            return 'user already in group'
        }

        const batch = writeBatch(db)

        // add group member info to the group member info collection
        const groupMembersRef = doc(db, 'groups', groupName, 'memberinfo', user.username)
        batch.set(groupMembersRef, {
                country: user.country,
                username: user.username,
                uid: user.uid,
                nickname: user.nickname,
                timezone: user.timezone,
            }
        );

        // add group reference to user which will include a collection with all groups the user is a member of
        const userGroupRef = doc(db, 'users', user.username, 'groups', groupName)
        batch.set(userGroupRef, {
            groupname: groupName,
            grouplocation: groupMembersRef,
            // add the user to the member list of the group
            members: [user.username, ...currentMemberListUsernames]
        });

        // update the member list of all the other members of the group
        const membersToUpdate = currentMemberList.docs.map((member) => {
            const memberRef = doc(db, 'users', member.id, 'groups', groupName)
            batch.update(memberRef, {
                members: [user.username, ...currentMemberListUsernames]
            });
        })

        // sends the batch request to the database to change all documents at once
        await Promise.all(membersToUpdate)
        await batch.commit()
        return 'user added'


    } catch (e) {
        console.log(e)
        return 'error with adding the group member'
    }

}

export default addMemberToGroup;