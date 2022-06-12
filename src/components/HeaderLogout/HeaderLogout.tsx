import React from 'react';
import footerLogo from '../../images/logo_footer.png';
import s from './HeaderLogout.module.css';

const HeaderLogout = () => {
    return (
        <header className={s.header}>
            <div className={s.headerContent}>
                <img src={footerLogo} alt={'логотип'} />
                <a href={'/home'}>LOG OUT</a>
            </div>
        </header>
    );
};

export default HeaderLogout;
