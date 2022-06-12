import React from 'react';

export interface IProfileRole {
    name: string;
}
export interface IProfile {
    firstname?: string;
    middlename?: string;
    lastname?: string;
    role?: IProfileRole;
    id?: string;
    email?: string;
}

export const ProfileContext = React.createContext<IProfile>({});
