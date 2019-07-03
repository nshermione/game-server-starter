import {Logger} from 'winston';
import * as winston from 'winston';
import {Config} from '../game/config';
import {setLogger} from '../shared/core/logger';

let webLogger: Logger;

export function createWebLogger() {
  webLogger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: {service: 'web-service'},
    transports: [
      new winston.transports.File({filename: 'logs/web-error.log', level: 'error'}),
    ]
  });

  if (Config.env == 'development') {
    webLogger.add(new winston.transports.Console({format: winston.format.simple()}));
    webLogger.add(new winston.transports.File({filename: 'logs/web-info.log'}));
  }

  setLogger(webLogger);
  return webLogger;
}