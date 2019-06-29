import {User} from '../mappers/user';

export class Client {
  id!: number;
  user: User;
  socket;
  gameId;
  isPlaying;
}