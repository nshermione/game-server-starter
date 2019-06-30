import {Config, loadConfig} from '../../game/config';
import {createWebSocket, ServerSocket} from '../../game/services/socket';
import {createLogger} from '../../game/services/logger';
import * as WebSocket from 'ws';
import {createDatabase, createServer} from '../../game/utils';

const port = 6002;
const wsUrl = 'ws://localhost:' + port;

beforeAll(async () => {
  await loadConfig()
    .then(() => {
      Config.socketPort = port;
    })
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