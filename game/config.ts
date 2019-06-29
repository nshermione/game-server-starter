import * as fs from 'fs';
import {model} from '../lib/core/model';

export let Config = {
  env: 'development',
  socketPort: 5000,
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
        let json = data.toJSON();
        model.merge(Config, json);
      }
      resolve();
    });
  });
};