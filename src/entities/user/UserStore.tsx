import React from 'react';
import { create } from 'zustand';

interface UserType {
    user: { name?: string; uid?: string } | null;
    updateUser: (data: { name?: string; uid?: string } | null) => void;
}

const useUserStore = create<UserType>((set) => ({
    user: {},
    updateUser: (data) => {
        set(() => ({
            user: data,
        }));
    },
}));

export default useUserStore;
