import {Config, loadConfig} from '../../game/config';
import {createWebSocket, ServerSocket} from '../../game/services/game.socket';
import {createGameLogger} from '../../game/services/logger';
import * as WebSocket from 'ws';
import {createDatabase} from '../../game/utils';
import {EVENTS, KEYS} from '../../shared/constant';
import {User} from '../../db/mappers/user';
import {db} from '../../db/db';
import * as md5 from 'md5';

const port = 6001;
const wsUrl = 'ws://localhost:' + port;

beforeAll(async () => {
  await loadConfig()
    .then(() => {
      Config.socketPort = port;
    })
    .then(() => createGameLogger())
    .then(() => createDatabase())
    .then(() => createWebSocket());
});

afterAll(async () => {
  await ServerSocket.close();
  db.close();
});

test('client info', (done) => {
  const ws = new WebSocket(wsUrl);
  ws.on('open', () => {
    ws.on('message', (data) => {
      let json = JSON.parse(data);
      expect(json.event).toBe(EVENTS.SET_CLIENT_INFO);
      done();
    });
    ws.send(JSON.stringify({
      event: EVENTS.SET_CLIENT_INFO,
      data: {}
    }));
  });
}, 1000);

test('login new user', (done) => {
  const ws = new WebSocket(wsUrl);
  ws.on('open', () => {
    ws.on('message', (data) => {
      let json = JSON.parse(data);
      switch (json.event) {
        case EVENTS.SET_CLIENT_INFO:
          ws.send(JSON.stringify({
            event: EVENTS.LOGIN,
            data: {
              [KEYS.EMAIL]: 'thinhth23@gmail.com',
              [KEYS.PASSWORD]: md5('123456')
            }
          }));
          break;
        case EVENTS.LOGIN_SUCCESS:
          done();
          break;
      }
    });
    ws.send(JSON.stringify({
      event: EVENTS.SET_CLIENT_INFO,
      data: {}
    }));
  });
}, 2000);