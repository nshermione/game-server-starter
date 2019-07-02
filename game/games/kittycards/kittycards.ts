import {IGame} from '../../models/game';
import {SocketCommands} from '../../../shared/core/network';
import {SocketHandler} from '../../../shared/core/network';

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