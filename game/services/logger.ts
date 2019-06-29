import * as winston from 'winston';
import {Config} from '../config';
import {Logger} from 'winston';

export let logger: Logger;

export function createLogger() {
  logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: {service: 'user-service'},
    transports: [
      new winston.transports.File({filename: 'logs/game-error.log', level: 'error'}),
    ]
  });

  if (Config.env == 'development') {
    logger.add(new winston.transports.Console({format: winston.format.simple()}));
    logger.add(new winston.transports.File({filename: 'logs/game-info.log'}));
  }

  return logger;
}