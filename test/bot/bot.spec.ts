import {Config, loadConfig} from '../../game/config';
import {createApiLogger} from '../../api/logger';
import {createDatabase} from '../../game/utils';
import {db} from '../../db/db';
import {User} from '../../db/mappers/user';
import {creatApiApp, shutdownApiApp} from '../../api/utils';
import * as md5 from 'md5';
import * as request from 'request';
import {KEYS} from '../../shared/constant';

const port = 6005;
const apiUrl = 'http://localhost:' + port;

beforeAll(async () => {
  await loadConfig()
    .then(() => {
      Config.apiPort = port;
    })
    .then(() => createApiLogger())
    .then(() => createDatabase())
    .then(() => initDB())
    .then(() => creatApiApp());
});

function initDB() {
  let user = User.build({
    displayName: 'thinhth23',
    password: md5('123456'),
    email: 'thinhth23@gmail.com',
    api: true,
    createdDate: new Date(),
    updatedDate: new Date()
  });
  return user.save();
}

afterAll(async () => {
  await shutdownApiApp();
  await User.destroy({
    where: {}
  });
  db.close();
});

function auth(): Promise<any> {
  return new Promise<any>((resolve: any) => {
    request({
      url: apiUrl + '/auth',
      method: 'POST',
      json: {
        [KEYS.EMAIL]: 'thinhth23@gmail.com',
        [KEYS.PASSWORD]: md5('123456')
      }
    }, (err, res, body) => {
      resolve({err, body});
    });
  });
}


test('auth', (done) => {
  auth().then((res) => {
    expect(res.err).toBeNull();
    expect(res.body[KEYS.TOKEN]).not.toBeNull();
    expect(res.body[KEYS.TOKEN]).not.toBeUndefined();
    done();
  });
});

test('bot count', (done) => {
  auth().then((res) => {
    request({
      url: apiUrl + '/bot/count',
      method: 'GET',
      json: true,
      headers: {
        [KEYS.TOKEN]: res.body[KEYS.TOKEN]
      }
    }, (err, res, body) => {
      expect(err).toBeNull();
      expect(body[KEYS.COUNT]).toBe(0);
      done();
    });
  });
});

