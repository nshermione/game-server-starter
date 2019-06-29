import {IGame} from '../../models/game';
import {SocketCommands, SocketHandler} from '../../services/socket';

export class KittyCards implements IGame, SocketHandler {
  gameName = 'kittycards';

  pause() {
  }

  resume() {
  }

  start() {
  }

  stop() {
  }

  listenedEvents: SocketCommands = {
  };
}