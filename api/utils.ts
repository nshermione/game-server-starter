import {Config} from '../game/config';
import {appUseRoutes} from '../shared/core/routes';
import {apiRoutes} from './routes';
import * as express from 'express';

let server;

export function creatApiApp() {
  return new Promise(resolve => {
    const app = express();
    const port = Config.apiPort;

    app.use(express.json());

    appUseRoutes(app, apiRoutes);

    server = app.listen(port, () => {resolve()});
  });
}

export function shutdownApiApp() {
  return new Promise(resolve => {
    if (server) {
      server.close(() => {
        resolve();
      });
    } else {
      resolve()
    }
  });
}
