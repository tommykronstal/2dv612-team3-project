import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import * as reducers from './reducers'
import {BrowserRouter as Router} from 'react-router-dom'
import {Route} from 'react-router'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import * as reducers from './reducers'
import effects from './effects'
import {injectGlobal} from 'styled-components'

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Nunito');
`

const sagaMiddleware = createSagaMiddleware()

// Creates a store for all reducers
const store = createStore(
  combineReducers(reducers),
  applyMiddleware(sagaMiddleware),
)

// Setting all elements to 0 margin and 0 padding by default.
injectGlobal`
  * {
    margin: 0;
    padding: 0;
  }
`

//Init effects/sagas
sagaMiddleware.run(effects)

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Route path="/" component={App} />
    </Provider>
  </Router>,
  document.getElementById('root'),
)

registerServiceWorker()
