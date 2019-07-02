import * as WebSocket from 'ws';
import {Config} from '../config';
import * as uuidv4 from 'uuid/v4';
import {Client} from '../models/client';
import {User} from '../../db/mappers/user';
import {gameLogger} from './game.logger';
import {Lobby} from '../controllers/lobby';
import {SocketData, SocketHandler} from '../../shared/core/network';

let wsServer: any;
let httpServer: any;

export class ServerSocket {
  static sendOne(client: Client, data: SocketData) {
    client.socket.send(JSON.stringify(data));
  }

  static sendList(clients: Client[], data: SocketData) {
    for (let client of clients) {
      ServerSocket.sendOne(client, data);
    }
  }

  /**
   * Send to all clients of system (all games)
   * @param data
   */
  static boardcast(data: SocketData) {
    for (let client of wsServer.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    }
  }

  static close() {
    return new Promise((resolve) => {
      if (httpServer) {
        httpServer.close(() => {
          resolve();
        });
      } else if (wsServer) {
        wsServer.close(() => {
          resolve();
        });
      }
    })
  }
}

function dispatchEvent(target: SocketHandler, client: Client, json) {
  let eventFunc = target.listenedEvents[json.event];
  if (eventFunc) {
    eventFunc.call(target, client, json.data);
  }
}

export function createWebSocket(server?) {
  if (server) {
    wsServer = new WebSocket.Server({server});
    httpServer = server;
  } else {
    wsServer = new WebSocket.Server({port: Config.socketPort});
  }

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
          dispatchEvent(Lobby, client, json);
        } catch (e) {
          gameLogger.error('Error on receive message', e);
        }
      }
    });
  });

  if (server) {
    server.listen(Config.socketPort);
  }
}