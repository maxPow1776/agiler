import React from 'react';
import { useQuery } from 'react-query';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';
import { CenteredSpinner } from '../components/Spinner/CenteredSpinner';
import { ProfileContext } from '../context/ProfileContext';
import { SynchronizationContext } from '../context/SynchronizationContext';
import { getJWT } from '../utils/auth';
import { GATEWAY_HOST } from '../utils/properties';
import { AppPage } from './AppPage';
import Developer from './Developer/Developer';
import { ForbiddenPage } from './ForbiddenPage';
import Manager from './Manager/Manager';
import { NotFoundPage } from './NotFoundPage';
import SettingsPage from './SettingsPage/SettingsPage';

export const AuthPage = () => {
    const jwt = getJWT();

    const { isLoading: isProfileLoading, data: profile } = useQuery(
        [`get-profile`],
        () =>
            fetch(`${GATEWAY_HOST}/users/me`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    'Content-Type': 'application/json',
                },
            }).then((res) => res.json()),
        {
            // The query will not execute until the userId exists
            refetchOnWindowFocus: false,
            refetchOnMount: true,
            refetchOnReconnect: false,
            retry: false,
            initialData: null,
        }
    );

    const { isLoading: isSynchronizationLoading, data: synchronization } =
        useQuery([`get-synchronization`], () =>
            fetch(`${GATEWAY_HOST}/synchronizations`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => res.json())
                .then((res) =>
                    res.reduce(
                        (max: number, sync: any) =>
                            sync.id > max ? sync.id : max,
                        0
                    )
                )
        );

    return !profile ||
        isProfileLoading ||
        !synchronization ||
        isSynchronizationLoading ? (
        <CenteredSpinner />
    ) : (
        <ProfileContext.Provider value={profile}>
            <SynchronizationContext.Provider value={synchronization}>
                <Routes>
                    <Route path='/app' element={<AppPage />} />
                    <Route path='/manager' element={<Layout />}>
                        <Route index element={<Manager />} />
                    </Route>
                    <Route path='/developer' element={<Layout />}>
                        <Route index element={<Developer />} />
                    </Route>
                    <Route path='/settings' element={<Layout />}>
                        <Route index element={<SettingsPage />} />
                    </Route>
                    <Route path='/403' element={<ForbiddenPage />} />
                    <Route path='*' element={<NotFoundPage />} />
                </Routes>
            </SynchronizationContext.Provider>
        </ProfileContext.Provider>
    );
};
