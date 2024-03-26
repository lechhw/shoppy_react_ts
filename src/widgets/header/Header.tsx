import styles from './Header.module.scss';
import { CiShop } from 'react-icons/ci';
import { FaPen } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { login, logout, onUserStateChange } from '../../features/auth/Auth';
import useUserStore from '../../entities/user/UserStore';
import { useEffect } from 'react';
import User from '../../shared/user/User';
import Button from '../../shared/ui/button/Button';

const Header = () => {
    const { user, updateUser } = useUserStore();

    useEffect(() => {
        onUserStateChange((user) => updateUser(user));
    }, []);

    return (
        <div className={styles.header}>
            <Link to="/" className={styles.logo}>
                <CiShop />
                <h1>Shoppy</h1>
            </Link>
            <div className={styles.linkWrap}>
                <Link to={'/products'}>Products</Link>

                {user && (
                    <>
                        <Link to={'/carts'}>Carts</Link>
                        {user.isAdmin && (
                            <Link to={'/products/new'}>
                                <FaPen />
                            </Link>
                        )}
                        <User user={user} />
                    </>
                )}
                {!user && <Button text="Login" onClick={login} />}
                {user && <Button text="Logout" onClick={logout} />}
            </div>
        </div>
    );
};

export default Header;
