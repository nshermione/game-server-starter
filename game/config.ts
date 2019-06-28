import * as fs from 'fs';
import {model} from './core/model';

export let Config = {
  env: 'development'
};

export const loadConfig = () => {
  let env = process.env.ENV || Config.env;
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