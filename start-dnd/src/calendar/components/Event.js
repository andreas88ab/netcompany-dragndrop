import React, { Component, PropTypes } from 'react';
import shallowEqual from '../actions/shallowEqual';

function getStyles(props) {
  console.log(props);
  const { top, height } = props;
  const transform = `translate3d(0, ${top}px, 0)`;

  return {
    position: 'absolute',
    transform,
    WebkitTransform: transform,
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    height
  };
}

class Event extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState);
  }

  render() {
    return (
      <div className="event" id={this.props.id} style={getStyles(this.props)}>
        {this.props.eventStartTime.format('DD.MM.YYYY-HH:mm')} - {this.props.eventEndTime.format('DD.MM.YYYY-HH:mm')}
      </div>
    );
  }
}

Event.propTypes = {
  eventEndTime: PropTypes.shape().isRequired,
  eventStartTime: PropTypes.shape().isRequired,
  id: PropTypes.number.isRequired
};

export default Event;
