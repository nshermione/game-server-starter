import {Logger} from 'winston';
import * as winston from 'winston';
import {Config} from '../game/config';
import {setLogger} from '../shared/core/logger';

let apiLogger: Logger;

export function createApiLogger() {
  apiLogger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: {service: 'bot-service'},
    transports: [
      new winston.transports.File({filename: 'logs/bot-error.log', level: 'error'}),
    ]
  });

  if (Config.env == 'development') {
    apiLogger.add(new winston.transports.Console({format: winston.format.simple()}));
    apiLogger.add(new winston.transports.File({filename: 'logs/bot-info.log'}));
  }

  setLogger(apiLogger);
  return apiLogger;
}