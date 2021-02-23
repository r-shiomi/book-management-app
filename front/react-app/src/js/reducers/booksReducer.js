import {
  SEARCH_STARTED,
  SEARCH_FAILURE,
  SEARCH_SUCCESS,
} from '../actions/booksActions';

const initialState = {
  books: [],
  fetching: false,
  fetched: false,
  error: null,

}

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_STARTED: {
      return { ...state, fetching: true };
    }
    case SEARCH_FAILURE: {
      return { ...state, fetching: false, error: action.payload };
    }
    case SEARCH_SUCCESS: {
      return { ...state, fetching: false, fetched:true, books: action.payload };
    }
      
  }
  return state;
}

export default booksReducer;