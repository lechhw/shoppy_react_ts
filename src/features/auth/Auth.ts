import initApp from './firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth(initApp);
const provider = new GoogleAuthProvider();

const login = async () => {
    return await signInWithPopup(auth, provider)
        .then((result) => {
            return result.user;
        })
        .catch(console.error);
};

const logout = async () => {
    return signOut(auth)
        .then(() => {
            return true;
        })
        .catch(console.error);
};

const onUserStateChange = (callback: (user: any) => void) => {
    onAuthStateChanged(auth, (user) => {
        callback(user);
    });
};

export { login, logout, onUserStateChange };
