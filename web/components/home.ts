import {RouteComponent} from '../../shared/core/routes';

export class HomeComponent implements RouteComponent {
  process(req, res, next?): any {
    res.send('Web app!')
  }
}