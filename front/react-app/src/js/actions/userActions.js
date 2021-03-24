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
export const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE'
export const GUEST_LOGIN_STARTED = 'GUEST_LOGIN_STARTED'
export const GUEST_LOGIN_SUCCESS = 'GUEST_LOGIN_SUCCESS'
export const GUEST_LOGIN_FAILURE = 'GUEST_LOGIN_FAILURE'
const APP_BASE_URL = (process.env.NODE_ENV === 'production') ? 'http://52.198.232.219' :
'http://localhost:8000'

export const signUp = (state, setError) => {
  return dispatch => {
    dispatch({ type: SIGNUP_STARTED });
    axios.post('/api/auth', {
      'name': state.name,
      'email': state.email,
      'password': state.password,
      'password_confirmation': state.password,
      'confirm_success_url': APP_BASE_URL
    })
      .then(res => {
        //新規登録後、確認メール送信画面へ遷移
        state.history.replace('/signup/confirm');
        dispatch({ type: SIGNUP_SUCCESS, payload: res.data.data });
      })
      .catch(err => {
        setError(err.response);
        dispatch({ type: SIGNUP_FAILURE, payload: err });
      });
  }
}

export const login = (state, setErrorText) => {
  return dispatch => {
    dispatch({ type: LOGIN_STARTED });
    axios.post('/api/auth/sign_in', {
      'email': state.email,
      'password': state.password,
    })
      .then(res => {

        //ログイン後、ホーム画面へ遷移
        state.history.push('/');
        dispatch({ type: LOGIN_SUCCESS, payload: res.data.data });
      })
      .catch(err => {
        setErrorText(err.response.data.errors[0]);
        dispatch({ type: LOGIN_FAILURE, payload: err });
      });
  }
}

export const resetPassword = (state, setErrorText) => {
  return dispatch => {
    dispatch({ type: RESET_PASSWORD_STARTED });
    axios.post('/api/auth/password', {
      'email': state.email,
      'redirect_url': `${APP_BASE_URL}/password/change/`,
    })
      .then(res => {
        //パスワードリセット画面で登録メールを送信後、確認メール送信画面へ遷移
        res.data.success ?
          state.history.replace('/password-reset/confirm') :
          setErrorText("ゲストユーザーのパスワードリセットは行えません");

        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: res.data.message });
      })
      .catch(err => {
        setErrorText(err.response.data.errors[0]);
        dispatch({ type: RESET_PASSWORD_FAILURE, payload: err });
      });
  }
}

export const changePassword = (state, setErrorText) => {
  return dispatch => {
    dispatch({ type: CHANGE_PASSWORD_STARTED });
    axios.put('/api/auth/password', {
      'password': state.password,
      'password_confirmation': state.passwordConfirmation,
    })
      .then(res => {
        //パスワードリセット画面で登録メールを送信後、確認メール送信画面へ遷移
        state.history.replace('/password/change/success');
        dispatch({ type: CHANGE_PASSWORD_SUCCESS, payload: res.data.message });
      })
      .catch(err => {
        if (err.response.data.errors.full_messages) {
          setErrorText(err.response.data.errors.full_messages[0]);
        } else {
          setErrorText(err.response.data.errors[0]);
        }
        dispatch({ type: CHANGE_PASSWORD_FAILURE, payload: err });
      });
  }
}

export const guestLogin = (state) => {
  return dispatch => {
    dispatch({ type: GUEST_LOGIN_STARTED });
    axios.post('/api/auth/guest_sign_in')
      .then(res => {
        const authHeaders = {
          'access-token': res.data.data.token['access-token'],
          'client': res.data.data.token['client'],
          'uid': res.data.data.token['uid'],
          'expiry': res.data.data.token['expiry'],
          'token-type': res.data.data.token['token-type']
        }
        window.localStorage.setItem('authHeaders', JSON.stringify(authHeaders));

        //ログイン後、ホーム画面へ遷移
        state.history.push('/');
        dispatch({ type: GUEST_LOGIN_SUCCESS, payload: res.data.data.user });
      })
      .catch(err => {
        dispatch({ type: GUEST_LOGIN_FAILURE, payload: err });
      });
  }
}
