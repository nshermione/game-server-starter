import * as http from 'http';
import {db, MySQLProvider} from './services/db';
import {createMapping} from './mappers/mappings';

export function createDatabase() {
  db.useProvider(MySQLProvider);
  createMapping();
  return db.auth();
}

export function createServer() {
  return http.createServer();
}