import * as WebSocket from 'ws';
import {Config} from '../config';
import * as uuidv4 from 'uuid/v4';
import {Client} from '../models/client';
import {User} from '../mappers/user';
import {logger} from './logger';
import {Lobby} from '../controllers/lobby';

let wsServer: any;

export interface SocketCommands {
  [event: string]: any;
}

export interface SocketHandler {
  listenedEvents: SocketCommands;
}

export class ServerSocket {
  static emit(client: Client, data) {
    client.socket.send(JSON.stringify(data));
  }

  static close() {
    wsServer.close();
  }
}

function dispatchEvent(target: SocketHandler, json) {
  let eventFunc = target.listenedEvents[json.event];
  if (eventFunc) {
    eventFunc.call(target, json.data);
  }
}

export function createWebSocket() {
  wsServer = new WebSocket.Server({port: Config.socketPort});

  wsServer.on('connection', (ws) => {
    let client = new Client();
    client.id = uuidv4();
    client.user = User.build({
      id: uuidv4(), email: '', createdDate: new Date(), updatedDate: new Date()
    });
    client.socket = ws;
    client.isPlaying = false;
    ws.on('message', (message) => {
      if (message) {
        try {
          let json = JSON.parse(message);
          dispatchEvent(Lobby, json);
        } catch (e) {
          logger.error('Error on receive message', e);
        }
      }
    });

    // ws.send('something');
  });
}