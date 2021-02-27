import axios from 'axios';
import { getBook } from './bookActions.js';
export const CREATE_REVIEW_STARTED = 'CREATE_REVIEW_STARTED'
export const CREATE_REVIEW_FAILURE = 'CREATE_REVIEW_FAILURE'
export const CREATE_REVIEW_SUCCESS = 'CREATE_REVIEW_SUCCESS'

export const createReview = (state, setReviewAlertOpen) => {
  return dispatch => {
    console.log(state);
    dispatch({ type: CREATE_REVIEW_STARTED });
    axios.post(`http://localhost:3000/api/v1/reviews`, {
      content: state.content,
      bookId: state.bookId,
    })
      .then(res => {
        console.log(res);
        setReviewAlertOpen(true);
        dispatch({ type: CREATE_REVIEW_SUCCESS, payload: res.data.data });
        dispatch(getBook(state));
      })
      .catch(err => {
        console.log(err.response);
        dispatch({ type: CREATE_REVIEW_FAILURE, payload: err });
      });
  }
}