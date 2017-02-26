import moment from 'moment';
import { SHOW_DAY, SHOW_WEEK, UPDATE_NOW_TIME } from '../constants';

const defaultState = {
  showDay: true,
  showWeek: false,
  showEventsFromDate: moment(),
  nowTime: moment()
};

export default function dayIntervalReducer(state = defaultState, action) {
  switch (action.type) {
    case SHOW_DAY: {
      return {
        showDay: true,
        showWeek: false
      };
    }
    case SHOW_WEEK: {
      return {
        showDay: false,
        showWeek: true
      };
    }
    case UPDATE_NOW_TIME: {
      return Object.assign({}, state, {
        nowTime: moment()
      });
    }
    default:
      return state;
  }
}
