import {
  GET_BOOK_STARTED,
  GET_BOOK_FAILURE,
  GET_BOOK_SUCCESS,
} from '../actions/bookActions';

const initialState = {
  book: {},
  fetching: false,
  fetched: false,
  error: null,
}

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOK_STARTED: {
      return { ...state, fetching: true };
    }
    case GET_BOOK_FAILURE: {
      return { ...state, fetching: false, error: action.payload };
    }
    case GET_BOOK_SUCCESS: {
      return { ...state, fetching: false, fetched:true, book: action.payload };
    }
  
  }
  return state;
}

export default bookReducer;