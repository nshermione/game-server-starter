import {Config, loadConfig} from '../game/config';
import {appUseRoutes} from '../shared/core/routes';
import * as express from 'express';
import {webRoutes} from './routes';
import {createWebLogger} from './logger';

export function createWebApp() {
  const app = express();
  const port = Config.webPort;

  appUseRoutes(app, webRoutes);

  app.listen(port, () => console.log(`Web app running!`));
}

loadConfig()
  .then(() => createWebLogger())
  .then(() => createWebApp());
