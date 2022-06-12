import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../../utils/auth';
import { AUTH_HOST, AUTH_PROVIDER } from '../../utils/properties';

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const token = auth();
    if (!token) {
        return (
            <Navigate
                to={`${AUTH_HOST}/connect/${AUTH_PROVIDER}`}
                state={{ from: location }}
                replace
            />
        );
    }
    return children;
};
