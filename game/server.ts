import {loadConfig} from './config';
import * as http from 'http';
import {createLogger, logger} from './services/logger';
import {createWebSocket} from './services/socket';
import {db, MySQLProvider} from '../lib/core/db';
import {createMapping} from './mappers/mappings';

function createDatabase() {
  db.useProvider(MySQLProvider);
  createMapping();
  return db.auth();
}

loadConfig()
  .then(() => createLogger())
  .then(() => createDatabase())
  .then(() => createWebSocket);
