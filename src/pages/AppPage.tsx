import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { ProfileContext } from '../context/ProfileContext';

export const AppPage = () => {
    const user = useContext(ProfileContext);

    let content = <div>Загрузка</div>;

    if (user) {
        let newLocation = '/';
        if (user.role!.name.toLowerCase() === 'manager') {
            newLocation = '/manager';
        } else if (user.role!.name.toLowerCase() === 'developer') {
            newLocation = '/developer';
        }
        content = <Navigate to={newLocation} />;
    }

    return content;
};
