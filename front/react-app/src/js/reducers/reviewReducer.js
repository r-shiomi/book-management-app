import {
  CREATE_REVIEW_STARTED,
  CREATE_REVIEW_FAILURE,
  CREATE_REVIEW_SUCCESS,
} from '../actions/reviewActions';

const initialState = {
  fetching: false,
  fetched: false,
  error: null,
}

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_REVIEW_STARTED: {
      return { ...state, fetching: true };
    }
    case CREATE_REVIEW_FAILURE: {
      return { ...state, fetching: false, error: action.payload };
    }
    case CREATE_REVIEW_SUCCESS: {
      return { ...state, fetching: false, fetched:true };
    }
  
  }
  return state;
}

export default reviewReducer;