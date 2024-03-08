import React from 'react';
import styles from './Header.module.scss';
import { CiShop } from 'react-icons/ci';
import { FaPen } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { login } from '../../features/firebase';

const Header = () => {
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
                <button onClick={() => login()}>Login</button>
            </div>
        </div>
    );
};

export default Header;
