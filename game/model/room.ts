import {Client} from './client';

export class RoomState {
  type: number;
}

export class BoardState extends RoomState {
  timeout: number;
}

export class Room {
  clients: Client[];
  roomId: number;
  gameId: number;
  roomState: RoomState;
}