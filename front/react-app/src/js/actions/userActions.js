import axios from 'axios';

export const SIGNUP_STARTED = 'SIGNUP_STARTED'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'

export const signupStarted = () => {
  return {
    type: SIGNUP_STARTED
  }
}

export const signupSuccess = (data) => {
  return {
    type: SIGNUP_SUCCESS,
    payload: data
  }
}

export const signupFailure = (err) => {
  return {
    type: SIGNUP_FAILURE,
    payload: err
  }
}

export const signUp = (state) => {
  return dispatch => {
    dispatch(signupStarted());
    axios.post('http://localhost:3000/auth', {
      'name': state.name,
      'email': state.email,
      'password': state.password,
      'password_confirmation': state.password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        console.log(res.data);
        dispatch(signupSuccess(res.data));
      })
      .catch(err => {
        console.log(err.response);
        
        dispatch(signupFailure(err));

      });
  }
}

