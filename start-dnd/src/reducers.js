import objectAssign from 'object-assign';
import calendarReducers from './calendar/reducers/';

const reducers = objectAssign(
  calendarReducers
);

export default reducers;
