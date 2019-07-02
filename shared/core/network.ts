import {Client} from '../../game/models/client';

export interface SocketCommands {
  [event: string]: SocketEvent;
}

export interface SocketHandler {
  listenedEvents: SocketCommands;
}

export interface SocketEvent {
  (client: Client, data: any);
}

export interface SocketData {
  event: string;
  data: any;
}