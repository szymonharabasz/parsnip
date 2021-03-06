import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { projects, tasks, page } from "./reducers";
import { devToolsEnhancer } from "redux-devtools-extension";
import createSageMiddleware from 'redux-saga';
import rootSaga from './sagas';

const rootReducer = (state = {}, action) => {
    return {
        projects: projects(state.projects, action),
        tasks: tasks(state.tasks, action),
        page: page(state.page, action)
    }
};

const sagaMiddleware = createSageMiddleware();

const store = createStore(
    rootReducer,
    compose(applyMiddleware(thunk, sagaMiddleware), devToolsEnhancer()));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default;

        ReactDOM.render(
            <Provider store={store}>
                <NextApp/>
            </Provider>,
            document.getElementById('root')
        );
    });

    module.hot.accept('./reducers', () => {
        const nextRootReducer = require('./reducers').default;
        store.replaceReducer(nextRootReducer);
    });
}
