import React from 'react';
import s from './CardGroup.module.css';

type CardGroupProps = {
    group: string[];
};

const CardGroup: React.FC<CardGroupProps> = ({ group }) => {
    return (
        <div className={s.card}>
            <div className={s.infoBox}>
                {group.map((item, index) => {
                    return <p key={index}>{item}</p>;
                })}
            </div>
        </div>
    );
};

export default CardGroup;
