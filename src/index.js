import React from 'react';
import ReactDOM from 'react-dom';

import keycloak from "./keycloak";
import {ReactKeycloakProvider} from '@react-keycloak/web'
import {BrowserRouter} from "react-router-dom";
import Modal from 'react-modal';
import {Provider} from 'react-redux'

import store from './store'

import {makeServer} from "./mock/mock-service";

import App from './App';
import reportWebVitals from './reportWebVitals';

if (!process.env.REACT_APP_PROXY) {
    makeServer();
}

const eventLogger = (event, error) => {
    console.log('onKeycloakEvent', event, error)
}

const tokenLogger = (tokens) => {
    console.log('onKeycloakTokens', tokens)
}
Modal.setAppElement('#root');

ReactDOM.render(
    <React.StrictMode>
        <ReactKeycloakProvider
            initOptions={{ checkLoginIframe: false , onLogin:'check-sso' }}
            authClient={keycloak}
            onEvent={eventLogger}
            onTokens={tokenLogger}
        >
            <Provider store={store}>
                    <App/>
            </Provider>
        </ReactKeycloakProvider>
    </React.StrictMode>,
    document.getElementById('root')
);


reportWebVitals(console.log);
