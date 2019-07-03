import * as winston from 'winston';
import {Config} from '../config';
import {Logger} from 'winston';
import {setLogger} from '../../shared/core/logger';

let gameLogger: Logger;

export function createGameLogger() {
  gameLogger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: {service: 'user-service'},
    transports: [
      new winston.transports.File({filename: 'logs/game-error.log', level: 'error'}),
    ]
  });

  if (Config.env == 'development') {
    gameLogger.add(new winston.transports.Console({format: winston.format.simple()}));
    gameLogger.add(new winston.transports.File({filename: 'logs/game-info.log'}));
  }

  setLogger(gameLogger);
  return gameLogger;
}