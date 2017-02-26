import React, { PropTypes } from 'react';

const Icon = ({ icon }) =>
  <span className={`ion-${icon}`} />;

Icon.propTypes = {
  icon: PropTypes.string.isRequired
};

export default Icon;
