import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import Event from './Event';
import {
  EVENT
} from './ItemTypes';

const eventSource = {
  beginDrag(props, monitor, component) {
    // dispatch to redux store that drag is started
    const { event, x } = props;
    const { id, title } = event;
    const { clientWidth, clientHeight } = findDOMNode(component);

    return { id, title, event, x, clientWidth, clientHeight };
  },
  endDrag(props, monitor) {
    document.getElementById(monitor.getItem().id).style.display = 'block';
  },
  isDragging(props, monitor) {
    return props.event && props.event.id === monitor.getItem().id;
  }
};

function collectDragSource(connectDragSource, monitor) {
  return {
    connectDragSource: connectDragSource.dragSource(),
    connectDragPreview: connectDragSource.dragPreview(),
    isDragging: monitor.isDragging()
  };
}

class DraggableEvent extends Component {
  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: true
    });
  }

  render() {
    const { isDragging, connectDragSource, event } = this.props;
    return connectDragSource(
      <div>
        <Event
          {...event}
        />
      </div>
    );
  }
}

DraggableEvent.propTypes = {
  event: PropTypes.shape().isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  x: PropTypes.number.isRequired
};

export default DragSource(EVENT, eventSource, collectDragSource)(DraggableEvent);
