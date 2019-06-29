import {loadConfig} from '../../game/config';
import {createWebSocket, ServerSocket} from '../../game/services/socket';
import {createLogger} from '../../game/services/logger';

beforeAll(async () => {
  await loadConfig()
    .then(() => createLogger())
    .then(() => createWebSocket());
});

afterAll(() => {
  ServerSocket.close();
});

test('connection', () => {
  expect(true).toBe(true);
});