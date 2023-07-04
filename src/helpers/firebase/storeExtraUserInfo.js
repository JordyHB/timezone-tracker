import {auth, db} from "../../firebaseConfig";
import {doc, updateDoc} from "firebase/firestore";
import {updateProfile} from "firebase/auth";

const storeExtraUserInfo = async (user, userInfo) => {
    const userRef = await auth.currentUser;
    await updateProfile(userRef, {
        displayName: userInfo.displayName
    })

    const userDocRef = doc(db, 'users', user.uid)
    await updateDoc(userDocRef, {
        displayName: userInfo.displayName,
        country: userInfo.country,
        timezone: userInfo.timezone,
        accountSetupComplete: true
    })
}

export default storeExtraUserInfo;