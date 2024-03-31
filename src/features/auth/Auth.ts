import { UserType } from '../../types/UserTypes';
import initApp from './firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, get, set } from 'firebase/database';
import { v4 as uuid } from 'uuid';
import { ProductType } from '../../types/ProductTypes';

const auth = getAuth(initApp);
const database = getDatabase(initApp);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account', // 구글 계정 자동 로그인 안되게
});

const login = () => {
    signInWithPopup(auth, provider).catch(console.error);
};

const logout = () => {
    signOut(auth).catch(console.error);
    localStorage.removeItem('user');
};

const onUserStateChange = (callback: (user: UserType) => void) => {
    onAuthStateChanged(auth, async (user) => {
        const updatedUser = user ? await adminUsers(user) : null;
        callback(updatedUser);
    });
};

const adminUsers = async (user) => {
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

const addNewProduct = async (product: ProductType, image: string) => {
    const id = uuid();
    set(ref(database, `products/${id}`), {
        ...product,
        id,
        price: parseInt(product.price),
        image,
        option: product.option.split(','),
    });
};

export { login, logout, onUserStateChange, addNewProduct };
