import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';


import reducer from './store/reducers/auth';

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/*
 * second argument is an enhancer
 * we must use an enhancer to handle the middleware of this application.
 */
const store = createStore(reducer, composeEnhances(
    /*
     * handle middleware in here.
     */
    applyMiddleware(thunk)
));

const app = (
    /*
     * bring in the provider
     * provider is what we use to wrap our app component.
     * specify the store we are using too.
     * our reducer handles all of the state manipulation.
     */
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();