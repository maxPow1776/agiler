import React from 'react';
import testAva from '../../images/test_ava.png';
import s from './GeneralCardGroup.module.css';

export type GeneralCGProps = {
    group: {
        name: string;
        duty: string;
        location: string;
        img?: string;
    };
};

const GeneralCardGroup = ({ group }: GeneralCGProps) => {
    return (
        <div className={s.card}>
            <img src={group.img ? group.img : testAva} alt={'фото группы'} />
            <div className={s.infoBox}>
                <p>{group.name}</p>
                <p>{group.duty}</p>
                <p>{group.location}</p>
            </div>
        </div>
    );
};

export default GeneralCardGroup;
