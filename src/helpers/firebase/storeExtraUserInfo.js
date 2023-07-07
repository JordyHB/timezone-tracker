import {auth, db} from "../../firebaseConfig";
import {doc, updateDoc} from "firebase/firestore";
import {updateProfile} from "firebase/auth";

const storeExtraUserInfo = async (userInfo) => {

    const userDocRef = doc(db, 'users', auth.currentUser.displayName)
    await updateDoc(userDocRef, {
        nickname: userInfo.nickname,
        country: userInfo.country,
        timezone: userInfo.timezone,
        accountSetupComplete: true
    })
}

export default storeExtraUserInfo;