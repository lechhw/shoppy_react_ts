import React from 'react';
import styles from './Button.module.scss';

interface OwnProps {
    text: string;
    onClick: () => void;
}

const Button = ({ text, onClick }: OwnProps) => {
    return (
        <button className={styles['ui-button']} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;
