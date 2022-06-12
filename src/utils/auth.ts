import cookie from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { AUTH_HOST, AUTH_PROVIDER, AUTH_HOST_LOGOUT } from './properties';

const JWT_TOKEN_KEY = 'jwtToken';
const USER_INFO = 'userInfo';

interface Token {
    exp: number;
}

export const auth = () => {
    let token = cookie.get(JWT_TOKEN_KEY);
    if (token) {
        const decodedToken: Token = jwtDecode(token);
        const currentTimestamp = Math.floor(new Date().getTime() / 1000.0);
        if (decodedToken.exp <= currentTimestamp) {
            token = undefined;
        }
    } else {
        token = undefined;
    }
    if (!token) {
        window.location.href = `${AUTH_HOST}/connect/${AUTH_PROVIDER}`;
    }
    return token;
};

export const login = (token: string) => {
    cookie.set(JWT_TOKEN_KEY, token, { expires: 1 });
    // cookie.set(REFRESH_TOKEN_KEY, refreshToken);
};

export const getJWT = () => {
    return cookie.get(JWT_TOKEN_KEY);
};

export const getUserData = () => {
    return cookie.get(USER_INFO);
};

export const setUserData = (user: any) => {
    const me = user;
    cookie.set(USER_INFO, JSON.stringify(me), { expires: 1 });
};

export const getLoginHref = () => `${AUTH_HOST}/connect/${AUTH_PROVIDER}/`;

export const logout = () => {
    cookie.remove(JWT_TOKEN_KEY);
    cookie.remove(USER_INFO);
    // to support logging out from all windows
    window.localStorage.setItem('logout', Date.now().toString());
    window.location.href = AUTH_HOST_LOGOUT;
};
