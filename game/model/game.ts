import {Room} from './room';
import {RunStateType} from '../constant';

export interface IGame {
  start();
  pause();
  resume();
  stop();
  handleCommands();
}

export class Game {
  gameId = -1;
  gameName = '';
  rooms: Room[] = [];
  runState: RunStateType = RunStateType.STOPPED;
}