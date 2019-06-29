import {RunStateType} from '../constant';
import {Game} from './game';
import {Client} from './client';

export interface ISystemState {
  games: Game[];
  clients: Client[],
  runState: RunStateType;
}

export const SystemState: ISystemState = {
  games: [],
  clients: [],
  runState: RunStateType.STOPPED
};

