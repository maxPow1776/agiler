import React from 'react';
import styles from './Logo.module.css';

export const HeaderLogo = () => {
    return (
        <div className={styles.logoContainer}>
            <div className={styles.logo}>Agiler</div>
        </div>
    );
};
