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
      //
      // - Write to all logs with level `info` and below to `combined.log`
      // - Write all logs error (and below) to `error.log`.
      //
      new winston.transports.File({filename: 'logs/error.log', level: 'logs/error'}),
    ]
  });

  if (Config.env == 'development') {
    logger.add(new winston.transports.Console({format: winston.format.simple()}));
    logger.add(new winston.transports.File({filename: 'combined.log'}));
  }

  return logger;
}