import { connect } from 'react-redux';
import moment from 'moment';
import shortId from 'shortid';
import Calendar from '../components/Calendar';
import showDayCalendar from '../actions/showDayCalendar';
import moveEvent from '../actions/moveEvent';

function getIntervals(start, end, intervalSize) {
  const times = [];
  let runner = start.clone();
  while (runner.toDate().getTime() <= end.toDate().getTime()) {
    times.push({
      id: shortId.generate(),
      time: runner.clone()
    });
    runner = runner.add(intervalSize, 'minutes');
  }

  return times || [];
}

function getEventStartTime(top, start, interval) {
  return start.clone().add('minute', (top / 100) * interval);
}

function getEventEndTime(top, start, interval, height) {
  return start.clone().add('minute', (top / 100) * interval).add('minute', (height / 100) * interval);
}

function overlap(events, event) {
  let shareSpotTemp = 1;
  events.filter(e => e.id !== event.id).map(e2 => {
    const alike = e2.top === event.top;
    const overlapAndAfter = (e2.top + e2.height) > event.top && event.top > e2.top;
    if (alike || overlapAndAfter) {
      // TODO: Sett hvilken spot eventet skal ligge på
      shareSpotTemp += shareSpotTemp;
    }
    return shareSpotTemp;
  });
  return Object.assign({}, event, {
    shareSpot: shareSpotTemp
  });
}

function getEventsWithStyling(start, end, list, intervalSize, intervalsTemp, days) {
  const day = Object.assign({}, list, {
    events: list.events.map((event) => {
      const newStart = event.eventStartTime.clone().startOf('day').add('hour', start.hour()).add('minute', start.minute());
      const newEnd = event.eventEndTime.clone().startOf('day').add('hour', end.hour()).add('minute', end.minute());
      const totalPX = ((intervalSize * (intervalsTemp.length - 1)) / 60) * 100;
      const deltaTotal = newEnd.toDate().getTime() - newStart.toDate().getTime();
      const deltaStart = event.eventStartTime.toDate().getTime() - newStart.toDate()
          .getTime();
      const deltaEnd = event.eventEndTime.toDate().getTime() - newStart.toDate().getTime();
      // Left is based on which day it is
      const topMarginTemp = (deltaStart / deltaTotal) * totalPX;
      const height = ((deltaEnd / deltaTotal) * totalPX) - topMarginTemp;
      const newEventStartDate = getEventStartTime(
        event.top >= 0 ? event.top : topMarginTemp,
        event.listNo ? days[event.listNo].startOf('day').clone().add('hour', start.hour()).add('minute', start.minute()) : newStart,
        intervalSize
      );
      const newEventEndDate = getEventEndTime(event.top >= 0 ? event.top : topMarginTemp,
        event.listNo ? days[event.listNo].startOf('day').clone().add('hour', start.hour()).add('minute', start.minute()) : newStart,
        intervalSize,
        height);
      return Object.assign({}, event, {
        key: shortId.generate(),
        top: event.top >= 0 ? event.top : topMarginTemp,
        height,
        eventStartTime: newEventStartDate,
        eventEndTime: newEventEndDate,
        eventStyles: {
          height: `${height}px`
        }
      });
    })
  });
  const newEventList = day.events.map(e => overlap(day.events, e));
  console.log('newEventList', newEventList);
  const day2 = Object.assign({}, day, {
    events: newEventList
  });
  console.log('day', day, 'day2', day2);
  return day2;
}

const mapStateToProps = (state) => {
  const start = moment().startOf('day').hour(7);
  const end = moment().startOf('day').hour(17);
  const startDate = moment('2017-02-20T00:00:01');
  const days = [];
  for (let i = 0; i < 5; i++) {
    days.push(startDate.clone().add('day', i));
  }
  const intervalSize = 60;
  const intervalsTemp = getIntervals(start, end, intervalSize);
  const listsTemp = state.calendar.lists.map((list) =>
      getEventsWithStyling(start, end, list, intervalSize, intervalsTemp, days)
  );
  return {
    lists: listsTemp,
    intervals: intervalsTemp
  };
};

const mapDispatchToProps = (dispatch) => ({
  dayView: () => dispatch(showDayCalendar()),
  moveEvent: (lastX, lastTop, nextX, nextTop, id) => {
    dispatch(moveEvent(lastX, lastTop, nextX, nextTop, id));
  }
});

const DayContainer =
  connect(mapStateToProps, mapDispatchToProps)(Calendar);

export default DayContainer;
