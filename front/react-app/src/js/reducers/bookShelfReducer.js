import {
  REGISTER_BOOK_STARTED,
  REGISTER_BOOK_FAILURE,
  REGISTER_BOOK_SUCCESS,
  UPDATE_BOOK_SHELF_STATUS_STARTED,
  UPDATE_BOOK_SHELF_STATUS_FAILURE,
  UPDATE_BOOK_SHELF_STATUS_SUCCESS,
  DELETE_BOOK_SHELF_STATUS_STARTED,
  DELETE_BOOK_SHELF_STATUS_FAILURE,
  DELETE_BOOK_SHELF_STATUS_SUCCESS,
} from '../actions/bookShelfActions';

const initialState = {
  fetching: false,
  fetched: false,
  error: null,
}

const bookShelfReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_BOOK_STARTED: {
      return { ...state, fetching: true };
    }
    case REGISTER_BOOK_FAILURE: {
      return { ...state, fetching: false, error: action.payload };
    }
    case REGISTER_BOOK_SUCCESS: {
      return { ...state, fetching: false, fetched: true };
    }
      
    case UPDATE_BOOK_SHELF_STATUS_STARTED: {
      return { ...state, fetching: true };
    }
    case UPDATE_BOOK_SHELF_STATUS_FAILURE: {
      return { ...state, fetching: false, error: action.payload };
    }
    case UPDATE_BOOK_SHELF_STATUS_SUCCESS: {
      return { ...state, fetching: false, fetched: true };
    }
      
    case DELETE_BOOK_SHELF_STATUS_STARTED: {
      return { ...state, fetching: true };
    }
    case DELETE_BOOK_SHELF_STATUS_FAILURE: {
      return { ...state, fetching: false, error: action.payload };
    }
    case DELETE_BOOK_SHELF_STATUS_SUCCESS: {
      return { ...state, fetching: false, fetched: true };
    }

  }
  return state;
}

export default bookShelfReducer;