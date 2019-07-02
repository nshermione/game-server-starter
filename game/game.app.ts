import {loadConfig} from './config';
import {createGameLogger} from './services/game.logger';
import {createWebSocket} from './services/game.socket';
import {createDatabase} from './utils';

loadConfig()
  .then(() => createGameLogger())
  .then(() => createDatabase())
  .then(() => createWebSocket());
