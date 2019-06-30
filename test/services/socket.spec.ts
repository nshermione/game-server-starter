import {loadConfig} from '../../game/config';
import {createWebSocket, ServerSocket} from '../../game/services/socket';
import {createLogger} from '../../game/services/logger';
import * as WebSocket from 'ws';
import {createDatabase} from '../../game/utils';

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

test('connection', (done) => {
  const ws = new WebSocket(wsUrl);
  ws.on('open', () => {
    done();
  });
}, 1000);

test('close', (done) => {
  const ws = new WebSocket(wsUrl);
  ws.on('open', () => {
    ws.close();
  });
  ws.on('close', () => {
    done();
  })
}, 1000);