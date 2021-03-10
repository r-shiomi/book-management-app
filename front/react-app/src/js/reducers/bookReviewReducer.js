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
  FIND_REVIEWS_BY_STATUS_STARTED,
  FIND_REVIEWS_BY_STATUS_FAILURE,
  FIND_REVIEWS_BY_STATUS_SUCCESS,
  FIND_NEW_REVIEWS_STARTED,
  FIND_NEW_REVIEWS_FAILURE,
  FIND_NEW_REVIEWS_SUCCESS,
} from '../actions/bookReviewActions';

const initialState = {
  data: [{ totalPage: null, reviews: [] }],
  fetching: false,
  fetched: false,
  error: null,
}

const bookReviewReducer = (state = initialState, action) => {
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

    case FIND_REVIEWS_BY_STATUS_STARTED: {
      return { ...state, fetching: true };
    }
    case FIND_REVIEWS_BY_STATUS_FAILURE: {
      return { ...state, fetching: false, error: action.payload };
    }
    case FIND_REVIEWS_BY_STATUS_SUCCESS: {
      return { ...state, fetching: false, fetched: true, data: action.payload };
    }
      
    case FIND_NEW_REVIEWS_STARTED: {
      return { ...state, fetching: true };
    }
    case FIND_NEW_REVIEWS_FAILURE: {
      return { ...state, fetching: false, error: action.payload };
    }
    case FIND_NEW_REVIEWS_SUCCESS: {
      return { ...state, fetching: false, fetched: true, data: action.payload };
    }

  }
  return state;
}

export default bookReviewReducer;