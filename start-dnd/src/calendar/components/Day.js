import React, { PropTypes, Component } from 'react';
import { DropTarget, DragSource } from 'react-dnd';
import flow from 'lodash/flow';
import Events from './Events';
import shallowEqual from './shallowEqual';
import {
  LIST
} from './ItemTypes';

const listSource = {
  beginDrag(props) {
    return {
      id: props.id,
      x: props.x
    };
  }
};

const listTarget = {
  canDrop() {
    return false;
  }
};

class Day extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState);
  }

  render() {
    const {
      connectDropTarget,
      connectDragSource,
      item,
      moveEvent,
      x
    } = this.props;
    return (
      connectDragSource(connectDropTarget(
        <div id="calendar-content-events-day" className="calendar-content-events-day">
          <Events
            moveEvent={moveEvent}
            events={item.events}
            x={x}
          />
        </div>))
    );
  }
}

Day.propTypes = {
  x: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  item: PropTypes.shape().isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  moveEvent: PropTypes.func.isRequired
};

export default flow([
  DropTarget(LIST, listTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  })),
  DragSource(LIST, listSource, (connectDragSource, monitor) => ({
    connectDragSource: connectDragSource.dragSource()
  }))
])(Day);
