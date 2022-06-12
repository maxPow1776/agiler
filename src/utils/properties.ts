// TODO: get from .env
const UI_HOST = 'http://localhost:3001';
const GATEWAY_HOST = 'http://localhost:1337';
const AUTH_HOST = 'http://localhost:1337';
const AUTH_PROVIDER = 'keycloak';

// LOGOUT
const realm = 'agiler';
const redirectUri = 'http://localhost:3001';
const AUTH_HOST_LOGOUT = `https://auth-agiler.better-call-soul.com/auth/realms/${realm}/protocol/openid-connect/logout?redirect_uri=${redirectUri}`;

export { GATEWAY_HOST, AUTH_HOST, AUTH_PROVIDER, AUTH_HOST_LOGOUT, UI_HOST };
