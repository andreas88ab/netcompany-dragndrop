import React, { PropTypes } from 'react';
import Intervals from './Intervals';
import CalendarContentEvents from './CalendarContentEvents';

const CalendarContent = ({
  intervals,
  lists,
  moveEvent
}) =>
  <div className="calendar-content">
    <Intervals
      intervals={intervals}
    />
    <CalendarContentEvents
      intervals={intervals}
      lists={lists}
      moveEvent={moveEvent}
    />
  </div>;

CalendarContent.propTypes = {
  intervals: PropTypes.arrayOf(PropTypes.shape()),
  lists: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  moveEvent: PropTypes.func.isRequired
};

CalendarContent.defaultProps = {
  intervals: []
};

export default CalendarContent;
