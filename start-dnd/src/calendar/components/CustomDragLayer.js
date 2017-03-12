import React, { Component, PropTypes } from 'react';
import { DragLayer } from 'react-dnd';

import EventDragPreview from './EventDragPreview';
import snapToGrid from '../actions/snapToGrid';
import {
  EVENT
} from './ItemTypes';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100000
};

function getItemStyles(props) {
  const width = document.getElementById('calendar-content-events-day').offsetWidth;
  const { initialOffset, currentOffset } = props;
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none'
    };
  }

  let { x, y } = currentOffset;
  if (props.snapToGrid) {
    x -= initialOffset.x;
    y -= initialOffset.y;
    const { nextTop, nextX } = snapToGrid(x, y, width);
    x = initialOffset.x + nextX;
    y = initialOffset.y + nextTop;
  }

  const transform = `translate(${x}px, ${y}px)`;
  return {
    WebkitTransform: transform,
    transform
  };
}

class CustomDragLayer extends Component {
  renderItem(type, item) {
    switch (type) {
      case EVENT:
        return (
          <EventDragPreview event={item} />
        );
      default:
        return null;
    }
  }

  render() {
    const { item, itemType, isDragging } = this.props;

    if (!isDragging) {
      return null;
    }


    return (
      <div style={layerStyles}>
        <div style={getItemStyles(this.props)}>
          {this.renderItem(itemType, item)}
        </div>
      </div>
    );
  }
}

CustomDragLayer.propTypes = {
  item: PropTypes.object,
  itemType: PropTypes.string,
  initialOffset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }),
  currentOffset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }),
  isDragging: PropTypes.bool.isRequired,
  snapToGrid: PropTypes.bool.isRequired
};

CustomDragLayer.defaultProps = {
  item: {},
  itemType: EVENT,
  initialOffset: {},
  currentOffset: {}
};

export default DragLayer((monitor) => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging()
}))(CustomDragLayer);
