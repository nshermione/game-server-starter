import {Client} from './client';

export class Room {
  clients: Client[];
  roomId: number;
  gameId: number;
}