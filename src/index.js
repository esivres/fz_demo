import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import Modal from 'react-modal';
import { Provider } from 'react-redux'

import store from './store'

import {makeServer} from "./mock/mock-service";

import App from './App';
import reportWebVitals from './reportWebVitals';

if (!process.env.REACT_APP_PROXY) {
    makeServer();
}
Modal.setAppElement('#root');

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <BrowserRouter>
              <App/>
          </BrowserRouter>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals(console.log);
