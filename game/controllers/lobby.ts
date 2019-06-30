import {EVENTS} from '../constant';
import {ServerSocket, SocketHandler} from '../services/socket';
import {Client} from '../models/client';

export const Lobby: SocketHandler = {
  listenedEvents: {
    [EVENTS.SET_CLIENT_INFO]: (client: Client, data) => {
      ServerSocket.emit(client, {
        event: EVENTS.SET_CLIENT_INFO,
        data: {}
      })
    },
    [EVENTS.LOGIN]: (data) => {

    },
    [EVENTS.PLAY_GAME]: (data) => {

    },
  }
};