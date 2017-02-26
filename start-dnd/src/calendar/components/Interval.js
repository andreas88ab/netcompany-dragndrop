import React, { PropTypes } from 'react';

const Interval = ({
  interval
}) =>
  <div className="interval">
    {interval}
  </div>;

Interval.propTypes = {
  interval: PropTypes.string.isRequired
};

export default Interval;
