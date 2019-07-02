import {Logger} from 'winston';
import * as winston from 'winston';
import {Config} from '../game/config';

export let botLogger: Logger;

export function createBotLogger() {
  botLogger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: {service: 'bot-service'},
    transports: [
      new winston.transports.File({filename: 'logs/bot-error.log', level: 'error'}),
    ]
  });

  if (Config.env == 'development') {
    botLogger.add(new winston.transports.Console({format: winston.format.simple()}));
    botLogger.add(new winston.transports.File({filename: 'logs/bot-info.log'}));
  }

  return botLogger;
}