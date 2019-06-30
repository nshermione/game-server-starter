import {loadConfig} from './config';
import {createLogger} from './services/logger';
import {createWebSocket} from './services/socket';
import {createDatabase} from './utils';

loadConfig()
  .then(() => createLogger())
  .then(() => createDatabase())
  .then(() => createWebSocket());
