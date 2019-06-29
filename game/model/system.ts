import {RunStateType} from '../constant';
import {Game} from './game';

export interface ISystemState {
  games: Game[];
  runState: RunStateType;
}

export const SystemState: ISystemState = {
  games: [],
  runState: RunStateType.STOPPED
};

