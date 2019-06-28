import {Room} from './room';
import {RunState} from '../constant';

export class ServerState {
  rooms: Room[] = [];
  runState: RunState
}

export const AppData = new ServerState();

