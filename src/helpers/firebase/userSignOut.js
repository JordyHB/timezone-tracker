import {signOut} from "firebase/auth";
import {auth} from "../../firebaseConfig";

const userSignOut = () => {
    // sign out
    signOut(auth).then(() => {
        console.log('signed out')
    }).catch((error) => {
            console.log(error)
        }
    );
}

export default userSignOut;