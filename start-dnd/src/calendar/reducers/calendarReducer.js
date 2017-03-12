import moment from 'moment';
import {
  STATUS_TYPE_1,
  STATUS_TYPE_2,
  STATUS_TYPE_3,
  MOVE_EVENT } from '../constants';

const defaultState = {
  timeInterval: 30,
  lists: [
    {
      id: 1,
      events: [
        {
          id: 1,
          title: 'Item 1',
          eventStartTime: moment('2017-02-20T08:00:00'),
          eventEndTime: moment('2017-02-20T09:00:00'),
          type: STATUS_TYPE_1
        },
        {
          id: 2,
          title: 'Item 2',
          eventStartTime: moment('2017-02-20T10:00:00'),
          eventEndTime: moment('2017-02-20T11:00:00'),
          type: STATUS_TYPE_2
        },
        {
          id: 3,
          title: 'Item 3',
          eventStartTime: moment('2017-02-20T13:00:00'),
          eventEndTime: moment('2017-02-20T15:00:00'),
          type: STATUS_TYPE_3
        }
      ]
    },
    {
      id: 2,
      events: [
        {
          id: 4,
          title: 'Item 4',
          eventStartTime: moment('2017-02-21T11:00:00'),
          eventEndTime: moment('2017-02-21T13:00:00'),
          type: STATUS_TYPE_1
        },
        {
          id: 5,
          title: 'Item 5',
          eventStartTime: moment('2017-02-21T15:00:00'),
          eventEndTime: moment('2017-02-21T16:00:00'),
          type: STATUS_TYPE_2
        }
      ]
    },
    {
      id: 3,
      events: []
    },
    {
      id: 4,
      events: []
    },
    {
      id: 5,
      events: []
    }
  ]
};

function getCollidingEvent(list, event, nextTop) {
  return nextTop;
}

export default function calendarReducer(state = defaultState, action) {
  switch (action.type) {
    case MOVE_EVENT: {
      const newLists = state.lists;
      const { lastX, nextX, nextTop, id } = action;
      const event = newLists[lastX].events.find((e) => e.id === id);

      const newNextTop = getCollidingEvent(newLists[nextX], event, nextTop);

      const eventTemp = Object.assign({}, event, {
        top: newNextTop,
        listNo: nextX
      });
      const index = newLists[lastX].events.indexOf(event);
      newLists[lastX].events.splice(index, 1);
      newLists[nextX].events.push(eventTemp);
      return Object.assign({}, state, {
        lists: newLists
      });
    }
    default:
      return state;
  }
}
