import * as fs from 'fs';
import {ObjectUtils} from '../shared/core/utils';

export let Config = {
  env: 'development',
  socketPort: 5000,
  apiPort: 5001,
  apiSecret: "fd37b4b54205b3f0afc9004fa1100374",
  apiExpires: 60 * 60,
  webPort: 5002,
  games: [
    {
      gameId: 1,
      filePath: 'kittycards/kittycards.js',
      className: 'KittyCards'
    }
  ]
};

export const loadConfig = () => {
  let env = process.env.NODE_ENV || Config.env;
  let configFile = `config/${env}.json`;
  return new Promise<any>(resolve => {
    fs.readFile(configFile, (err, data) => {
      if (!err) {
        let dataString = data.toString();
        if (dataString) {
          ObjectUtils.merge(Config, JSON.parse(dataString));
        }

      }
      resolve();
    });
  });
};