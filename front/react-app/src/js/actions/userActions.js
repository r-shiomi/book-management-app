import axios from 'axios';

export const SIGNUP_STARTED = 'SIGNUP_STARTED'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'
export const LOGIN_STARTED = 'LOGIN_STARTED'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const RESET_PASSWORD_STARTED = 'RESET_PASSWORD_STARTED'
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS'
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE'
export const CHANGE_PASSWORD_STARTED = 'CHANGE_PASSWORD_STARTED'
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS'
export const CHANGE_PASSWORD_FAILURE= 'CHANGE_PASSWORD_FAILURE'

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
        state.history.replace('/signup/confirm');
        dispatch({ type: SIGNUP_SUCCESS, payload: res.data.data });
      })
      .catch(err => {
        console.log(err.response);
        setError(err.response);
        dispatch({ type: SIGNUP_FAILURE, payload: err });
      });
  }
}

export const login = (state, setErrorText) => {
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
        setErrorText(err.response.data.errors[0]);
        dispatch({ type: LOGIN_FAILURE, payload: err });
      });
  }
}

export const resetPassword = (state, setErrorText) => {
  return dispatch => {
    dispatch({ type: RESET_PASSWORD_STARTED });
    axios.post('http://localhost:3000/auth/password', {
      'email': state.email,
      'redirect_url': 'http://localhost:8000/password/change/',
    })
      .then(res => {
        console.log(res);

        //パスワードリセット画面で登録メールを送信後、確認メール送信画面へ遷移
        state.history.replace('/password-reset/confirm');
        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: res.data.message });
      })
      .catch(err => {
        console.log(err.response);
        setErrorText(err.response.data.errors[0]);
        dispatch({ type: RESET_PASSWORD_FAILURE, payload: err });
      });
  }
}

export const changePassword = (state, setErrorText) => {
  return dispatch => {
    dispatch({ type: CHANGE_PASSWORD_STARTED });
    axios.put('http://localhost:3000/auth/password', {
      'password': state.password,
      'password_confirmation': state.passwordConfirmation,
    })
      .then(res => {
        console.log(res);

        //パスワードリセット画面で登録メールを送信後、確認メール送信画面へ遷移
        state.history.replace('/password-reset/confirm');
        dispatch({ type: CHANGE_PASSWORD_SUCCESS, payload: res.data.data });
      })
      .catch(err => {
        console.log(err.response);
        setErrorText(err.response.data.errors[0]);
        dispatch({ type: CHANGE_PASSWORD_FAILURE, payload: err });
      });
  }
}