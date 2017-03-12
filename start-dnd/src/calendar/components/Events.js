import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import snapToGrid from '../actions/snapToGrid';
import DraggableEvent from './DraggableEvent';
import shallowEqual from '../actions/shallowEqual';
import {
  EVENT
} from './ItemTypes';

const specs = {
  drop(props, monitor) {
    document.getElementById(monitor.getItem().id).style.display = 'block';
    const delta = monitor.getDifferenceFromInitialOffset();
    const lastX = monitor.getItem().x;
    const lastTop = monitor.getItem().event.top;
    const id = monitor.getItem().event.id;
    const nextX = props.x;
    const width = document.getElementById('calendar-content-events-day').offsetWidth;
    const top = Math.round(lastTop + delta.y);
    const { nextTop } = snapToGrid(nextX, top, width);
    // TODO: check if position is equal

    props.moveEvent(lastX, lastTop, nextX, nextTop, id);
  }
};


class Events extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState);
  }

  render() {
    const { events, connectDropTarget, x } = this.props;
    return connectDropTarget(
      <div className="events">
        {
          events.map((event) =>
            <DraggableEvent
              key={event.id}
              id={event.id}
              event={event}
              x={x}
            />
          )
        }
      </div>,
    );
  }
}

Events.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(PropTypes.shape()),
  x: PropTypes.number.isRequired
};

Events.defaultProps = {
  events: []
};

export default DropTarget(EVENT, specs, (connectDragSource, monitor) => ({
  connectDropTarget: connectDragSource.dropTarget(),
  item: monitor.getItem()
}))(Events);
