import Sequelize from 'sequelize';
import {gameLogger} from '../game/services/game.logger';
import * as databases from '../config/database.js';

export interface ISQLProvider {
  createConnection(): Promise<boolean>;

  close();
}

export class MySQLProvider implements ISQLProvider {

  sequelize: any;

  constructor() {
    let databaseConfig = databases[process.env.NODE_ENV];
    this.sequelize = new (<any>Sequelize)(
      databaseConfig.database,
      databaseConfig.username,
      databaseConfig.password, {
        host: databaseConfig.host,
        dialect: databaseConfig.dialect,
        logging: databaseConfig.logging
      });
  }

  createConnection(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.sequelize
        .authenticate()
        .then(() => {
          gameLogger.debug('Connection has been established successfully.');
          resolve(true);
        })
        .catch(err => {
          gameLogger.error('Unable to connect to the database:', err);
          resolve(false);
        });
    });
  }

  close() {
    if (this.sequelize) {
      this.sequelize.close();
    }
  }
}

export class Database {
  private provider: ISQLProvider;

  auth() {
    return this.provider.createConnection();
  }

  close() {
    this.provider.close();
  }

  getSequelize() {
    if (this.provider && (<any>this).provider.sequelize) {
      return (<any>this).provider.sequelize;
    }
  }

  useProvider(providerClass) {
    this.provider = new providerClass();
  }
}

export const db = new Database();