import { createStore, combineReducers, compose } from 'redux';
import reducers from './reducers';

const store = createStore(
  combineReducers(reducers),
  compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default store;
