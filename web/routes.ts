import {Route} from '../shared/core/routes';
import {HomeComponent} from './components/home';


export const webRoutes: Route[] = [
  {
    path: '/add',
    method: 'post',
    components: [new HomeComponent()]
  }
];