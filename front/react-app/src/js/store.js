import { applyMiddleware, createStore, compose } from "redux";

import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { createPromise } from 'redux-promise-middleware';
import persistState from 'redux-localstorage';

import reducer from "./reducers";

const promise = createPromise({ types: { fulfilled: 'success' } });

const middleware = (process.env.NODE_ENV === 'production') ?
  compose(applyMiddleware(promise, thunk), persistState(["userReducer", "booksReducer"]))
  :
  compose(applyMiddleware(promise, thunk,createLogger()), persistState(["userReducer", "booksReducer"]));

export default createStore(reducer, middleware);