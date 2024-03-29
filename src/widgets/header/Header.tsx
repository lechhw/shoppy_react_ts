import styles from './Header.module.scss';
import { CiShop } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { login, logout, onUserStateChange } from '../../features/auth/Auth';
import useUserStore from '../../entities/user/UserStore';
import { useEffect } from 'react';
import User from '../../shared/user/User';
import { Button } from 'antd';
import { SettingFilled } from '@ant-design/icons';

const Header = () => {
    const { user, updateUser } = useUserStore();

    useEffect(() => {
        onUserStateChange((user) => {
            updateUser(user);
            localStorage.setItem('user', JSON.stringify(user));
        });
    }, []);

    return (
        <div className={styles.header}>
            <Link to="/" className={styles.logo}>
                <CiShop />
                <h1>Shoppy</h1>
            </Link>
            <div className={styles.linkWrap}>
                <Link to={'/products'}>
                    <Button type="link" className={styles.linkBtn}>
                        Products
                    </Button>
                </Link>

                {user && (
                    <>
                        <Link to={'/carts'}>
                            <Button type="link" className={styles.linkBtn}>
                                Carts
                            </Button>
                        </Link>
                        {user.isAdmin && (
                            <Link to={'/products/new'}>
                                <Button type="link" icon={<SettingFilled />} className={styles.linkBtn}></Button>
                            </Link>
                        )}
                        <User user={user} />
                    </>
                )}
                {!user && (
                    <Button type="primary" size="small" onClick={login}>
                        Login
                    </Button>
                )}
                {user && (
                    <Button type="primary" size="small" onClick={logout}>
                        Logout
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Header;
