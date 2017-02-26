import { MOVE_EVENT } from '../constants';

export default function moveEvent(lastX, lastTop, nextX, nextTop, id) {
  return {
    type: MOVE_EVENT, lastX, lastTop, nextX, nextTop, id
  };
}
