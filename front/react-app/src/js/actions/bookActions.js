import axios from 'axios';

export const GET_BOOK_STARTED = 'GET_BOOK_STARTED'
export const GET_BOOK_FAILURE = 'GET_BOOK_FAILURE'
export const GET_BOOK_SUCCESS = 'GET_BOOK_SUCCESS'

export const getBook = (state) => {
  return dispatch => {
    dispatch({ type: GET_BOOK_STARTED });
    axios.get(`/api/v1/books/${state.bookId}`,  {
      params: {
        'reviewPage': state.reviewPage,
      }
    })
      .then(res => {
        dispatch({ type: GET_BOOK_SUCCESS, payload: res.data.data });
      })
      .catch(err => {
        dispatch({ type: GET_BOOK_FAILURE, payload: err });
      });
  }
}