import {
  SIGNUP_STARTED,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE
} from '../actions/userActions';

const initialState = {
  user: {
    id: null,
    name: null,
    age: null,
  },
  isSigningup: false,
  isSignedup: false,
  error: null,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_STARTED: {
      return { ...state, isSigningup: true };
    }
    case SIGNUP_FAILURE: {
      return { ...state, isSigningup: false, error: action.payload };
    }
    case SIGNUP_SUCCESS: {
      return { ...state, isSigningup: false, isSignedup: true, user: action.payload };
    }
  }
  return state;
}

export default userReducer;