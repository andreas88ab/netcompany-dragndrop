import React, { PropTypes } from 'react';
import Event from './Event';

const styles = {
  display: 'inline-block'
};

const EventDragPreview = (props) => {
  styles.width = `${props.event.clientWidth || 100}px`;
  styles.height = `${props.event.clientHeight || 100}px`;
  return (
    <div style={styles}>
      <Event {...props.event.event} />
    </div>
  );
};

EventDragPreview.propTypes = {
  event: PropTypes.object
};

EventDragPreview.defaultProps = {
  event: {}
};

export default EventDragPreview;
