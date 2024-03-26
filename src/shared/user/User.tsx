import React from 'react';
import { UserType } from '../../types/UserTypes';
import styles from './User.module.scss';

interface OwnProps {
    user: UserType;
}

const User = ({ user }: OwnProps) => {
    return (
        <div className={styles.avatar}>
            <img src={!user?.photoURL ? '' : user.photoURL} alt={!user?.displayName ? '' : user.displayName} />
            <span>{user?.displayName}</span>
        </div>
    );
};

export default User;
