import React, { PropTypes } from 'react';
import CalendarHeader from './CalenderHeader';
import CalendarContent from './CalendarContent';

const Calendar = ({
  dayView,
  intervals,
  lists,
  moveEvent
}) =>
  <div className="calendar">
    <CalendarHeader
      dayView={dayView}
    />
    <CalendarContent
      intervals={intervals}
      lists={lists}
      moveEvent={moveEvent}
    />
  </div>;

Calendar.propTypes = {
  dayView: PropTypes.func.isRequired,
  moveEvent: PropTypes.func.isRequired,
  intervals: PropTypes.arrayOf(PropTypes.shape()),
  lists: PropTypes.arrayOf(PropTypes.shape()).isRequired
};

Calendar.defaultProps = {
  intervals: []
};

export default Calendar;
