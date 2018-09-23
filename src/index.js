
/* eslint-disable import/first */
import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'

import promiseMiddleware from 'redux-promise';
import multi from 'redux-multi'
import thunk from 'redux-thunk'

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import reducers from './reducers'

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = applyMiddleware(multi, thunk, promiseMiddleware)(createStore)(reducers, devTools)

ReactDOM.render(<Provider store={store}> 
        <App/> 
    </Provider> 
    , document.getElementById('root'));
registerServiceWorker();
