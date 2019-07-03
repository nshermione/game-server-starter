import {RouteMiddleware} from '../shared/core/routes';
import {ERROR_TYPES, HEADERS, KEYS, MESSAGES} from '../shared/constant';
import * as jwt from 'jsonwebtoken';
import {Config} from '../game/config';
import {User} from '../db/mappers/user';
import {logger} from '../shared/core/logger';
import {errorResponse} from '../shared/core/error';

export class ApiGuard implements RouteMiddleware {
  process(req, res, next?) {
    let token = req.header(HEADERS.TOKEN);
    jwt.verify(token, Config.apiSecret, (err, payload) => {
      if (err) {
        res.json(errorResponse(MESSAGES.INVALID_TOKEN));
      } else {
        let userId = payload[KEYS.USER_ID];
        User.findOne({
          where: {
            [KEYS.ID]: userId,
            [KEYS.API]: true
          }
        }).then(user => {
          if (user) {
            next();
          } else {
            res.json({
              message: MESSAGES.INVALID_TOKEN,
              name: ERROR_TYPES.AUTH_FAILED
            });
          }
        });

      }
    });
  }
}