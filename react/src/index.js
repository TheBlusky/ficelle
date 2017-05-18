import React from 'react';
import ReactDOM from 'react-dom';
import {MuiThemeProvider} from "material-ui";

import FicelleBar from "./components/FicelleBar";
import FicelleRouter from "./router";

import injectTapEventPlugin from 'react-tap-event-plugin';

import { Provider } from 'react-redux'
import {createStore, applyMiddleware, combineReducers} from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducers'
import saga from './sagas'

import './index.css';
import FicelleSnackbar from "./components/FicelleSnackbar";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    combineReducers({ficelle: reducer}),
    applyMiddleware(sagaMiddleware),
);
sagaMiddleware.run(saga);

injectTapEventPlugin();

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <div>
        <FicelleBar />
        <br />
        <FicelleRouter />
        <br />
        <FicelleSnackbar />
      </div>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
