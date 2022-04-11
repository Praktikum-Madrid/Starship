import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { rootReducer } from 'store/reducers';
// import axios from 'axios';
import App from './components/App';

declare global {
  interface Window {
    INITIAL_STATE?: { auth: any; settings: any; game: any; mode: any };
  }
}

// const axiosInstance = axios.create({
//   baseURL: '',
// });

const state = window.INITIAL_STATE;
delete window.INITIAL_STATE;

const store = createStore(
  rootReducer,
  state,
  compose(
    applyMiddleware(thunk),
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root'),
);
