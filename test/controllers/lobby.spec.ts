import {Config, loadConfig} from '../../game/config';
import {createWebSocket, ServerSocket} from '../../game/services/socket';
import {createLogger} from '../../game/services/logger';
import * as WebSocket from 'ws';
import {createDatabase} from '../../game/utils';
import {EVENTS, KEYS} from '../../game/constant';
import {User} from '../../game/mappers/user';
import {db} from '../../game/services/db';
import * as md5 from 'md5';

const port = 6001;
const wsUrl = 'ws://localhost:' + port;

beforeAll(async () => {
  await loadConfig()
    .then(() => {
      Config.socketPort = port;
    })
    .then(() => createLogger())
    .then(() => createDatabase())
    .then(() => {
      let user = User.build({
        displayName: 'thinhth23',
        email: 'thinhth23@gmail.com',
        password: md5('123456'),
        createdDate: new Date(),
        updatedDate: new Date()
      });
      return user.save();
    })
    .then(() => createWebSocket());
});

afterAll(async () => {
  await ServerSocket.close();
  await User.destroy({
    where: {}
  });
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