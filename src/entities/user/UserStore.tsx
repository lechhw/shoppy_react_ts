import { create } from 'zustand';
import { UserType } from '../../types/UserTypes';

interface UserStoreType {
    user: UserType;
    updateUser: (data: UserType) => void;
}

const userInfo = JSON.parse(localStorage.getItem('user') ?? '');

const useUserStore = create<UserStoreType>((set) => ({
    user: { displayName: userInfo?.displayName, photoURL: userInfo?.photoURL, uid: userInfo?.uid, isAdmin: userInfo?.isAdmin },
    updateUser: (data) => {
        set(() => ({
            user: data,
        }));
    },
}));

// useUserStore.subscribe((state) => console.log('오잉', state));

export default useUserStore;
