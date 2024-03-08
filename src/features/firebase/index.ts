import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_APP_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const login = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log('user data', user);
        })
        .catch(console.error);
};

export { login };
