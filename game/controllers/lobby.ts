import {EVENTS, KEYS} from '../constant';
import {ServerSocket} from '../services/game.socket';
import {Client} from '../models/client';
import {User} from '../../db/mappers/user';
import {SocketHandler} from '../../shared/core/network';

export const Lobby: SocketHandler = {
  listenedEvents: {
    [EVENTS.SET_CLIENT_INFO]: (client: Client, data) => {
      ServerSocket.sendOne(client, {
        event: EVENTS.SET_CLIENT_INFO,
        data: {}
      })
    },
    [EVENTS.LOGIN]: async (client: Client, data) => {
      let email = data[KEYS.EMAIL];
      let password = data[KEYS.PASSWORD];
      let user = await User.findOne({
        where: {
          email: email,
          password: password
        }
      });
      if (user) {
        ServerSocket.sendOne(client, {
          event: EVENTS.LOGIN_SUCCESS,
          data: {}
        })
      }
    },
    [EVENTS.PLAY_GAME]: (client: Client, data) => {

    },
  }
};