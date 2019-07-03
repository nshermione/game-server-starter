export let KEYS = {
  COUNT: 'count',
  NAME: 'name',
  MESSAGE: 'message',
  ID: 'id',
  API: 'api',
  TOKEN: 'token',
  USER_ID: 'userId',
  EMAIL: 'email',
  PASSWORD: 'password'
};

export let MESSAGES = {
  INVALID_TOKEN: 'Token is expired or invalid',
};

export let ERROR_TYPES = {
  AUTH_FAILED: 'Auth error'
};

export const HEADERS = {
  TOKEN: 'token'
};

export const EVENTS = {
  SET_CLIENT_INFO: 'setClientInfo',
  CONNECT: 'connection',
  DISCONNECT: 'disconnect',
  RECONNECT: 'reconnect',
  LOGIN: 'login',
  LOGIN_SUCCESS: 'loginSuccess',
  PLAY_GAME: 'playGame'
};

export enum ACTIONS {

}

export enum RunStateType {
  STARTING,
  STARTED,
  STOPPING,
  STOPPED
}