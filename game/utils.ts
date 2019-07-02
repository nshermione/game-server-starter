import * as http from 'http';
import {db, MySQLProvider} from '../db/db';
import {createMapping} from '../db/mappers/mappings';

export function createDatabase() {
  db.useProvider(MySQLProvider);
  createMapping();
  return db.auth();
}

export function createServer() {
  return http.createServer();
}