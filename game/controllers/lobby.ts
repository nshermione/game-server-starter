import {EVENTS} from '../constant';
import {SocketHandler} from '../services/socket';

export const Lobby: SocketHandler = {
  listenedEvents: {
    [EVENTS.LOGIN]: (data) => {

    },
    [EVENTS.PLAY_GAME]: (data) => {

    },
  }
};