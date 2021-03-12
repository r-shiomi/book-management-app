import {
  SIGNUP_STARTED,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_STARTED,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  RESET_PASSWORD_STARTED,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
} from '../actions/userActions';

const initialState = {
  user: {
    id: null,
    email: null,
    name: null,
    age: null,
  },
  message: null,
  loading: false,
  isLoggedin: false,
  error: null,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_STARTED: {
      return { ...state, loading: true };
    }
    case SIGNUP_FAILURE: {
      return { ...state, loading: false, error: action.payload };
    }
    case SIGNUP_SUCCESS: {
      return { ...state, loading: false, user: action.payload };
    }
      
    case LOGIN_STARTED: {
      return { ...state, loading: true };
    }
    case LOGIN_FAILURE: {
      return { ...state, loading: false, error: action.payload };
    }
    case LOGIN_SUCCESS: {
      return { ...state, loading: false, isLoggedin: true, user: action.payload };
    }
      
    case RESET_PASSWORD_STARTED: {
      return { ...state, loading: true };
    }
    case RESET_PASSWORD_FAILURE: {
      return { ...state, loading: false, error: action.payload };
    }
    case RESET_PASSWORD_SUCCESS: {
      return { ...state, loading: false, message: action.payload };
    }
      
  }
  return state;
}

export default userReducer;