import axios from 'axios';
import { getBook } from './bookActions.js';
export const REGISTER_BOOK_STARTED = 'REGISTER_BOOK_STARTED'
export const REGISTER_BOOK_FAILURE = 'REGISTER_BOOK_FAILURE'
export const REGISTER_BOOK_SUCCESS = 'REGISTER_BOOK_SUCCESS'
export const UPDATE_BOOK_SHELF_STATUS_STARTED = 'UPDATE_BOOK_SHELF_STATUS_STARTED'
export const UPDATE_BOOK_SHELF_STATUS_FAILURE = 'UPDATE_BOOK_SHELF_STATUS_FAILURE'
export const UPDATE_BOOK_SHELF_STATUS_SUCCESS = 'UPDATE_BOOK_SHELF_STATUS_SUCCESS'
export const DELETE_BOOK_SHELF_STATUS_STARTED = 'DELETE_BOOK_SHELF_STATUS_STARTED'
export const DELETE_BOOK_SHELF_STATUS_FAILURE = 'DELETE_BOOK_SHELF_STATUS_FAILURE'
export const DELETE_BOOK_SHELF_STATUS_SUCCESS = 'DELETE_BOOK_SHELF_STATUS_SUCCESS'
export const FIND_BOOKS_BY_STATUS_STARTED = 'FIND_BOOKS_BY_STATUS_STARTED'
export const FIND_BOOKS_BY_STATUS_FAILURE = 'FIND_BOOKS_BY_STATUS_FAILURE'
export const FIND_BOOKS_BY_STATUS_SUCCESS = 'FIND_BOOKS_BY_STATUS_SUCCESS'

export const registerBook = (state, status) => {
  return dispatch => {
    dispatch({ type: REGISTER_BOOK_STARTED });
    axios.post(`/api/v1/book_shelves`, {
      bookId: state.bookId,
      status: status,
    })
      .then(res => {
        dispatch({ type: REGISTER_BOOK_SUCCESS, payload: res.data.data });
        dispatch(getBook(state));
      })
      .catch(err => {
        dispatch({ type: REGISTER_BOOK_FAILURE, payload: err });
      });
  }
}

export const changeBookShelfStatus = (book, status, state) => {
  return dispatch => {
    if (book.bookShelfStatus == status) {
      dispatch({ type: DELETE_BOOK_SHELF_STATUS_STARTED });
      axios.delete(`/api/v1/book_shelves/${book.bookShelfId}`)
        .then(res => {
          dispatch({ type: DELETE_BOOK_SHELF_STATUS_SUCCESS, payload: res.data.data });
          dispatch(getBook(state));
        })
        .catch(err => {
          dispatch({ type: DELETE_BOOK_SHELF_STATUS_FAILURE, payload: err });
        });
    } else {
      dispatch({ type: UPDATE_BOOK_SHELF_STATUS_STARTED });
      axios.put(`/api/v1/book_shelves/${book.bookShelfId}`, {
        status: status,
      })
        .then(res => {
          dispatch({ type: UPDATE_BOOK_SHELF_STATUS_SUCCESS, payload: res.data.data });
          dispatch(getBook(state));
        })
        .catch(err => {
          dispatch({ type: UPDATE_BOOK_SHELF_STATUS_FAILURE, payload: err });
        });
    }

  }
}

export const findBooksByStatus = (status,page) => {
  return dispatch => {
    dispatch({ type: FIND_BOOKS_BY_STATUS_STARTED });
    axios.get("/api/v1/book_shelves/",{
      params: {
        'status': status,
        'page': page,
      }
    })
      .then(res => {
        dispatch({ type: FIND_BOOKS_BY_STATUS_SUCCESS, payload: res.data.data });
      })
      .catch(err => {
        dispatch({ type: FIND_BOOKS_BY_STATUS_FAILURE, payload: err });
      });
  }
}