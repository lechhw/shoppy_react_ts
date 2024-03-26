import { create } from 'zustand';
import { UserType } from '../../types/UserTypes';

interface UserStoreType {
    user: UserType;
    updateUser: (data: UserType) => void;
}

const useUserStore = create<UserStoreType>((set) => ({
    user: null,
    updateUser: (data) => {
        set(() => ({
            user: data,
        }));
    },
}));

// useUserStore.subscribe((state) => console.log('오잉', state));

export default useUserStore;
