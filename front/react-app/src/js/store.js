import { applyMiddleware, createStore, compose } from "redux";

import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { createPromise } from 'redux-promise-middleware';
import persistState from 'redux-localstorage';

import reducer from "./reducers";

const promise = createPromise({ types: { fulfilled: 'success' } });
const middleware = compose(applyMiddleware(promise, thunk, createLogger()), persistState("userReducer"));

export default createStore(reducer, middleware);