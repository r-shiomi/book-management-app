import axios from 'axios';

export const SEARCH_STARTED = 'SEARCH_STARTED'
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS'
export const SEARCH_FAILURE = 'SEARCH_FAILURE'

export const search = (keyword, page) => {
  return dispatch => {
    dispatch({ type: SEARCH_STARTED });
    axios.get('/api/v1/books', {
      params: {
        'keyword': keyword,
        'page': page
      }
    }
    )
      .then(res => {
        dispatch({ type: SEARCH_SUCCESS, payload: res.data.data});
      })
      .catch(err => {
        dispatch({ type: SEARCH_FAILURE, payload: err });
      });
  }
}