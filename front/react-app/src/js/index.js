import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router} from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store.js';
import axios from 'axios';

//APIリクエスト/レスポンス時のトークン設定共通化
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.interceptors.request.use(function (config) {
  const authHeaders = JSON.parse(window.localStorage.getItem('authHeaders'))
  if (authHeaders) {
    console.log("request");
    console.log(authHeaders['access-token']);
    config.headers[config.method] = {
      'access-token': authHeaders['access-token'],
      'client': authHeaders['client'],
      'uid': authHeaders['uid']
    }
  }
  return config;
}, function (error) {
  return Promise.reject(error)
});

axios.interceptors.response.use(function (response) {
  if(response.headers['access-token']) {
    const authHeaders = {
      'access-token': response.headers['access-token'],
      'client': response.headers['client'],
      'uid': response.headers['uid'],
      'expiry': response.headers['expiry'],
      'token-type': response.headers['token-type']
    }
    console.log("response");
    console.log(response);
    console.log(response.headers['access-token']);
    window.localStorage.setItem('authHeaders', JSON.stringify(authHeaders));
  } 
  return response;
}, function (error) {
  return Promise.reject(error)
});


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
          <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
