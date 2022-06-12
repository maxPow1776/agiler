import React, { useEffect, useState } from 'react';
import qs from 'qs';
import { Navigate } from 'react-router-dom';
import { GATEWAY_HOST } from '../utils/properties';
import { login, setUserData } from '../utils/auth';

export const SignedInPage = () => {
    const params = qs.parse(window.location.search, {
        ignoreQueryPrefix: true,
    });

    const newParams = {
        access_token: params.access_token,
    };

    const url = `${GATEWAY_HOST}/auth/keycloak/callback?${qs.stringify(
        newParams
    )}`;
    // const url = `${GATEWAY_HOST}/auth/keycloak/callback`;

    const [user, setUser] = useState(null as any);

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            const response = await fetch(url, {
                method: 'GET',
            });
            const result = await response.json();
            if (result.jwt && isMounted) {
                const profileResponse = await fetch(
                    `${GATEWAY_HOST}/users/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${result.jwt}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                const profile = await profileResponse.json();
                login(result.jwt);
                setUserData(profile);
                setUser(profile);
            }
        };

        fetchData();
        return () => {
            isMounted = false;
        };
    }, [url, params]);

    let content = <div>Загрузка</div>;
    if (user) {
        let newLocation = '/';
        if (user.role.name.toLowerCase() === 'manager') {
            newLocation = '/manager';
        } else if (user.role.name.toLowerCase() === 'developer') {
            newLocation = '/developer';
        }
        content = <Navigate to={newLocation} />;
    }

    return content;
};
