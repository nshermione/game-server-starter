import {db} from '../../game/services/db';
import * as iconv from 'iconv-lite';
import {loadConfig} from '../../game/config';
import {createLogger} from '../../game/services/logger';
import {User} from '../../game/mappers/user';
import {createDatabase} from '../../game/utils';

// BEGIN temporary fix conflict: mysql2 + jest
iconv.encodingExists('foo');
// END fix

beforeAll(async () => {
  await loadConfig()
    .then(() => createLogger())
    .then(() => createDatabase())
    .then(() => {
      let user = User.build({
        displayName: 'thinhth23',
        email: 'thinhth23@gmail.com',
        createdDate: new Date(),
        updatedDate: new Date()
      });
      return user.save();
    });
});

afterAll(async () => {
  await User.destroy({
    where: {}
  });
  db.close();
});

test('findAll', async () => {
  let users = await User.findAll();
  expect(users).not.toBeNull();
  expect(users).not.toBeUndefined();
});

test('findUser', async () => {
  let user = await User.findOne({
    where: {displayName: 'thinhth23'}
  });
  expect(user).not.toBeNull();
});