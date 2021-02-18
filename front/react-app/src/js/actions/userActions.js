import axios from 'axios';

export const SIGNUP_STARTED = 'SIGNUP_STARTED'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'
export const LOGIN_STARTED = 'LOGIN_STARTED'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const signUp = (state, setError) => {
  return dispatch => {
    dispatch({ type: SIGNUP_STARTED });
    axios.post('http://localhost:3000/auth', {
      'name': state.name,
      'email': state.email,
      'password': state.password,
      'password_confirmation': state.password,
      'confirm_success_url': 'http://localhost:8000/'
    }
      // , {
      // headers: {
      //   'Content-Type': 'application/json'
      // }
      // }
    )
      .then(res => {
        console.log(res);
        console.log(res.data);
        console.log(res.data.data);
        console.log(res.headers);
        console.log(res.headers['access-token']);

        //新規登録後、確認メール送信画面へ遷移
        state.history.push('/signup/confirm');
        dispatch({ type: SIGNUP_SUCCESS, payload: res.data.data});
      })
      .catch(err => {
        console.log(err.response);
        setError(err.response);
        dispatch({ type: SIGNUP_FAILURE, payload: err });
      });
  }
}

export const login = (state, setError) => {
  return dispatch => {
    dispatch({ type: LOGIN_STARTED });
    axios.post('http://localhost:3000/auth/sign_in', {
      'email': state.email,
      'password': state.password,
    }
      // , {
      // headers: {
      //   'Content-Type': 'application/json'
      // }
      // }
    )
      .then(res => {
        console.log(res);
        console.log(res.data);
        console.log(res.headers);

        //ログイン後、ホーム画面へ遷移
        state.history.push('/');
        dispatch({ type: LOGIN_SUCCESS, payload: res.data.data });
      })
      .catch(err => {
        console.log(err.response);
        setError(err.response);
        dispatch({ type: LOGIN_FAILURE, payload: err });
      });
  }
}