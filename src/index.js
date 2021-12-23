import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import Modal from 'react-modal';

import {makeServer} from "./mock/mock-service";

import App from './App';
import reportWebVitals from './reportWebVitals';

if (!process.env.REACT_APP_PROXY) {
    makeServer();
}
Modal.setAppElement('#root');

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals(console.log);
