import {RouteComponent} from '../../../shared/core/routes';
import {KEYS} from '../../../shared/constant';

export class CountBotComponent implements RouteComponent {
  process(req, res, next?) {
    res.json({
      [KEYS.COUNT]: 0
    })
  }
}