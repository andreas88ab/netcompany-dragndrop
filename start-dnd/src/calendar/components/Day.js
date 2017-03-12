import React, { PropTypes, Component } from 'react';
import Events from './Events';
import shallowEqual from '../actions/shallowEqual';

class Day extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState);
  }

  render() {
    const {
      item,
      moveEvent,
      x
    } = this.props;
    return (
      <div id="calendar-content-events-day" className="calendar-content-events-day">
        <Events
          moveEvent={moveEvent}
          events={item.events}
          x={x}
        />
      </div>
    );
  }
}

Day.propTypes = {
  x: PropTypes.number.isRequired,
  item: PropTypes.shape().isRequired,
  moveEvent: PropTypes.func.isRequired
};

export default Day;
