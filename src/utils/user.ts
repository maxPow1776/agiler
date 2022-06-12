import { IProfile } from '../context/ProfileContext';

export const getUserName = (user: IProfile) => {
    let result = user.lastname;
    if (user.firstname) {
        result += ` ${user.firstname[0]}.`;
    }
    if (user.middlename) {
        result += ` ${user.middlename[0]}.`;
    }
    return result;
};
