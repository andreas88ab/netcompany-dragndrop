import React, { PropTypes } from 'react';
import classNames from 'classnames';

const StaticDateInput = ({
  date,
  styling = '',
  dateFormat
}) =>
  <span className={classNames(styling)}>
    {date.format(dateFormat)}
  </span>;

StaticDateInput.propTypes = {
  date: PropTypes.shape().isRequired,
  styling: PropTypes.string.isRequired,
  dateFormat: PropTypes.string.isRequired
};

export default StaticDateInput;
