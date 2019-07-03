import {Room} from './room';
import {RunStateType} from '../../shared/constant';

export interface IGame {
  start();
  pause();
  resume();
  stop();
}

export class Game {
  gameId = -1;
  gameName = '';
  rooms: Room[] = [];
  runState: RunStateType = RunStateType.STOPPED;
}