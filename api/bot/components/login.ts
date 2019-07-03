import {RouteComponent} from '../../../shared/core/routes';
import * as jwt from 'jsonwebtoken';
import {KEYS} from '../../../shared/constant';
import {Config} from '../../../game/config';
import {User} from '../../../db/mappers/user';
import {errorResponse} from '../../../shared/core/error';

export class ApiLoginComponent implements RouteComponent {
  process(req, res, next?): any {
    User.findOne({
      where: {
        [KEYS.EMAIL]: req.body[KEYS.EMAIL],
        [KEYS.PASSWORD]: req.body[KEYS.PASSWORD]
      }
    }).then((user: User) => {
      if (user) {
        let token = jwt.sign({
          [KEYS.USER_ID]: user.id
        }, Config.apiSecret, {expiresIn: Config.apiExpires});

        res.json({
          [KEYS.TOKEN]: token
        });
      } else {
        res.json(errorResponse("Auth failed"));
      }
    });
  }
}