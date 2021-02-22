import {
  SEARCH_STARTED,
  SEARCH_FAILURE,
  SEARCH_SUCCESS,
} from '../actions/booksActions';

const initialState = {
  books: [],
  loading: false,
  error: null,
}

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_STARTED: {
      return { ...state, loading: true };
    }
    case SEARCH_FAILURE: {
      return { ...state, loading: false, error: action.payload };
    }
    case SEARCH_SUCCESS: {
      return { ...state, loading: false, books: action.payload };
    }
      
  }
  return state;
}

export default booksReducer;