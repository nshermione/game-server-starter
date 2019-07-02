import {Config, loadConfig} from '../game/config';
import {createBotLogger} from './bot.logger';
import * as express from 'express';
import {appUseRoutes} from '../shared/core/routes';
import {botRoutes} from './bot.routes';

export function createBotApp() {
  const app = express();
  const port = Config.botPort;

  app.get('/', (req, res) => res.send('Hello World!'));

  appUseRoutes(app, botRoutes);

  app.listen(port, () => console.log(`Bot app running!`));
}

loadConfig()
  .then(() => createBotLogger())
  .then(() => createBotApp());
