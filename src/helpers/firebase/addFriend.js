import {
    getDocs,
    collection,
    where,
    query,
    setDoc,
    doc,
} from "firebase/firestore";
import {db, auth} from "../../firebaseConfig";


// function that returns info for the user queried entry based on the username
async function queryByUsernames(user, requestedUsername) {

    // reference to the users collection
    const collectionRef = collection(db, "users");
    // reference to the current user's friend list to check if the user is already in the list
    const currentFriendListRef =
        collection(db, "users", auth.currentUser.displayName, "friends");

    try {
        //checks if the user is already in the friend list
        const currentFriendList = await getDocs(currentFriendListRef);
        const currentFriendListUsernames = currentFriendList.docs.map((doc) => doc.id);
        if (currentFriendListUsernames.includes(requestedUsername)) {
            return 'user already in friend list'
        }
        //checks if the user is trying to add themselves
        if (auth.currentUser.displayName === requestedUsername) {
            return 'you cannot add yourself'
        }

        //builds a query based on the username
        const q = await query(collectionRef,
            where("username", "==", requestedUsername)
        );

        const result = await getDocs(q);

        //adds the relevant data to the result object that gets stored in a collection of friends
        const [queryResult] = result.docs.map((doc) => {
                return {
                    nickname: doc.data().nickname,
                    timezone: doc.data().timezone,
                    country: doc.data().country,
                    uid: doc.data().uid,
                };
            }
        );
        //returns a message based if the user was not found
        if (queryResult === undefined) {
            return 'user not found'
        } else {
            await setDoc(
                // stores the queried data in a collection of friends
                doc(db,
                    "users",
                    auth.currentUser.displayName,
                    "friends",
                    requestedUsername
                ),
                {
                    username: requestedUsername,
                    nickname: queryResult.nickname,
                    timezone: queryResult.timezone,
                    country: queryResult.country,
                    uid: queryResult.uid,
                }
            );

            await setDoc(
                // adds the current user to the queried user's friend list
                doc(db,
                    "users",
                    requestedUsername,
                    "friends",
                    auth.currentUser.displayName
                ),
                {
                    username: auth.currentUser.displayName,
                    nickname: user.nickname,
                    timezone: user.timezone,
                    country: user.country,
                    uid: user.uid,
                }
            );
            return 'user added'
        }
    } catch
        (e) {
        console.error(e)
        return 'there was an error with the Database'
    }
}

export default queryByUsernames;