import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import * as reducers from './reducers';
import effects from './effects';

const sagaMiddleware = createSagaMiddleware();

// Creates a store for all reducers
const store = createStore(
  combineReducers(reducers),
  applyMiddleware(sagaMiddleware)
);

//Init effects/sagas
sagaMiddleware.run(effects);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
