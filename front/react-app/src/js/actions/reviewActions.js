import axios from 'axios';
import { getBook } from './bookActions.js';
export const CREATE_REVIEW_STARTED = 'CREATE_REVIEW_STARTED'
export const CREATE_REVIEW_FAILURE = 'CREATE_REVIEW_FAILURE'
export const CREATE_REVIEW_SUCCESS = 'CREATE_REVIEW_SUCCESS'

export const createReview = (state, setReviewAlertOpen) => {
  return dispatch => {
    dispatch({ type: CREATE_REVIEW_STARTED });
    axios.post(`/api/v1/reviews`, {
      content: state.content,
      bookId: state.bookId,
    })
      .then(res => {
        setReviewAlertOpen(true);
        dispatch({ type: CREATE_REVIEW_SUCCESS, payload: res.data.data });
        dispatch(getBook(state));
      })
      .catch(err => {
        dispatch({ type: CREATE_REVIEW_FAILURE, payload: err });
      });
  }
}