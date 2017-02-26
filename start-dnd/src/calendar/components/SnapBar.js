import React, { PropTypes, Component } from 'react';

class SnapBar extends Component {
  constructor(props) {
    super(props);
    this.state = { test: 'hei' };
  }

  render() {
    return (
      <div className="calendar-content-snapBar">
        {this.state.test}
      </div>
    );
  }
}

SnapBar.propTypes = {
  intervals: PropTypes.arrayOf(PropTypes.shape())
};

SnapBar.defaultProps = {
  intervals: []
};

export default SnapBar;
