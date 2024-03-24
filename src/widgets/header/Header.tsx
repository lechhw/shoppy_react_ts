import styles from './Header.module.scss';
import { CiShop } from 'react-icons/ci';
import { FaPen } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { login, logout, onUserStateChange } from '../../features/auth/Auth';
import useUserStore from '../../entities/user/UserStore';
import { useEffect } from 'react';

const Header = () => {
    const userState = useUserStore((state) => state.user);
    const updateUser = useUserStore((state) => state.updateUser);

    useEffect(() => {
        onUserStateChange((user) => {
            const updated = {
                name: user?.displayName ?? '',
                uid: user?.uid,
            };
            updateUser(updated);
        });
    }, []);

    const handleLogin = () => {
        login().then((data) => {
            const updated = {
                name: data?.displayName ?? '',
                uid: data?.uid,
            };
            updateUser(updated);
        });
    };

    const handleLogout = () => {
        logout().then((result) => result && updateUser(null));
    };
    return (
        <div className={styles.header}>
            <Link to="/" className={styles.logo}>
                <CiShop />
                <h1>Shoppy</h1>
            </Link>
            <div className={styles.linkWrap}>
                <Link to={'/products'}>Products</Link>
                <Link to={'/carts'}>Carts</Link>
                <Link to={'/products/new'}>
                    <FaPen />
                </Link>
                {!userState && <button onClick={handleLogin}>Login</button>}
                {userState && <button onClick={handleLogout}>Logout</button>}
            </div>
        </div>
    );
};

export default Header;
