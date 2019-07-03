import * as jwt from 'jsonwebtoken';
import {Config} from './game/config';

var token = jwt.sign({foo: 'bar'}, Config.apiSecret, {
  expiresIn: 60 * 60 //1 hour
});

setTimeout(() => {
  jwt.verify(token, Config.apiSecret, (err, payload) => {
    if (err) {
      console.log("Verify token failed: ", err);
    }
    console.log(payload);
  });
}, 2000);



