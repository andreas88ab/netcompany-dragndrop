import React, { PropTypes, Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import shallowEqual from './shallowEqual';
import Day from './Day';

class CalendarContentEvents extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState);
  }

  render() {
    const { lists, moveEvent } = this.props;

    return (
      <div className="calendar-content-events-days">
        {
          lists.map((item, i) =>
            <Day
              key={item.id}
              id={item.id}
              x={i}
              item={item}
              moveEvent={moveEvent}
            />)
        }
      </div>
    );
  }
}

CalendarContentEvents.propTypes = {
  intervals: PropTypes.arrayOf(PropTypes.shape()),
  lists: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  moveEvent: PropTypes.func.isRequired
};

CalendarContentEvents.defaultProps = {
  intervals: []
};

export default DragDropContext(HTML5Backend)(CalendarContentEvents);
