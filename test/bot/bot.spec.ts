import {Config, loadConfig} from '../../game/config';
import {createBotLogger} from '../../bot/bot.logger';
import {createBotApp} from '../../bot/bot.app';

const port = 6005;
const wsUrl = 'ws://localhost:' + port;

beforeAll(async () => {
  await loadConfig()
    .then(() => {
      Config.socketPort = port;
    })
    .then(() => createBotLogger())
    .then(() => createBotApp());
});

afterAll(() => {
});

test('connection', (done) => {

}, 1000);

test('close', (done) => {

}, 1000);