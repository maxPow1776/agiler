import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoStartPage from '../StartPage/LogoStartPage/LogoStart';
import s from './HeaderLogin.module.css';

const HeaderLogin = () => {
    return (
        <header className={s.header}>
            <div className={s.headerContent}>
                <LogoStartPage />
                <NavLink to={'/app'}>LOG IN</NavLink>
            </div>
        </header>
    );
};

export default HeaderLogin;
