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

export const registerBook = (state, status) => {
  return dispatch => {
    console.log(state.bookId);
    console.log(status);
    dispatch({ type: REGISTER_BOOK_STARTED });
    axios.post(`http://localhost:3000/api/v1/book_shelves`, {
      bookId: state.bookId,
      status: status,
    })
      .then(res => {
        console.log(res);
        dispatch({ type: REGISTER_BOOK_SUCCESS, payload: res.data.data });
        dispatch(getBook(state));
      })
      .catch(err => {
        console.log(err.response);
        dispatch({ type: REGISTER_BOOK_FAILURE, payload: err });
      });
  }
}

export const changeBookShelfStatus = (book, status, state) => {
  return dispatch => {
    console.log(status);
    console.log(book.bookShelfStatus);
    if (book.bookShelfStatus == status) {
      dispatch({ type: DELETE_BOOK_SHELF_STATUS_STARTED });
      axios.delete(`http://localhost:3000/api/v1/book_shelves/${book.bookShelfId}`)
        .then(res => {
          console.log(res);
          dispatch({ type: DELETE_BOOK_SHELF_STATUS_SUCCESS, payload: res.data.data });
          dispatch(getBook(state));
        })
        .catch(err => {
          console.log(err.response);
          dispatch({ type: DELETE_BOOK_SHELF_STATUS_FAILURE, payload: err });
        });
    } else {
      dispatch({ type: UPDATE_BOOK_SHELF_STATUS_STARTED });
      axios.put(`http://localhost:3000/api/v1/book_shelves/${book.bookShelfId}`, {
        status: status,
      })
        .then(res => {
          console.log(res);
          dispatch({ type: UPDATE_BOOK_SHELF_STATUS_SUCCESS, payload: res.data.data });
          dispatch(getBook(state));
        })
        .catch(err => {
          console.log(err.response);
          dispatch({ type: UPDATE_BOOK_SHELF_STATUS_FAILURE, payload: err });
        });
    }

  }
}