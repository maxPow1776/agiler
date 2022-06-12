import React from 'react';
import testAva from '../../images/test_ava.png';
import s from './CardUser.module.css';

export type CardUserProps = {
    user: {
        name: string;
        job: string;
        email: string;
        img?: string;
    };
};

const CardUser = ({ user }: CardUserProps) => {
    return (
        <div className={s.card}>
            <img
                src={user.img ? user.img : testAva}
                alt={'фото пользователя'}
            />
            <div className={s.infoBox}>
                <p>{user.name}</p>
                <p>{user.job}</p>
                <p>{user.email}</p>
            </div>
        </div>
    );
};

export default CardUser;
