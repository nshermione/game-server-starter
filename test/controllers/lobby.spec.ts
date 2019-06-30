import {loadConfig} from '../../game/config';
import {createWebSocket, ServerSocket} from '../../game/services/socket';
import {createLogger} from '../../game/services/logger';
import * as WebSocket from 'ws';
import {createDatabase} from '../../game/utils';
import {EVENTS} from '../../game/constant';

const wsUrl = 'ws://localhost:6000';

beforeAll(async () => {
  await loadConfig()
    .then(() => createLogger())
    .then(() => createDatabase())
    .then(() => createWebSocket());
});

afterAll(async () => {
  await ServerSocket.close();
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