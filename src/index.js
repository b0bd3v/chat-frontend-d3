import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { API_WS_ROOT, DEV_API_WS_ROOT } from './constants';
import { ActionCableProvider } from 'react-actioncable-provider';

let apiWS

if (process.env.NODE_ENV === 'development') {
    apiWS = DEV_API_WS_ROOT
} else {
    apiWS = API_WS_ROOT
}

ReactDOM.render(
    <ActionCableProvider url={apiWS}>
        <App />
    </ActionCableProvider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
