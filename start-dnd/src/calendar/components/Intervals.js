import React, { PropTypes } from 'react';
import Interval from './Interval';

const Intervals = ({
  intervals
}) =>
  <div className="intervals">
    {intervals.map((interval) =>
      <Interval
        key={interval.id}
        interval={interval.time.format('HH:mm')}
      />
    )}
  </div>;

Intervals.propTypes = {
  intervals: PropTypes.arrayOf(PropTypes.shape()).isRequired
};

export default Intervals;
