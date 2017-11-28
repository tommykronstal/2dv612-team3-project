import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import createSagaMiddleware from 'redux-saga'
import {BrowserRouter as Router} from 'react-router-dom'
import {Route} from 'react-router'
import App from './App'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import * as reducers from './reducers'
import effects from './effects'
import {injectGlobal} from 'styled-components'

const sagaMiddleware = createSagaMiddleware()

// Creates a store for all reducers
const store = createStore(
  combineReducers(reducers),
  applyMiddleware(sagaMiddleware),
)

// Setting all elements to 0 margin and 0 padding by default.
injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Nunito');

  body {
    background-color: rgb(240, 240, 240);
  }

  * {
    margin: 0;
    padding: 0;
  }

  .fade-enter {
    transform: scale(0);
  }

  .fade-enter.fade-enter-active {
    transform: scale(1);
    transition: transform 400ms;
  }

  .fade-exit {
    transform: scale(1);
  }

  .fade-exit.fade-exit-active {
    transform: scale(0);
    transition: transform 400ms;
  }
`

// Init effects/sagas
sagaMiddleware.run(effects)

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Route path='/' component={App} />
    </Provider>
  </Router>,
  document.getElementById('root'),
)

registerServiceWorker()
