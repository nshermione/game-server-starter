import {KEYS} from '../constant';

export function errorResponse(msg) {
  return {
    [KEYS.MESSAGE]: this.message
  }
}