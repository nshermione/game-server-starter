import {loadConfig} from '../game/config';
import {createApiLogger} from './logger';
import {createDatabase} from '../game/utils';
import {creatApiApp} from './utils';

loadConfig()
  .then(() => createApiLogger())
  .then(() => createDatabase())
  .then(() => creatApiApp());
