import { UserType } from '../types/UserTypes';
import initApp from './firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';

const auth = getAuth(initApp);
const database = getDatabase(initApp);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account', // 구글 계정 자동 로그인 안되게
});

export const login = () => {
    signInWithPopup(auth, provider).catch(console.error);
};

export const logout = () => {
    signOut(auth).catch(console.error);
    localStorage.removeItem('user');
};

export const onUserStateChange = (callback: (user: UserType) => void) => {
    onAuthStateChanged(auth, async (user) => {
        const updatedUser = user ? await adminUsers(user) : null;
        callback(updatedUser);
    });
};

export const adminUsers = async (user) => {
    return await get(ref(database, 'admins'))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const admins = snapshot.val();
                const isAdmin = admins.includes(user.uid);
                return { ...user, isAdmin };
            }
            return user;
        })
        .catch(console.error);
};
