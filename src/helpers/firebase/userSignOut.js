import {signOut} from "firebase/auth";
import {auth} from "../../firebaseConfig";


const userSignOut = async () => {
    try {
        await signOut(auth);
        return true
    } catch (error) {
        console.error(error);
        return false
    }
};

export default userSignOut;