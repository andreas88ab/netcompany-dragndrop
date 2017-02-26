import React, { PropTypes } from 'react';

const CalendarHeader = ({
  dayView
}) =>
  <div className="calendar-header">
    <h1>
      Header
    </h1>
  </div>;

CalendarHeader.propTypes = {
  dayView: PropTypes.func.isRequired
};

CalendarHeader.defaultProps = {
};

export default CalendarHeader;
