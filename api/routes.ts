import {AddBotComponent} from './bot/components/add';
import {Route} from '../shared/core/routes';
import {RemoveBotComponent} from './bot/components/remove';
import {CountBotComponent} from './bot/components/count';
import {ApiGuard} from './guard';
import {ApiLoginComponent} from './bot/components/login';


let guard = new ApiGuard();

export const apiRoutes: Route[] = [
  {
    path: '/auth',
    method: 'post',
    components: [new ApiLoginComponent]
  },
  {
    path: '/bot/add',
    method: 'post',
    components: [guard, new AddBotComponent()]
  },
  {
    path: '/bot/remove',
    method: 'post',
    components: [guard, new RemoveBotComponent()]
  },
  {
    path: '/bot/count',
    components: [guard, new CountBotComponent()]
  }
];