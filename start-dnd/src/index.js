import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'moment/locale/nb';
import DayContainer from './calendar/containers/CalendarContainer';
import store from './store';
import './index.scss';

render(
  <Provider store={store}>
    <DayContainer />
  </Provider>,
  document.getElementById('root')
);
