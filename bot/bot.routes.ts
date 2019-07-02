import {AddBotComponent} from './components/add.bot';
import {Route} from '../shared/core/routes';
import {RemoveBotComponent} from './components/remove.bot';
import {CountBotComponent} from './components/count.bot';

export const botRoutes: Route[] = [
  {
    path: '/add',
    method: 'post',
    component: new AddBotComponent()
  },
  {
    path: '/remove',
    method: 'post',
    component: new RemoveBotComponent()
  },
  {
    path: '/count',
    component: new CountBotComponent()
  }
];